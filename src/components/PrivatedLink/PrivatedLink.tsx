// Importa estilos globais e bibliotecas necessárias
import './privatedLink.scss';
import '../../utils/cssConf.scss'
import 'react-toastify/dist/ReactToastify.css';
import { DatabaseRepository } from "../../data/models/class/DatabaseRepository";
import { LinkProtectedResponse } from '../../data/models/interfaces/LinkProtectedResponse';
import { LinkProtectedRequest } from '../../data/models/interfaces/LinkProtectedRequest';
import { AxiosErrorResponse } from '../../data/models/interfaces/AxiosErroResponse';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import axios, { AxiosError } from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Errors } from '../../data/models/enums/Errors';
import CustonButtom from '../CustomButtom/CustonButtom';
import CustonInputText from '../CustonInputText/CustonInputText';
import { useAppContext } from '../../contexts/AppContext';

// Componente para acessar links protegidos
function PrivatedLink() {
    const { repository } = useAppContext(); // Use o contexto geral
    const [resetEntSenha, setResetEntSenha] = useState(false); // Estado para reset de senha
    const [ctrlEntSenha, setCtrlEntSenha] = useState(0); // Controle do estado de senha
    const entSenha = (text: string) => { checkInputSenha(text); setSenhaText(text) } // Função de entrada de senha
    const [senhaText, setSenhaText] = useState(''); // Estado da senha
    const [isLoading, setIsLoading] = useState(false); // Controle de loading
    const { id } = useParams(); // Obtém o parâmetro de rota
    const [activateButton, setActivateButton] = useState(false); // Estado de ativação do botão

    // Verifica senha ao digitar
    useEffect(() => {
        if (checkInputSenha(senhaText)) {
            setActivateButton(true)
        } else {
            setActivateButton(false)
        }
    }, [senhaText]);

    // Verifica a validade da senha
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

    // Solicita dados do link protegido
    async function requestPrivateLinkinfo() {
        setIsLoading(true);
        const dataRequestPrivate: LinkProtectedRequest = {
            shortLink: String(id),
            password: senhaText
        }
        try {
            const linkDataResponse: LinkProtectedResponse = await repository.requestProtectedLinkData(dataRequestPrivate);
            if (linkDataResponse?.originalLink) {
                setResetEntSenha(prev => !prev);
                setTimeout(() => {
                    setCtrlEntSenha(0);
                }, 100);
                window.location.href = linkDataResponse.originalLink;
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError<AxiosErrorResponse>;
                if (axiosError.response?.status === 404) {
                    toast.error(Errors.LINK_NAO_ENCONTRADO);
                } else if (axiosError.response?.status === 401) {
                    toast.error(Errors.SENHA_ERRADA);
                } else {
                    toast.error(Errors.SERVIDOR_NAO_RESPONDENDO);
                }
            }
        } finally {
            setIsLoading(false); // Finaliza o estado de loading
        }
    }

    // Renderiza o componente de link protegido
    return (
        <div className='input-pass-container'>
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
            <h1 className='fs-24 color-primary'>Insira a senha para acessar o link</h1>
            <div className="input-pass">
                <form onSubmit={(e) => e.preventDefault()}>
                    <CustonInputText
                        textPlaceholder="Digite uma senha"
                        estado={ctrlEntSenha}
                        color='black'
                        travelInfo={entSenha}
                        type="password"
                        resetText={resetEntSenha}
                        showTextdescription={ctrlEntSenha === 1 ? true : false}
                        textdescription='Deve conter no mínimo 3 caracteres.'
                    />
                </form>
                <div className='ml-10'>
                    <CustonButtom
                        text='Acessar'
                        activate={activateButton}
                        loading={isLoading}
                        onClick={requestPrivateLinkinfo} />
                </div>
            </div>
        </div>
    )
}

export default PrivatedLink