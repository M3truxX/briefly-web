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

function ActivatePage() {
    const { repository } = useAppContext(); // Use o contexto de autenticação
    const { email } = useParams<{ email: string }>(); // Recupera o parâmetro email da URL, se existir
    const location = useLocation(); // Recupera informações sobre a rota atual
    const navigate = useNavigate(); // Hook para navegação
    const [isLoading, setIsLoading] = useState(false);

    // Verifica qual rota está acessando o componente
    const isExpired = location.pathname.includes('expired');

    const handleClickHome = () => {
        navigate('/');
    };

    const handleClick = async () => {
        setIsLoading(true); // Inicia o estado de loading
        try {
            if (email) {
                await repository.ActivateAccont(email);
                toast(Success.CODE_RESEND);
                setTimeout(() => {
                    handleClickHome()
                }, 2500);
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 403) {
                    toast(Errors.ACESSO_NEGADO);
                } else if (error.response?.status === 429) {
                    toast(Errors.MUITAS_REQUISCOES);
                }
            } else {
                toast(Errors.ERRO_ATIVACAO_CONTA);
            }
        } finally {
            setIsLoading(false); // Finaliza o estado de loading
        }
    };

    return (
        <div className='body-size'>
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
            <div className="center mb-50">
                <CardFunc />
            </div>
        </div>
    );
}

export default ActivatePage;
