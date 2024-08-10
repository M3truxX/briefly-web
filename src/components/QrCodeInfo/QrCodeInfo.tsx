import "./qrCodeInfo.css"
import { LinkDataResponse } from "../../data/models/interfaces/LinkDataResponse";
import { formatDate } from "../../utils/formatDate";

export default function QrCodeInfo({ receiveResponse, tipoConsulta }: { receiveResponse: LinkDataResponse | null, tipoConsulta: boolean }) {
    return (
        <div>
            {receiveResponse ? (
                <div className="qrcode-container pt-2 pb-2 pl-5 pr-5 ml-5">
                    {tipoConsulta ? (
                        <div>
                            <h1 className="titulo-link mb-1 primary-text">Link Original</h1>
                            <a href={receiveResponse.originalLink} target="blank">{receiveResponse.originalLink}</a>
                        </div>
                    ) : (
                        <div>
                            <h1 className="titulo-link mb-1 primary-text">Link Curto</h1>
                            <a href={receiveResponse.shortLink} target="blank">{receiveResponse.shortLink}</a>
                        </div>
                    )}
                    <img className="mt-1" src={receiveResponse.qrCodeLink.replace("http://localhost:9098", "http://192.168.0.168:9098")} alt="QR Code" />
                    <p className="mt-1">Expira em: <span className="primary-text">{formatDate(receiveResponse.expiresAt)}</span></p>
                </div>) : null}
        </div>
    )
}

