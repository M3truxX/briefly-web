import "./qrCodeInfo.scss";
import '../../utils/cssConf.scss';
import { LinkDataResponse } from "../../data/models/interfaces/LinkDataResponse";
import { formatDate } from "../../utils/formatDate";

function QrCodeInfo({ receiveResponse, tipoConsulta }: { receiveResponse: LinkDataResponse | null, tipoConsulta: boolean }) {
    return (
        <div>
            {receiveResponse ? (
                <div className={`pb-20 qrcode-container ${receiveResponse ? 'visible' : ''}`}>
                    {tipoConsulta ? (
                        <div>
                            <h1 className="mb-10 primary-text">Link Original</h1>
                            <a className="link-mostrar" href={receiveResponse.originalLink} target="blank">{receiveResponse.originalLink}</a>
                        </div>
                    ) : (
                        <div>
                            <h1 className="mb-10 primary-text">Link Curto</h1>
                            <a className="link-mostrar" href={receiveResponse.shortLink} target="blank">{receiveResponse.shortLink}</a>
                        </div>
                    )}
                    <img className="mt-10" src={receiveResponse.qrCodeLink.replace("http://localhost:9098", "http://192.168.0.168:9098")} alt="QR Code" />
                    <p className="mt-10">Expira em: <span className="primary-text">{formatDate(receiveResponse.expiresAt)}</span></p>
                </div>
            ) : null}
        </div>
    )
}

export default QrCodeInfo;