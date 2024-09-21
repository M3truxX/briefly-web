// Importa hooks necessários do react-router-dom
import { useParams, useLocation } from 'react-router-dom';
import Divider from '../../components/Divider/Divider';
import CardFunc from '../../components/Cards/Cards';
import '../../utils/cssConf.scss';
import GenericStatus from '../../components/GenericStatus/GenericStatus';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { useState } from 'react';
import axios from 'axios';
import { Errors } from '../../data/models/enums/Errors';
import { Success } from '../../data/models/enums/Success';
import { useAppContext } from '../../contexts/AppContext';

// Componente de página de ativação
function ActivatePage() {
    const { repository } = useAppContext(); // Use o contexto geral
    const { email } = useParams<{ email: string }>(); // Recupera o parâmetro email da URL, se existir
    const location = useLocation(); // Recupera informações sobre a rota atual
    const navigate = useNavigate(); // Hook para navegação
    const [isLoading, setIsLoading] = useState(false);
    const isExpired = location.pathname.includes('expired'); // Verifica qual rota está acessando o componente

    // Função para voltar à página inicial
    const handleClickHome = () => {
        navigate('/');
    };

    // Função para enviar um novo código de ativação
    const handleClick = async () => {
        setIsLoading(true); // Inicia o estado de loading
        try {
            if (email) {
                await repository.ActivateAccont(email);
                toast.success(Success.CODE_RESEND);
                setTimeout(() => {
                    handleClickHome()
                }, 2500);
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 403) {
                    toast.error(Errors.ACESSO_NEGADO);
                } else if (error.response?.status === 429) {
                    toast.error(Errors.MUITAS_REQUISCOES);
                }
            } else {
                toast.error(Errors.ERRO_ATIVACAO_CONTA);
            }
        } finally {
            setIsLoading(false); // Finaliza o estado de loading
        }
    };

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
            <div className='center mbl-80'>
                {/* Conteúdo do componente */}
                {isExpired ? (
                    <GenericStatus
                        title='Link de ativação invalido!'
                        sizeTitle={24}
                        subTitle='Click para solicitar um novo ou vá para página principal'
                        sizeSubTitle={14}
                        activatebutton={true}
                        nomeBotaoAction='Enviar'
                        onClick={handleClick}
                        isLoading={isLoading} />
                ) : (
                    <GenericStatus
                        title='Conta ativada com sucesso!'
                        sizeTitle={24}
                        subTitle='Vá em opções para logar ou volte para página principal'
                        sizeSubTitle={14} />
                )}
            </div>
            <div className="mb-50">
                <Divider />
            </div>
            <div className="center mb-100">
                <CardFunc />
            </div>
        </div>
    );
}

export default ActivatePage;