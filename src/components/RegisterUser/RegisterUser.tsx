// Importa estilos globais e bibliotecas necessárias
import { useState, useEffect } from "react";
import CustonInputText from "../CustonInputText/CustonInputText";
import { validationName, validationEmail, validationPhone, validationSenha } from "../../utils/validation";
import "./registerUser.scss";
import '../../utils/cssConf.scss';
import CustonButtom from "../CustomButtom/CustonButtom";
import axios, { AxiosError } from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Errors } from "../../data/models/enums/Errors";
import { AxiosErrorResponse } from "../../data/models/interfaces/AxiosErroResponse";
import { CreateAccontResponse } from "../../data/models/interfaces/CreateAccontResponse";
import { CreateAccontRequest } from "../../data/models/interfaces/CreateAccontRequest";
import { useNavigate } from "react-router-dom";
import { Success } from "../../data/models/enums/Success";
import { useAppContext } from "../../contexts/AppContext";

// Componente de registro de usuário
function RegisterUser() {
    const navigate = useNavigate(); // Hook para navegação
    const { repository } = useAppContext(); // Use o contexto geral

    // Controles de reset dos inputs
    const [resetEntNome, setResetEntNome] = useState(false); // Controle do reset do nome
    const [resetEntEmail, setResetEntEmail] = useState(false); // Controle do reset do email
    const [resetEntCell, setResetEntCell] = useState(false); // Controle do reset do número de telefone
    const [resetEntSenha, setResetEntSenha] = useState(false); // Controle do reset da senha

    // Funções para definir o texto dos inputs
    const entradaNome = (text: string) => { setName(text) } // Define o nome
    const entradaEmail = (text: string) => { setEmail(text) } // Define o email
    const entradaTelefone = (text: string) => { setPhone(text) }; // Define o número de telefone
    const entradaSenha = (text: string) => { setPassword(text) } // Define a senha

    // Estados de controle de validação visual
    const [controlEntNome, setControlEntNome] = useState(0); // Controle do nome
    const [controlEntEmail, setControlEntEmail] = useState(0); // Controle do email
    const [controlEntPhone, setControlEntPhone] = useState(0); // Controle do número de telefone
    const [controlEntSenha, setControlEntSenha] = useState(0); // Controle da senha

    // Estados dos valores dos inputs
    const [name, setName] = useState(''); // Nome do usuário
    const [email, setEmail] = useState(''); // Email do usuário
    const [phone, setPhone] = useState(''); // Número de telefone do usuário
    const [password, setPassword] = useState(''); // Senha do usuário

    // Outros estados
    const [activateButton, setActivateButton] = useState(false) // Controle do botão de registro
    const [isLoading, setIsLoading] = useState(false); // Controle do loading

    // Lida com o clique do botão principal
    const handleClick = () => {
        if (activateButton) {
            creatAcconte()
        }
    };

    // Verifica a validade dos inputs ao alterá-los
    useEffect(() => {
        const nameValid = checkInputNome(name) ?? false;
        const emailValid = checkInputEmail(email) ?? false;
        const phoneValid = checkInputPhone(phone) ?? false;
        const passwordValid = CheckPassword(password) ?? false;

        // Ativa o botão de registro apenas se todos os inputs forem válidos
        setActivateButton(nameValid && emailValid && phoneValid && passwordValid);
    }, [name, email, phone, password]);

    // Funções de validação dos inputs
    const checkInputNome = (nome: string) => {
        if (nome === '') {
            setControlEntNome(0);
            return false;
        } else if (validationName(nome)) {
            setControlEntNome(2);
            return true;
        }
        setControlEntNome(1);
        return false;
    };

    // Validação do email
    const checkInputEmail = (email: string) => {
        if (email === '') {
            setControlEntEmail(0);
            return false;
        } else if (validationEmail(email)) {
            setControlEntEmail(2);
            return true;
        }
        setControlEntEmail(1);
        return false;
    };

    // Validação do número de telefone
    const checkInputPhone = (numero: string) => {
        if (numero === '') {
            setControlEntPhone(0);
            return false;
        } else if (validationPhone(numero)) {
            setControlEntPhone(2);
            return true;
        }
        setControlEntPhone(1);
        return false;
    };

    // Validação da senha
    const CheckPassword = (pass: string) => {
        if (pass === '') {
            setControlEntSenha(0);
            return false;
        } else if (validationSenha(pass)) {
            setControlEntSenha(2);
            return true;
        }
        setControlEntSenha(1);
        return false;
    };

    // Função para voltar à página inicial
    const handleClickHome = () => {
        navigate('/');
    };

    // Solicita dados do link protegido (a ser implementado)
    async function creatAcconte() {
        setIsLoading(true);
        const CreateAcconte: CreateAccontRequest = {
            username: name,
            email: email,
            phone: "55" + phone.replace(/[^0-9]/g, ''),
            password: password,
        }

        try {
            const linkDataResponse: CreateAccontResponse = await repository.CreateAccontData(CreateAcconte);
            if (linkDataResponse) {
                setResetEntNome(prev => !prev);
                setResetEntEmail(prev => !prev);
                setResetEntCell(prev => !prev);
                setResetEntSenha(prev => !prev);
                setControlEntNome(0);
                setControlEntEmail(0);
                setControlEntPhone(0);
                setControlEntSenha(0);
                toast.success(Success.USER_CREATE_SUCCESS);
                await repository.ActivateAccont(email);
                setTimeout(() => {
                    handleClickHome()
                }, 2500);
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError<AxiosErrorResponse>;
                if (axiosError.response?.status === 409) {
                    toast.error(Errors.USER_JA_CADASTRADO);
                } else if (axiosError.response?.status === 429) {
                    toast.error(Errors.MUITAS_REQUISCOES);
                } else {
                    toast.error(Errors.SERVIDOR_NAO_RESPONDENDO);
                }
            }
        } finally {
            setIsLoading(false); // Finaliza o estado de loading
        }
    }

    return (
        <div className="container">
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
            <h1 className="fs-24 font-bold color-primary">Crie uma conta</h1>
            <p className="fs-14 mb-20 color-secondary">Todos os campos são obrigatórios</p>
            <div className='container-cadastro'>
                {/* Primeiro conjunto de inputs */}
                <div className='card-base-cadastro'>
                    <div className='area-text-cadastro'>
                        <p className='color-primary mb-10 fs-14 font-bold'>Digite seu nome</p>
                        <CustonInputText
                            textPlaceholder="Nome e sobrenome"
                            estado={controlEntNome}
                            travelInfo={entradaNome}
                            resetText={resetEntNome}
                            showTextdescription={controlEntNome === 1}
                            textdescription='Deve conter no mínimo 5 caracteres'
                        />
                    </div>
                </div>
                <div className='card-base-cadastro'>
                    <div className='area-text-cadastro'>
                        <p className='color-primary mb-10 fs-14 font-bold'>Digite seu e-mail</p>
                        <CustonInputText
                            textPlaceholder="Seu email"
                            estado={controlEntEmail}
                            mask="email"
                            travelInfo={entradaEmail}
                            resetText={resetEntEmail}
                            showTextdescription={controlEntEmail === 1}
                            textdescription='O email deve conter "@", domínio e ".com". Exemplo: seuemail@gmail.com'
                        />
                    </div>
                </div>
            </div>
            <div className='container-cadastro'>
                {/* Segundo conjunto de inputs */}
                <div className='card-base-cadastro'>
                    <div className='area-text-cadastro mbl-10'>
                        <p className='color-primary mb-10 fs-14 font-bold'>Digite seu número</p>
                        <CustonInputText
                            textPlaceholder="Seu telefone"
                            estado={controlEntPhone}
                            mask="phone"
                            lengthMax={14}
                            travelInfo={entradaTelefone}
                            resetText={resetEntCell}
                            showTextdescription={controlEntPhone === 1}
                            textdescription='Preencha o número corretamente. Exemplo: (81) 98888-8888'
                            keyBoard='numeric'
                        />
                    </div>
                </div>
                <div className='card-base-cadastro'>
                    <div className='area-text-cadastro mbl-10'>
                        <p className='color-primary mb-10 fs-14 font-bold'>Digite seu senha</p>
                        <CustonInputText
                            textPlaceholder="Sua senha"
                            estado={controlEntSenha}
                            type="password"
                            travelInfo={entradaSenha}
                            resetText={resetEntSenha}
                            showTextdescription={controlEntSenha === 1}
                            textdescription='A senha deve conter: 7 ou mais caracteres, entre eles letras maiúsculas, minúsculas, números e caracteres especiais'
                        />
                    </div>
                </div>
            </div>
            <div className="btn-container-register mt-20 ">
                <div>
                    <CustonButtom
                        text="cancelar"
                        secondary={true}
                        activate={true}
                        onClick={handleClickHome} />
                </div>
                <div className="ml-10">
                    <CustonButtom
                        text="Registrar"
                        activate={activateButton}
                        loading={isLoading}
                        onClick={handleClick} />
                </div>
            </div>
        </div>
    );
};

export default RegisterUser;