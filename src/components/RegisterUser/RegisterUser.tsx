import React, { useState, useEffect } from "react";
import CustonInputText from "../CustonInputText/CustonInputText";
import { validationName, validationEmail, validationPhone, validationSenha } from "../../utils/validation";
import "./registerUser.scss";
import InputCode from "../InputCode/InputCode";
import Modal from "../Modal/Modal";
import CustonButtom from "../CustomButtom/CustonButtom";
import { DatabaseRepository } from "../../data/models/class/DatabaseRepository";

import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { Errors } from "../../data/models/enums/Errors";
import { AxiosErrorResponse } from "../../data/models/interfaces/AxiosErroResponse";
import { LinkProtectedRequest } from "../../data/models/interfaces/LinkProtectedRequest";
import { LinkProtectedResponse } from "../../data/models/interfaces/LinkProtectedResponse";


function RegisterUser({ repository }: { repository: DatabaseRepository }) {
    const entradaNome = (text: string) => { setName(text) }
    const entradaEmail = (text: string) => { setEmail(text) }
    const entradaTelefone = (text: string) => { setPhone(text) }
    const entradaSenha = (text: string) => { setPassword(text) }

    const [controlEntNome, setControlEntNome] = useState(0);
    const [controlEntEmail, setControlEntEmail] = useState(0);
    const [controlEntPhone, setControlEntPhone] = useState(0);
    const [controlEntSenha, setControlEntSenha] = useState(0);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    const [inputValues, setInputValues] = useState<string[]>([]);
    const [activateButton, setActivateButton] = useState(false)

    const [isLoading, setIsLoading] = useState(false);
    const [id, setid] = useState(false);

    // Lida com o clique do botão principal
    const handleClick = () => {
        if (activateButton) {
            // chamda da api
        }
        return undefined;
    };


    useEffect(() => {
        const nameValid = checkInputNome(name) ?? false;
        const emailValid = checkInputEmail(email) ?? false;
        const phoneValid = checkInputPhone(phone) ?? false;
        const passwordValid = CheckPassword(password) ?? false;

        setActivateButton(nameValid && emailValid && phoneValid && passwordValid);

    }, [name, email, phone, password]);



    // Estado de visibilidade do modal
    const [isModalVisible, setModalVisible] = useState(false);

    // Abre o modal
    const openModal = () => {
        setModalVisible(true);
    };

    // Fecha o modal
    const closeModal = () => {
        setModalVisible(false);
    };


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

    const handleInputChange = (values: string[]) => {
        setInputValues(values);
        console.log("Input Values:", values);
    };

    // Solicita dados do link protegido
    async function requestPrivateLinkinfo() {
        setIsLoading(true);
        const dataRequestPrivate: LinkProtectedRequest = {
            shortLink: String(id),
            password: 'senhaText'
        }
        try {
            const linkDataResponse: LinkProtectedResponse = await repository.requestProtectedLinkData(dataRequestPrivate);

        } catch (error) {
            setIsLoading(false)
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError<AxiosErrorResponse>;
                if (axiosError.response?.status === 404) {
                    toast(Errors.LINK_NAO_ENCONTRADO);
                } else if (axiosError.response?.status === 401) {
                    toast(Errors.SENHA_ERRADA);
                } else {
                    toast(Errors.SERVIDOR_NAO_RESPONDENDO);
                }
            }
        }
    }


    return (
        <div className="container mbl-50">
            <Modal isVisible={isModalVisible} onClose={closeModal}>
                <div className="mbl-35">
                    <h1 className="fs-26 font-bold color-primary">Ativar conta</h1>
                    <p className="fs-14 mb-20 color-secondary">Coloque o código recebido via e-mail</p>
                    <InputCode quantidade={6} onInputChange={handleInputChange} />
                    <div className="mt-20">
                        <CustonButtom
                            text="Ativar"
                            activate={false}
                            loading={isLoading}
                            onClick={handleClick} />
                    </div>
                </div>
            </Modal>
            <h1 className="fs-26 font-bold color-primary">Cadastre sua conta</h1>
            <p className="fs-14 mb-20 color-secondary">Todos os campos são obrigatórios</p>
            <div className='container-cadastro'>
                {/* Primeiro conjunto de cartões */}
                <div className='card-base-cadastro'>
                    <div className='area-text-cadastro mbl-10'>
                        <p className='color-dark mb-10 fs-14 font-bold'>Digite seu nome</p> {/* Título do cartão */}
                        <CustonInputText
                            textPlaceholder="Nome e sobrenome"
                            estado={controlEntNome}
                            travelInfo={entradaNome}
                            showTextdescription={controlEntNome === 1}
                            textdescription='Deve conter no mínimo 5 caracteres'
                        />
                    </div>
                </div>
                <div className='card-base-cadastro'>
                    <div className='area-text-cadastro mbl-10'>
                        <p className='color-dark mb-10 fs-14 font-bold'>Digite seu e-mail</p> {/* Título do cartão */}
                        <CustonInputText
                            textPlaceholder="Seu email"
                            estado={controlEntEmail}
                            mask="email"
                            travelInfo={entradaEmail}
                            showTextdescription={controlEntEmail === 1}
                            textdescription='O email deve conter "@", domínio e ".com". Exemplo: seuemail@gmail.com'
                        />
                    </div>
                </div>
            </div>
            <div className='container-cadastro'>
                {/* Segundo conjunto de cartões */}
                <div className='card-base-cadastro'>
                    <div className='area-text-cadastro mbl-10'>
                        <p className='color-dark mb-10 fs-14 font-bold'>Digite seu número</p> {/* Título do cartão */}
                        <CustonInputText
                            textPlaceholder="Seu telefone"
                            estado={controlEntPhone}
                            mask="phone"
                            lengthMax={14}
                            travelInfo={entradaTelefone}
                            showTextdescription={controlEntPhone === 1}
                            textdescription='Preencha o número corretamente'
                            keyBoard='numeric'
                        />
                    </div>
                </div>
                <div className='card-base-cadastro'>
                    <div className='area-text-cadastro mbl-10'>
                        <p className='color-dark mb-10 fs-14 font-bold'>Digite seu senha</p> {/* Título do cartão */}
                        <CustonInputText
                            textPlaceholder="Sua senha"
                            estado={controlEntSenha}
                            type="password"
                            travelInfo={entradaSenha}
                            showTextdescription={controlEntSenha === 1}
                            textdescription='A senha deve conter: 7 ou mais caracteres, entre eles letras maiúsculas, minúsculas, números e caracteres especiais'
                        />
                    </div>
                </div>
            </div>
            <div className="mt-20">
                <CustonButtom
                    text="Registrar"
                    activate={activateButton}
                    loading={isLoading}
                    onClick={openModal} />
            </div>
        </div>
    );
};

export default RegisterUser;