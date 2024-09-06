// Importa estilos globais e bibliotecas necessárias
import './LinkGenerator.scss';
import '../../utils/cssConf.scss'
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from "react";
import { LinkDataResponse } from "../../data/models/interfaces/LinkDataResponse";
import { LinkDataRequest } from "../../data/models/interfaces/LinkDataRequest";
import GraphInfo from "../GraphInfo/GraphInfo.";
import QrCodeInfo from "../QrCodeInfo/QrCodeInfo";
import Collapse from "../Collapse/Collapse";
import { ToastContainer, toast } from 'react-toastify';
import CustonButtom from "../CustomButtom/CustonButtom";
import { Errors } from "../../data/models/enums/Errors";
import { Config } from '../../Config';
import CustonInputText from '../CustonInputText/CustonInputText';
import axios, { AxiosError } from 'axios';
import { AxiosErrorResponse } from '../../data/models/interfaces/AxiosErroResponse';
import { useAppContext } from '../../contexts/AppContext';

// Componente principal de geração de links
function LinkGenerator() {
  // Estados para controle de entradas e comportamento
  const { user, repository } = useAppContext(); // Use o contexto geral
  const [resetEntlink, setResetEntlink] = useState(false);
  const [resetEntSenha, setResetEntSenha] = useState(false);
  const [resetEntApelido, setResetEntApelido] = useState(false);

  const [ctrllEntlink, setCtrlEntlink] = useState(0);
  const [ctrlEntSenha, setCtrlEntSenha] = useState(0);
  const [ctrlEntApelido, setCtrlEntApelido] = useState(0);

  // Funções para manipulação de inputs
  const entLink = (text: string) => { checkInputLink(text); setLinkText(text) }
  const entSenha = (text: string) => { checkInputSenha(text); setSenhaText(text) }
  const entApelido = (text: string) => { checkInputApelido(text); setApelidoText(text) }

  const [linkText, setLinkText] = useState('');
  const [senhaText, setSenhaText] = useState('');
  const [apelidoText, setApelidoText] = useState('');

  // Estados para controle do botão e requisições
  const [isLoading, setIsLoading] = useState(false);
  const [tipoConsulta, setTipoConsulta] = useState(false);
  const [nomeBotaoAction, setNomeBotaoAction] = useState('Encurtar')
  const [receiveResponse, setReceiveResponse] = useState<LinkDataResponse | null>(null);
  const [activateButton, setActivateButton] = useState(false)

  // Verifica a validade dos inputs ao serem alterados
  useEffect(() => {
    if (checkInputLink(linkText) && checkInputSenha(senhaText) && checkInputApelido(apelidoText)) {
      setActivateButton(true)
    } else {
      setActivateButton(false)
    }
  }, [linkText, senhaText, apelidoText]);

  // Verifica a validade do link inserido
  function checkInputLink(text: string): boolean {
    if (text === '') {
      setCtrlEntlink(0);
      setNomeBotaoAction('Encurtar');
      return false;
    }
    setCtrlEntlink(2);
    if (text.includes(Config.BASE_DOMAIN)) {
      setNomeBotaoAction('Pesquisar');
    } else {
      setNomeBotaoAction('Encurtar');
    }
    return true;
  }

  // Verifica a validade da senha inserida
  function checkInputSenha(text: string): boolean {
    if (text === '') {
      setCtrlEntSenha(0);
      return true;
    }
    if (text.length < 3) {
      setCtrlEntSenha(1);
      return false;
    }
    setCtrlEntSenha(2);
    return true;
  }

  // Verifica a validade do apelido inserido
  function checkInputApelido(text: string): boolean {
    if (text === '') {
      setCtrlEntApelido(0);
      return true;
    }
    if (text.length < 6 || text.length > 15) {
      setCtrlEntApelido(1);
      return false;
    }
    setCtrlEntApelido(2);
    return true;
  }

  // Lida com o clique do botão principal
  const handleClick = () => {
    if (activateButton) {
      return nomeBotaoAction === "Pesquisar" ? GetShortLinkInfos() : generatorShortLink();
    }
    return undefined;
  };

  // Gera um link encurtado
  async function generatorShortLink() {
    setIsLoading(true);
    const linkDataRequest: LinkDataRequest = {
      link: linkText,
      personalizedCode: apelidoText !== '' ? apelidoText : null,
      password: senhaText !== '' ? senhaText : null,
      expiresIn: null
    }

    try {
      let linkDataResponse: LinkDataResponse;

      if (user) {
        linkDataResponse = await repository.generateUserLinkEntry(user.token, linkDataRequest);
      } else {
        linkDataResponse = await repository.generateLinkData(linkDataRequest);
      }

      if (linkDataResponse) {
        setTipoConsulta(false);
        setReceiveResponse(linkDataResponse);
        setResetEntlink(prev => !prev);
        setResetEntSenha(prev => !prev);
        setResetEntApelido(prev => !prev);
        setTimeout(() => {
          setCtrlEntlink(0);
          setCtrlEntSenha(0);
          setCtrlEntApelido(0);
        }, 100);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<AxiosErrorResponse>;
        if (axiosError.response?.status === 409) {
          toast(Errors.APELIDO_JA_CADASTRADO);
        } else {
          toast(Errors.SERVIDOR_NAO_RESPONDENDO);
        }
      }
    } finally {
      setIsLoading(false); // Finaliza o estado de loading
    }
  }

  // Obtém informações de um link já encurtado
  async function GetShortLinkInfos() {
    setIsLoading(true)
    try {
      let linkDataResponse: LinkDataResponse

      if (user) {
        linkDataResponse = await repository.getUserLinkEntry(user.token, linkText);
      } else {
        linkDataResponse = await repository.getLinkDataInfo(linkText);
      }

      if (linkDataResponse) {
        setTipoConsulta(true);
        setReceiveResponse(linkDataResponse)
      }
    } catch (error) {
      toast(Errors.LINK_NAO_ENCONTRADO);
    } finally {
      setIsLoading(false); // Finaliza o estado de loading
    }
  }

  return (
    <div>
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
      <div className="container-link">
        <div>
          <h1 className="color-primary fs-24">Coloque seu link para encurtá-lo!</h1>
          <p className="color-secondary fs-14">Ou informe um link gerado para saber seus detalhes.</p>
          <div className="input-container">
            <form onSubmit={(e) => e.preventDefault()}>
              <CustonInputText
                textPlaceholder="Cole ou insira seu link"
                estado={ctrllEntlink}
                travelInfo={entLink}
                resetText={resetEntlink}
              />
            </form>
            <div className='ml-10'>
              <CustonButtom
                text={nomeBotaoAction}
                activate={activateButton}
                loading={isLoading}
                onClick={handleClick} />
            </div>
          </div>
          {nomeBotaoAction === "Encurtar" ? (
            <Collapse title='Mais opções'>
              <p className="mb-10 mt-25 fs-14 color-primary font-bold">Digite uma senha</p>
              <div className='center'>
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
              </div>
              <p className="mbl-10 fs-14 color-primary font-bold">Digite um nome customizado</p>
              <div className='center'>
                <CustonInputText
                  textPlaceholder="Digite um apelido"
                  estado={ctrlEntApelido}
                  color='black'
                  travelInfo={entApelido}
                  resetText={resetEntApelido}
                  showTextdescription={ctrlEntApelido === 1 ? true : false}
                  textdescription='Deve conter no mínimo 6 e máximo 15 caracteres.'
                />
              </div>
            </Collapse>
          ) : null}
          {tipoConsulta ? (
            <div className='input-container'>
              <GraphInfo receiveResponse={receiveResponse} />
            </div>
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