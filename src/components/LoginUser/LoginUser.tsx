import './loginUser.scss';
import '../../utils/cssConf.scss';
import { useState, useEffect } from 'react';
import login from '../../img/login.png';
import person from '../../img/person.png';
import report from '../../img/report.png';
import person_add from '../../img/person_add.png';
import manage from '../../img/manage.png';
import logout_img from '../../img/logout.png';
import history from '../../img/history.png';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext'; // Importe o useAuth

function LoginUser() {
    const [isOpen, setIsOpen] = useState(false); // Estado para controle de abertura
    const [logado, setLogado] = useState(false); // Estado de autenticação inicial como falso
    const [userName, setUserName] = useState(''); // Estado para armazenar o nome do usuário
    const navigate = useNavigate(); // Hook para navegação
    const { user, logout } = useAuth(); // Use o contexto de autenticação

    // Efeito para verificar se o usuário está logado
    useEffect(() => {
        if (user) { // Se o usuário estiver autenticado
            setUserName(user.account.username); // Define o nome do usuário
            setLogado(true); // Define como logado
        } else {
            setUserName('Convidado'); // Define como convidado se não estiver logado
            setLogado(false);
        }
    }, [user]); // Executa o efeito quando o estado do usuário mudar

    // Alterna o estado de aberto/fechado
    const toggleCollapse = () => {
        setIsOpen(!isOpen);
    };

    // ir pra rota de perfil
    const handleClickPerfil = () => {
        navigate('/perfil');
    };

    // ir pra rota de historico
    const handleClickhistorico = () => {
        navigate('/history');
    };

    // ir pra rota de entrar na conta
    const handleClickEntrar = () => {
        navigate('/login');
    };

    // ir pra rota de registrar
    const handleClickCriar = () => {
        navigate('/register');
    };

    // ir pra rota de reportar
    const handleClickReportar = () => {
        navigate('/report');
    };

    // sair da conta e ir para página home
    const handleClickLogout = () => {
        logout(); // Chama a função de logout do contexto
        navigate('/');
    };

    return (
        <div className='collapse-container-login'>
            <div>
                <button onClick={toggleCollapse} className={`collapse-button-login ${isOpen ? 'open' : ''}`}>
                    {logado ? userName : 'Convidado'} {/* Nome de perfil */}
                </button>
                <div className={`collapse-content-login  ${isOpen ? 'open' : ''}`}>
                    <div>
                        <div className='container-card-login pbl-15'>
                            {/* Primeiro conjunto de cartões */}
                            {logado ? (
                                <div>
                                    <div className='card-base-login' onClick={handleClickPerfil} role="button" tabIndex={0}>
                                        <img className='img-res-login' src={manage} alt="Ícone de link" /> {/* Ícone de link */}
                                        <div>
                                            <p className='fs-11 color-secondary'>Perfil</p> {/* Descrição do cartão */}
                                        </div>
                                    </div>
                                    <div className='card-base-login' onClick={handleClickhistorico} role="button" tabIndex={0}>
                                        <img className='img-res-login' src={history} alt="Ícone de link" /> {/* Ícone de link */}
                                        <div>
                                            <p className='fs-11 color-secondary'>Histórico</p> {/* Descrição do cartão */}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <div className='card-base-login' onClick={handleClickEntrar} role="button" tabIndex={0}>
                                        <img className='img-res-login' src={login} alt="Ícone de link" /> {/* Ícone de link */}
                                        <div>
                                            <p className='fs-11 color-secondary'>Entrar</p> {/* Descrição do cartão */}
                                        </div>
                                    </div>
                                    <div className='card-base-login' onClick={handleClickCriar} role="button" tabIndex={3}>
                                        <img className='img-res-login' src={person_add} alt="Ícone de link" /> {/* Ícone de link */}
                                        <div>
                                            <p className='fs-11 color-secondary'>Criar conta</p> {/* Descrição do cartão */}
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div>
                                <div className='card-base-login' onClick={handleClickReportar} role="button" tabIndex={0}>
                                    <img className='img-res-login' src={report} alt="Ícone de link" /> {/* Ícone de link */}
                                    <div>
                                        <p className='fs-11 color-secondary'>reportar</p> {/* Descrição do cartão */}
                                    </div>
                                </div>
                                {logado ? (
                                    <div className='card-base-login' onClick={handleClickLogout} role="button" tabIndex={1}>
                                        <img className='img-res-login' src={logout_img} alt="Ícone de QR code" /> {/* Ícone de QR code */}
                                        <div>
                                            <p className='fs-11 color-secondary'>Sair</p> {/* Descrição do cartão */}
                                        </div>
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='img-res-img ml-5'>
                <img className='img-res-img' src={logado && user ? user.account.profileImageUrl === '' ? person : user.account.profileImageUrl : person} alt="Ícone de análise" />
            </div>
        </div>
    );
}

export default LoginUser;
