import './privatedLink.css';
import '../../utils/cssConf.scss'
import { useParams } from 'react-router-dom'
import { DatabaseRepository } from "../../data/models/class/DatabaseRepository";
import { LinkProtectedResponse } from '../../data/models/interfaces/LinkProtectedResponse';
import { LinkProtectedRequest } from '../../data/models/interfaces/LinkProtectedRequest';
import { ChangeEvent, useState } from 'react';
import CustonButtom from '../CustomButtom/CustonButtom';
import axios, { AxiosError } from 'axios';
import { AxiosErrorResponse } from '../../data/models/interfaces/AxiosErroResponse';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Errors } from '../../data/models/enums/Errors';


function PrivatedLink({ repository }: { repository: DatabaseRepository }) {
    const [isLoading, setIsLoading] = useState(false)
    const { id } = useParams();
    const [inputValue, setInputValue] = useState("")
    const [activateButton, setActivateButton] = useState(false)

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        setInputValue(newValue);
        if (event.target.value) {
            setActivateButton(true);
        } else {
            setActivateButton(false);
        }
    };

    async function requestPrivateLinkinfo() {
        if (inputValue.length == 0) {
            toast(Errors.SENHA_VAZIA)
        } else {
            setIsLoading(true);
            const dataRequestPrivate: LinkProtectedRequest = {
                shortLink: String(id),
                password: inputValue
            }
            try {
                const linkDataResponse: LinkProtectedResponse = await repository.requestProtectedLinkData(dataRequestPrivate);
                if (linkDataResponse?.originalLink) {
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
    }

    return (
        <div className='input-pass-container mt-50'>
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
            <h1 className='fs-18 primary-text'>Insira a senha para acessar o link</h1>
            <div className="input-pass">
                <form onSubmit={(e) => e.preventDefault()}>
                    <input className="input-text p-10"
                        type="password"
                        id="input"
                        value={inputValue}
                        onChange={handleChange}
                        placeholder="Senha"
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