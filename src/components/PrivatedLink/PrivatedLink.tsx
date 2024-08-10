import './privatedLink.css';
import '../../utils/cssConf.css'
import { useParams } from 'react-router-dom'
import { DatabaseRepository } from "../../data/models/class/DatabaseRepository";
import { LinkProtectedResponse } from '../../data/models/interfaces/LinkProtectedResponse';
import { LinkProtectedRequest } from '../../data/models/interfaces/LinkProtectedRequest';
import { ChangeEvent, useState } from 'react';
import Loading from '../Loading/Loading';

function PrivatedLink({ repository }: { repository: DatabaseRepository }) {
    const [isLoading, setIsLoading] = useState(false)
    const { id } = useParams();
    const [inputValue, setInputValue] = useState("")

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        setInputValue(newValue);
    };

    async function requestPrivateLinkinfo() {
        const dataRequestPrivate: LinkProtectedRequest = {
            shortLink: String(id),
            password: inputValue
        }
        try {
            setIsLoading(true);
            const linkDataResponse: LinkProtectedResponse = await repository.requestProtectedLinkData(dataRequestPrivate);
            if (linkDataResponse?.originalLink) {
                window.location.href = linkDataResponse.originalLink;
            }
        } catch (error) {
            setIsLoading(false)
            console.error('Erro ao solicitar dados do link protegido:', error);
        }
    }

    return (
        <div>
            {isLoading ? <Loading /> : (
                <div className="input-container">
                    <h1 className='fs-18 mt-5 primary-text'>Insira a senha para acessar o link</h1>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <input className="input-text p-1 mt-1"
                            type="text"
                            id="input"
                            value={inputValue}
                            onChange={handleChange}
                            placeholder="Senha"
                        />
                        <button className="button-style ml-1 p-1 mt-1 fs-14 sombras" onClick={requestPrivateLinkinfo} type="submit">Acessar</button>
                    </form>
                </div>
            )}
        </div>
    )
}

export default PrivatedLink