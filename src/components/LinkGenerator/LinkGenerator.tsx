import { ChangeEvent, useState } from "react";
import { DatabaseRepository } from "../../data/models/class/DatabaseRepository";
import { LinkDataResponse } from "../../data/models/interfaces/LinkDataResponse";
import { LinkDataRequest } from "../../data/models/interfaces/LinkDataRequest";
import GraphInfo from "../GraphInfo/GraphInfo.";
import QrCodeInfo from "../QrCodeInfo/QrCodeInfo";
import Collapse from "../Collapse/Collapse";
import { ToastContainer, toast } from 'react-toastify';
import CustonButtom from "../CustomButtom/CustonButtom";
import { Errors } from "../../data/models/enums/Errors";
import './LinkGenerator.scss';
import '../../utils/cssConf.scss'
import 'react-toastify/dist/ReactToastify.css';
import { Config } from '../../Config';


function LinkGenerator({ repository }: { repository: DatabaseRepository }) {
  const [isLoading, setIsLoading] = useState(false);
  const [tipoConsulta, setTipoConsulta] = useState(false);
  const [nomeBotaoAction, setNomeBotaoAction] = useState('Encurtar')
  const [receiveResponse, setReceiveResponse] = useState<LinkDataResponse | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [inputValuePassword, setInputValuePassword] = useState('');
  const [inputValueSurname, setInputValueSurname] = useState('');
  const [activateButton, setActivateButton] = useState(false)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    if (newValue.includes(Config.BASE_NAME_DOMAIN)) {
      setTipoConsulta(true);
      setNomeBotaoAction('Pesquisar');
      setActivateButton(true)
    } else if (!event.target.value) {
      setTipoConsulta(false);
      setNomeBotaoAction('Encurtar');
      setReceiveResponse(null);
      setActivateButton(false)
    } else {
      setTipoConsulta(false);
      setNomeBotaoAction('Encurtar');
      setActivateButton(true)
    }
  };

  const handleChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValuePassword(newValue);
  }

  const handleChangeSurname = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    if (event.target.value.length >= 6) {
      setActivateButton(true)
    } else if (event.target.value.length < 6 && event.target.value.length > 0) {
      setActivateButton(false)
    } else {
      setActivateButton(true)
    }
    setInputValueSurname(newValue);
  }


  const handleBlurSurname = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length < 6 && event.target.value.length > 0) {
      toast(Errors.LIMITE_CARACTERE_APELIDO);
    }
  }

  const handleClick = () => {
    if (activateButton) {
      return tipoConsulta ? GetShortLinkInfos() : generatorShortLink();
    }
    return undefined;
  };

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
      toast(Errors.APELIDO_JA_CADASTRADO);
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
      toast(Errors.LINK_NAO_ENCONTRADO);
    }
  }

  return (
    <div>
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
      <div className="container-link mt-50">
        <div className="left">
          <h1 className="primary-text">Coloque seu link para encurtá-lo!</h1>
          <p className="primary-text">Ou informe um link gerado para saber seus detalhes.</p>
          <div className="input-container">
            <form onSubmit={(e) => e.preventDefault()}>
              <input className="input-text p-10"
                type="text"
                id="input"
                value={inputValue}
                onChange={handleChange}
                placeholder="Cole seu texto aqui"
              />
            </form>
            <CustonButtom
              text={nomeBotaoAction}
              activate={activateButton}
              loading={isLoading}
              onClick={handleClick} />
          </div>
          {!tipoConsulta ? (
            <Collapse title='Mais opções'>
              <p className="mt-10 mb-10 fs-14 primary-text font-bold">Digite uma senha</p>
              <input className="input-text p-10"
                type="password"
                id="input"
                value={inputValuePassword}
                onChange={handleChangePassword}
                placeholder="Digite uma senha"
              />
              <p className="mt-10 mb-10 fs-14 primary-text font-bold">Digite um nome customizado</p>
              <input className="input-text p-10"
                type="text"
                id="input"
                value={inputValueSurname}
                onChange={handleChangeSurname}
                onBlur={handleBlurSurname}
                placeholder="Digite um apelido"
              />
              <p className="fs-12 mt-5 secundary-text">O apelido deve ter no mínimo 6 caracteres</p>
            </Collapse>
          ) : null}
          {receiveResponse && tipoConsulta ? (
            <GraphInfo receiveResponse={receiveResponse} />
          ) : null}
        </div>
        <div className="right">
          <QrCodeInfo tipoConsulta={tipoConsulta} receiveResponse={receiveResponse} />
        </div>
      </div>
    </div>
  )
}

export default LinkGenerator;