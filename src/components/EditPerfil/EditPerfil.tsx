import { useState, useEffect } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import CustonInputText from '../CustonInputText/CustonInputText';
import CustonButtom from '../CustomButtom/CustonButtom';
import { toast, ToastContainer } from 'react-toastify';
import { Errors } from '../../data/models/enums/Errors';
import { Success } from '../../data/models/enums/Success';
import { validationName, validationPhone, validationSenha } from '../../utils/validation';
import axios, { AxiosError } from 'axios';
import { AxiosErrorResponse } from '../../data/models/interfaces/AxiosErroResponse';
import { useNavigate } from 'react-router-dom';
import './EditPerfil.scss';
import { LoggedUserResponse } from '../../data/models/interfaces/LoggedUserResponse';

// Componente para edição de informações do usuário
function EditUserInfo() {
    // Hooks e estados
    const { user, setUser, repository } = useAppContext();
    const navigate = useNavigate();

    // Estados para controle de inputs e comportamento
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [resetEntPhone, setResetEntPhone] = useState(false);
    const [resetEntSenha, setResetEntSenha] = useState(false);
    const [controlEntPhone, setControlEntPhone] = useState(0);
    const [controlEntSenha, setControlEntSenha] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [activateButton, setActivateButton] = useState(false);

    // Funções para manipulação de inputs
    const entradaPhone = (text: string) => { setPhone(text); checkInputPhone(text); }
    const entradaSenha = (text: string) => { setPassword(text); checkInputSenha(text); }

    // Efeito para validar os campos e ativar o botão
    useEffect(() => {
        const phoneValid = phone.trim() !== '' ? checkInputPhone(phone) : false;
        const passwordValid = password.trim() !== '' ? checkInputSenha(password) : false;
        setActivateButton(phoneValid || passwordValid);
    }, [phone, password]);

    // Função para verificar a validade do número de telefone
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

    // Função para verificar a validade da senha
    const checkInputSenha = (senha: string) => {
        if (senha === '') {
            setControlEntSenha(0);
            return false;
        } else if (validationSenha(senha)) {
            setControlEntSenha(2);
            return true;
        }
        setControlEntSenha(1);
        return false;
    };

    // Função para lidar com o envio do formulário
    const handleSubmit = async () => {
        if (!activateButton) return;

        setIsLoading(true);
        try {
            const updateData: any = {};
            if (phone) updateData.phone = "55" + phone.replace(/[^0-9]/g, '');
            if (password) updateData.password = password;

            const response =''
            
            if (response) {
                if (phone && user) {
                    const updatedUser: LoggedUserResponse = {
                        ...user,
                        account: {
                            ...user.account,
                            phone: "55" + phone.replace(/[^0-9]/g, ''),
                        },
                    };
                    localStorage.setItem('auth_storage_key', JSON.stringify(updatedUser));
                    setUser(updatedUser);
                }
                
                toast(Success.USER_UPDATE_SUCCESS);
                setResetEntPhone(prev => !prev);
                setResetEntSenha(prev => !prev);
                setControlEntPhone(0);
                setControlEntSenha(0);
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError<AxiosErrorResponse>;
                if (axiosError.response?.status === 409) {
                    toast(Errors.USER_JA_CADASTRADO);
                } else {
                    toast(Errors.SERVIDOR_NAO_RESPONDENDO);
                }
            }
        } finally {
            setIsLoading(false);
        }
    };

    // Função para navegar para a página inicial
    const handleClickHome = () => {
        navigate('/');
    };

    // Renderização do componente
    return (
        <div className='edit-user-info-container'>
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
            <h1 className="fs-24 font-bold color-primary">Editar Informações do Usuário</h1>
            <p className="fs-14 mb-20 color-secondary">Preencha os campos que deseja alterar</p>
            <div className='edit-user-info-form'>
                <div className='edit-user-info-input'>
                    <p className='color-dark mb-10 fs-14 font-bold'>Novo número de telefone</p>
                    <CustonInputText
                        textPlaceholder="Seu telefone"
                        estado={controlEntPhone}
                        travelInfo={entradaPhone}
                        resetText={resetEntPhone}
                        showTextdescription={controlEntPhone === 1}
                        textdescription='Preencha o número corretamente. Exemplo: (81) 98888-8888'
                        mask="phone"
                        lengthMax={14}
                        keyBoard='numeric'
                    />
                </div>
                <div className='edit-user-info-input'>
                    <p className='color-dark mb-10 fs-14 font-bold'>Nova senha</p>
                    <CustonInputText
                        textPlaceholder="Nova senha"
                        estado={controlEntSenha}
                        travelInfo={entradaSenha}
                        type="password"
                        resetText={resetEntSenha}
                        showTextdescription={controlEntSenha === 1}
                        textdescription='A senha deve conter: 7 ou mais caracteres, entre eles letras maiúsculas, minúsculas, números e caracteres especiais'
                    />
                </div>
            </div>
            <div className="edit-user-info-buttons">
                <CustonButtom
                    text='Cancelar'
                    secondary={true}
                    onClick={handleClickHome}
                />
                <div className='ml-10'>
                    <CustonButtom
                        text='Atualizar'
                        activate={activateButton}
                        loading={isLoading}
                        onClick={handleSubmit}
                    />
                </div>
            </div>
        </div>
    );
}

export default EditUserInfo;