// Importa estilos globais e bibliotecas necessárias
import "./qrCodeInfo.scss";
import '../../utils/cssConf.scss';
import { LinkDataResponse } from "../../data/models/interfaces/LinkDataResponse";
import { formatDate } from "../../utils/formatDate";

// Componente QrCodeInfo exibe informações de um QR code e detalhes do link associado.
function QrCodeInfo({ receiveResponse, tipoConsulta }: { receiveResponse: LinkDataResponse | null, tipoConsulta: boolean }) {
    return (
        <div>
            {receiveResponse ? (
                <div className={`pbl-20 qrcode-container ${receiveResponse ? 'visible' : ''}`}>
                    {tipoConsulta && receiveResponse.originalLink ? (
                        <div>
                            <h1 className="mb-10 color-primary">Link Original</h1>
                            <a className="link-mostrar" href={receiveResponse.originalLink} target="blank">{receiveResponse.originalLink.slice(0, 40) + '...'}</a>
                        </div>
                    ) : (
                        <div>
                            <h1 className="mb-10 color-primary">Link Curto</h1>
                            <a className="link-mostrar" href={receiveResponse.shortLink} target="blank">{receiveResponse.shortLink}</a>
                        </div>
                    )}
                    <img className="mt-10" src={receiveResponse.qrCodeLink} alt="QR Code" />
                    <p className="mt-10 color-dark">Expira em: <span className="color-primary">{formatDate(receiveResponse.expiresAt)}</span></p>
                </div>
            ) : null}
        </div>
    )
}

export default QrCodeInfo;