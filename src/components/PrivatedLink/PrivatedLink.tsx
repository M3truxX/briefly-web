import './privatedLink.css';
import '../../utils/cssConf.scss'
import 'react-toastify/dist/ReactToastify.css';
import { DatabaseRepository } from "../../data/models/class/DatabaseRepository";
import { LinkProtectedResponse } from '../../data/models/interfaces/LinkProtectedResponse';
import { LinkProtectedRequest } from '../../data/models/interfaces/LinkProtectedRequest';
import { AxiosErrorResponse } from '../../data/models/interfaces/AxiosErroResponse';
import { Errors } from '../../data/models/enums/Errors';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import CustonButtom from '../CustomButtom/CustonButtom';
import axios, { AxiosError } from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import CustonInputText from '../CustonInputText/CustonInputText';

function PrivatedLink({ repository }: { repository: DatabaseRepository }) {
    const [resetEntSenha, setResetEntSenha] = useState(false);
    const [ctrlEntSenha, setCtrlEntSenha] = useState(0);
    const entSenha = (text: string) => { checkInputSenha(text); setSenhaText(text) }
    const [senhaText, setSenhaText] = useState('');
    const [isLoading, setIsLoading] = useState(false)
    const { id } = useParams();
    const [activateButton, setActivateButton] = useState(false)

    useEffect(() => {
        if (checkInputSenha(senhaText)) {
            setActivateButton(true)
        } else {
            setActivateButton(false)
        }
    }, [entSenha]);

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
        <div className='input-pass-container mt-100 mb-100'>
            <ToastContainer
                position="top-right"
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
            <h1 className='fs-20 primary-text'>Insira a senha para acessar o link</h1>
            <div className="input-pass">
                <form onSubmit={(e) => e.preventDefault()}>
                    <CustonInputText
                        textPlaceholder="Digite uma senha"
                        estado={ctrlEntSenha}
                        color='black'
                        travelInfo={entSenha}
                        type="password"
                        resetText={resetEntSenha}
                        showTextdescription={ctrlEntSenha == 1 ? true : false}
                        textdescription='Deve conter no mínimo 3 caracteres.'
                    />
                </form>
                <CustonButtom
                    text='Acessar'
                    activate={activateButton}
                    loading={isLoading}
                    onClick={requestPrivateLinkinfo} />
            </div>
        </div>
    )
}

export default PrivatedLink