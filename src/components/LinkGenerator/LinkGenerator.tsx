import { ChangeEvent, useState } from "react";
import { DatabaseRepository } from "../../data/models/class/DatabaseRepository";
import { LinkDataResponse } from "../../data/models/interfaces/LinkDataResponse";
import { LinkDataRequest } from "../../data/models/interfaces/LinkDataRequest";
import './LinkGenerator.css';
import '../../utils/cssConf.css'
import GraphInfo from "../GraphInfo/GraphInfo.";
import QrCodeInfo from "../QrCodeInfo/QrCodeInfo";
import Collapse from "../Collapse/Collapse";
import Loading from "../Loading/Loading";

function LinkGenerator({ repository }: { repository: DatabaseRepository }) {
  const [isLoading, setIsLoading] = useState(false);
  const [tipoConsulta, setTipoConsulta] = useState(false);
  const [nomeBotaoAction, setNomeBotaoAction] = useState('Encurtar')
  const [receiveResponse, setReceiveResponse] = useState<LinkDataResponse | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [inputValuePassword, setInputValuePassword] = useState('');
  const [inputValueSurname, setInputValueSurname] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    if (newValue.includes('localhost')) {
      setTipoConsulta(true);
      setNomeBotaoAction('Pesquisar');
    } else if (!event.target.value) {
      setTipoConsulta(false);
      setNomeBotaoAction('Encurtar');
      setReceiveResponse(null);
    } else {
      setTipoConsulta(false);
      setNomeBotaoAction('Encurtar');
    }
  };

  const handleChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValuePassword(newValue);
  }

  const handleChangeSurname = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValueSurname(newValue);
  }

  async function generatorShortLink() {
    setIsLoading(true);
    const linkDataRequest: LinkDataRequest = {
      link: inputValue,
      personalizedCode: inputValueSurname !== '' ? inputValueSurname : null,
      password: inputValuePassword !== '' ? inputValuePassword : null,
      expiresIn: null
    }

    try {
      const linkDataResponse: LinkDataResponse = await repository.generateLinkData(linkDataRequest);
      if (linkDataResponse?.originalLink) {
        setIsLoading(false)
        setInputValuePassword('');
        setInputValueSurname('');
        setReceiveResponse(linkDataResponse)
      }
    } catch (error) {
      setIsLoading(false)
      console.error('Erro ao solicitar dados do link protegido:', error);
    }
  }

  async function GetShortLinkInfos() {
    try {
      const linkDataResponse: LinkDataResponse = await repository.getLinkDataInfo(inputValue);
      if (linkDataResponse?.originalLink) {
        setIsLoading(false)
        setReceiveResponse(linkDataResponse)
      }
    } catch (error) {
      setIsLoading(false)
      console.error('Erro ao solicitar dados do link protegido:', error);
    }
  }

  return (
    <div>
      {isLoading ? <Loading /> :
        <div className="container-link mt-5">
          <div className="left">
            <h1 className="primary-text">Coloque seu link para encurtá-lo!</h1>
            <p className="primary-text">Ou informe um link gerado para saber seus detalhes.</p>
            <div className="input-container">
              <form onSubmit={(e) => e.preventDefault()}>
                <input className="input-text p-1 mt-1"
                  type="text"
                  id="input"
                  value={inputValue}
                  onChange={handleChange}
                  placeholder="Cole seu texto aqui"
                />
                <button className="button-style ml-1 p-1 mt-1 fs-14 sombras" onClick={tipoConsulta ? GetShortLinkInfos : generatorShortLink} type="submit">{nomeBotaoAction}</button>
              </form>
              <div>
                {!tipoConsulta ? (
                  <Collapse title='Mais opções'>
                    <p className="mt-1 mb-1 primary-text font-bold">Digite uma senha</p>
                    <input className="input-text p-1"
                      type="text"
                      id="input"
                      value={inputValuePassword}
                      onChange={handleChangePassword}
                      placeholder="Digite uma senha"
                    />
                    <p className="mt-1 mb-1 primary-text font-bold">Digite um nome customizado</p>
                    <input className="input-text p-1"
                      type="text"
                      id="input"
                      value={inputValueSurname}
                      onChange={handleChangeSurname}
                      placeholder="Digite um apelido"
                    />
                  </Collapse>
                ) : null}
              </div>
            </div>
            {receiveResponse?.totalVisits.length ? (
              <GraphInfo receiveResponse={receiveResponse} />
            ) : null}
          </div>
          <div className="right">
            <QrCodeInfo tipoConsulta={tipoConsulta} receiveResponse={receiveResponse} />
          </div>
        </div>
      }
    </div>
  )
}

export default LinkGenerator;