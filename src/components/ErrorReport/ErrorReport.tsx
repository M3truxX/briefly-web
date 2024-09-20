import React, { useEffect, useState } from 'react';
import './ErrorReport.scss';
import CustonButtom from '../CustomButtom/CustonButtom';
import CustonTextarea from '../CustonTextarea/CustonTextarea';
import CustonInputText from '../CustonInputText/CustonInputText';
import { validationEmail, validationName } from "../../utils/validation";
import { useAppContext } from '../../contexts/AppContext';
import { useNavigate } from 'react-router-dom';
import { ReportingRequest } from '../../data/models/interfaces/ReportingRequest';
import { Errors } from '../../data/models/enums/Errors';
import { ToastContainer, toast } from 'react-toastify';
import { AxiosErrorResponse } from '../../data/models/interfaces/AxiosErroResponse';
import axios, { AxiosError } from 'axios';
import { Success } from '../../data/models/enums/Success';

const ErrorReport: React.FC = () => {
    // Hooks e estados
    const { repository, user } = useAppContext(); // Contexto da aplicação
    const navigate = useNavigate(); // Hook de navegação
    const [reportText, setReportText] = useState(''); // Estado para o texto do relatório
    const [ctrlEntEmail, setCtrlEntEmail] = useState(0); // Controle do estado do email
    const [controlEntNome, setControlEntNome] = useState(0); // Controle do estado do nome
    const [ctrlEntApelido, setCtrlEntApelido] = useState(0); // Controle do estado do apelido
    const [resetEntApelido, setResetEntApelido] = useState(false); // Reset do estado do apelido
    const [resetEntEmail, setResetEntEmail] = useState(false); // Reset do estado do email
    const [resetEntNome, setResetEntNome] = useState(false); // Reset do estado do nome
    const [email, setEmail] = useState(''); // Estado para o email
    const [name, setName] = useState(''); // Estado para o nome
    const [isLoading, setIsLoading] = useState(false); // Estado para o carregamento
    const [activateButton, setActivateButton] = useState(false); // Estado para o botão de envio

    // Funções para manipulação de inputs
    const entApelido = (text: string) => { checkInputApelido(text); setReportText(text) } // Função para manipular o apelido
    const entradaNome = (text: string) => { setName(text); checkInputNome(text); } // Função para manipular o nome
    const entEmail = (text: string) => { checkInputEmail(text); setEmail(text) } // Função para manipular o email

    // Efeito para validar os campos e ativar o botão
    useEffect(() => {
        const nameValid = name.trim() !== '' ? checkInputNome(name) : true;
        const emailValid = email.trim() !== '' ? checkInputEmail(email) : true;
        const reportValid = reportText.trim() !== '';
        setActivateButton(nameValid && emailValid && reportValid);
    }, [name, email, reportText]);

    // Verifica a validade do apelido inserido
    function checkInputApelido(text: string): boolean {
        if (text === '') {
            setCtrlEntApelido(0);
            setActivateButton(false);
            return true;
        }
        if (reportText.length >= 5) {
            setActivateButton(true);
            setCtrlEntApelido(2);
            return false;
        }
        setActivateButton(false);
        setCtrlEntApelido(1);
        return true;
    }

    // Verifica a validade do nome
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

    // Verifica a validade do email
    function checkInputEmail(email: string) {
        if (email === '') {
            setCtrlEntEmail(0);
            return false;
        } else if (validationEmail(email)) {
            setCtrlEntEmail(2);
            return true;
        }
        setCtrlEntEmail(1);
        return false;
    }

    // Função para enviar o relatório
    const handleSubmit = async () => {
        setIsLoading(true);

        const reportData: ReportingRequest = {
            username: name,
            email: email,
            reportType: (document.querySelector('.select-report') as HTMLSelectElement)?.value,
            reporting: reportText
        };

        try {
            await repository.sendReport(user?.token || '', reportData);
            toast.success(Success.REPORT_ENVIADO);
            setResetEntNome(prev => !prev);
            setResetEntEmail(prev => !prev);
            setResetEntApelido(prev => !prev);
            setTimeout(() => {
                setControlEntNome(0);
                setCtrlEntEmail(0);
                setCtrlEntApelido(0);
                navigate('/');
            }, 2500);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError<AxiosErrorResponse>;
                if (axiosError.response?.status === 401) {
                    toast.error (Errors.ACESSO_NAO_AUTORIZADO);
                } else if (axiosError.response?.status === 429) {
                    toast.error(Errors.MUITAS_REQUISCOES);
                } else {
                    toast.error(Errors.ERRO_ENVIAR_RELATORIO);
                }
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="error-report">
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
            <h1 className="color-primary fs-24">Reporte erros</h1>
            <p className="color-secondary fs-14">Ou sugira novidades</p>
            <form onSubmit={(e) => e.preventDefault()}>
                <div className='funcLink-container'>
                    <div className='container-card'>
                        {/* Campos de entrada para nome e email */}
                        <div>
                            <p className="mb-10 mt-25 fs-14 color-primary font-bold">Digite seu nome</p>
                            <div className='center'>
                                <CustonInputText
                                    textPlaceholder="Digite seu nome"
                                    estado={controlEntNome}
                                    travelInfo={entradaNome}
                                    resetText={resetEntNome}
                                    showTextdescription={controlEntNome === 1}
                                    textdescription='Deve conter no mínimo 5 caracteres'
                                />
                            </div>
                        </div>
                        <div className='ml-20'>
                            <p className="mb-10 mt-25 fs-14 color-primary font-bold">Digite seu email</p>
                            <div className='center'>
                                <CustonInputText
                                    textPlaceholder="Digite seu email"
                                    estado={ctrlEntEmail}
                                    color='black'
                                    travelInfo={entEmail}
                                    type="email"
                                    resetText={resetEntEmail}
                                    showTextdescription={ctrlEntEmail === 1}
                                    textdescription='O email deve conter "@", domínio e ".com"'
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {/* Seleção do tipo de relatório */}
                <p className="mb-10 mt-25 fs-14 color-primary font-bold">Selecione o tipo de relatório</p>
                <div className='center'>
                    <select className='select-report'>
                        <option value="bug">Bug</option>
                        <option value="suggestion">Sugestão</option>
                    </select>
                </div>
                {/* Campo de texto para o relatório */}
                <p className="mb-10 mt-25 fs-14 color-primary font-bold">Digite uma senha</p>
                <CustonTextarea
                    textPlaceholder="Digite um apelido"
                    estado={ctrlEntApelido}
                    color='black'
                    travelInfo={entApelido}
                    resetText={resetEntApelido}
                    showTextdescription={ctrlEntApelido === 1 ? true : false}
                    lengthMax={300}
                    textdescription='Deve conter no mínimo 6 e máximo 150 caracteres.' />
            </form>
            {/* Botão de envio */}
            <CustonButtom
                text='Enviar'
                activate={activateButton}
                loading={isLoading}
                onClick={handleSubmit} />
        </div>
    );
};

export default ErrorReport;