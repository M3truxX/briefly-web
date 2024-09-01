import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import { LoggedDataRequest } from '../../data/models/interfaces/LoggedDataRequest'
import CustonInputText from '../CustonInputText/CustonInputText';
import CustonButtom from '../CustomButtom/CustonButtom';
import axios, { AxiosError } from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { Errors } from '../../data/models/enums/Errors';
import { AxiosErrorResponse } from '../../data/models/interfaces/AxiosErroResponse';
import { Success } from '../../data/models/enums/Success';
import { useNavigate } from 'react-router-dom';
import { validationEmail } from '../../utils/validation';

const LoginComponent: React.FC = () => {
    const { login } = useAppContext();
    const navigate = useNavigate(); // Hook para navegação
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [resetEntEmail, setResetEntEmail] = useState(false);
    const [ctrlEntEmail, setCtrlEntEmail] = useState(0);
    const [resetEntSenha, setResetEntSenha] = useState(false);
    const [ctrlEntSenha, setCtrlEntSenha] = useState(0);
    const entEmail = (text: string) => { checkInputSenha(text); setEmail(text) }
    const entSenha = (text: string) => { checkInputSenha(text); setPassword(text) }
    const [isLoading, setIsLoading] = useState(false);
    const [activateButton, setActivateButton] = useState(false);

    // Verifica a validade dos inputs ao alterá-los
    useEffect(() => {
        const emailValid = checkInputEmail(email) ?? false;
        const passwordValid = checkInputSenha(password) ?? false;

        // Ativa o botão de registro apenas se todos os inputs forem válidos
        setActivateButton(emailValid && passwordValid);
    }, [email, password]);

    // Verifica senha ao digitar
    useEffect(() => {
        if (checkInputSenha(password)) {
            setActivateButton(true)
        } else {
            setActivateButton(false)
        }
    }, [password]);

    function checkInputSenha(text: string): boolean {
        if (text === '') {
            setCtrlEntSenha(0);
            return false;
        }
        if (text.length < 3) {
            setCtrlEntSenha(1);
            return false;
        }
        setCtrlEntSenha(2);
        return true;
    }

    const checkInputEmail = (email: string) => {
        if (email === '') {
            setCtrlEntEmail(0);
            return false;
        } else if (validationEmail(email)) {
            setCtrlEntEmail(2);
            return true;
        }
        setCtrlEntEmail(1);
        return false;
    };

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();
        const loginData: LoggedDataRequest = { email, password };
        setIsLoading(true);
        try {
            const response = await login(loginData);
            if (response) {
                toast(Success.LOGGED_ACCOUNT);
                setResetEntEmail(prev => !prev);
                setResetEntSenha(prev => !prev);
                setTimeout(() => {
                    setCtrlEntSenha(0);
                    setCtrlEntEmail(0);
                    navigate('/');
                }, 100);
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError<AxiosErrorResponse>;
                if (axiosError.response?.status === 404) {
                    toast(Errors.LINK_NAO_ENCONTRADO);
                } else if (axiosError.response?.status === 401) {
                    toast(Errors.SENHA_EMAIL_ERRADO);
                } else {
                    toast(Errors.SERVIDOR_NAO_RESPONDENDO);
                }
            }
        } finally {
            setIsLoading(false); // Finaliza o estado de loading
        }
    };

    // Cria um manipulador de clique para o botão personalizado
    const handleButtomClick = () => {
        handleLogin(new Event('click') as any); // Emula o evento para o login
    };

    return (
        <div>
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
            <h1 className="fs-24 font-bold color-primary">Entrar na conta</h1>
            <p className="fs-14 mb-20 color-secondary">Todos os campos são obrigatórios</p>
            <div className='center'>
                <form onSubmit={handleLogin}>
                    <p className="mb-10 fs-14 color-primary font-bold">Digite seu email</p>
                    <CustonInputText
                        textPlaceholder="Email"
                        estado={ctrlEntEmail}
                        color='black'
                        travelInfo={entEmail}
                        type="email"
                        resetText={resetEntEmail}
                        showTextdescription={ctrlEntEmail === 1}
                        textdescription='O email deve conter "@", domínio e ".com"'
                    />
                    <p className="mb-10 fs-14 color-primary font-bold">Digite uma senha</p>
                    <CustonInputText
                        textPlaceholder="Senha"
                        estado={ctrlEntSenha}
                        color='black'
                        travelInfo={entSenha}
                        type="password"
                        resetText={resetEntSenha}
                        showTextdescription={ctrlEntSenha === 1}
                        textdescription='Deve conter no mínimo 3 caracteres.'
                    />
                </form>
            </div>
            <div className='center mt-20'>
                <CustonButtom
                    text='Login'
                    activate={activateButton}
                    loading={isLoading}
                    onClick={handleButtomClick} // Passa o manipulador de clique
                />
            </div>
        </div>
    );
};

export default LoginComponent;