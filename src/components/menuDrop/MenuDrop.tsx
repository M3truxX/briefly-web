import './menuDrop.scss';
import '../../utils/cssConf.scss';
import { useState, useEffect, useRef } from 'react';
import login from '../../img/login.png';
import person from '../../img/person.png';
import report from '../../img/report.png';
import person_add from '../../img/person_add.png';
import logout_img from '../../img/logout.png';
import history from '../../img/history.png';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../contexts/AppContext';

function MenuDrop() {
    const [isOpen, setIsOpen] = useState(false); // Estado para controle de abertura
    const [logado, setLogado] = useState(false); // Estado de autenticação inicial como falso
    const [userName, setUserName] = useState(''); // Estado para armazenar o nome do usuário
    const navigate = useNavigate(); // Hook para navegação
    const { user, logout } = useAppContext(); // Use o contexto geral
    const dropdownRef = useRef<HTMLDivElement>(null); // Referência ao container do dropdown

    // Funções de navegação
    const handleClickPerfil = () => navigate('/perfil');
    const handleClickhistorico = () => navigate('/historico');
    const handleClickEntrar = () => navigate('/login');
    const handleClickCriar = () => navigate('/register');
    const handleClickReportar = () => navigate('/report');
    const handleClickLogout = () => { logout(); navigate('/') };

    // Efeito para verificar se o usuário está logado
    useEffect(() => {
        if (user) {
            setUserName(user.account.username); // Define o nome do usuário
            setLogado(true); // Define como logado
        } else {
            setUserName('Convidado'); // Define como convidado se não estiver logado
            setLogado(false);
        }
    }, [user]);

    // Efeito para adicionar e remover o listener de clique
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false); // Fecha o dropdown se clicar fora
            }
        }

        // Adiciona o listener ao clicar
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            // Remove o listener ao desmontar o componente
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownRef]);

    // Alterna o estado de aberto/fechado
    const toggleCollapse = () => {
        setIsOpen(!isOpen);
    };

    // Trunca o nome do usuário para exibir no dropdown
    function truncateUserName(name: string, maxLength: number): string {
        if (name.length <= maxLength) return name;
        const lastSpaceIndex = name.slice(0, maxLength).lastIndexOf(' ');
        const truncatedName = lastSpaceIndex !== -1 ? name.slice(0, lastSpaceIndex) : name.slice(0, maxLength);
        return truncatedName + '...';
    }

    return (
        <div>
            <div className='collapse-container-login' ref={dropdownRef}>
                <div>
                    <button onClick={toggleCollapse} className={`collapse-button-login ${isOpen ? 'open' : ''}`}>
                        {logado ? truncateUserName(userName, 9) : 'Convidado'}
                    </button>
                    <div className={`collapse-content-login  ${isOpen ? 'open' : ''}`}>
                        <div>
                            <div className='container-card-login pbl-15'>
                                {logado ? (
                                    <div>
                                        <div className='card-base-login' onClick={handleClickPerfil} role="button" tabIndex={0}>
                                            <img className='img-res-login' src={person} alt="Ícone de perfil" />
                                            <div>
                                                <p className='fs-11 color-secondary'>Perfil</p>
                                            </div>
                                        </div>
                                        <div className='card-base-login' onClick={handleClickhistorico} role="button" tabIndex={0}>
                                            <img className='img-res-login' src={history} alt="Ícone de histórico" />
                                            <div>
                                                <p className='fs-11 color-secondary'>Histórico</p>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <div className='card-base-login' onClick={handleClickEntrar} role="button" tabIndex={0}>
                                            <img className='img-res-login' src={login} alt="Ícone de entrar" />
                                            <div>
                                                <p className='fs-11 color-secondary'>Entrar</p>
                                            </div>
                                        </div>
                                        <div className='card-base-login' onClick={handleClickCriar} role="button" tabIndex={3}>
                                            <img className='img-res-login' src={person_add} alt="Ícone de criar conta" />
                                            <div>
                                                <p className='fs-11 color-secondary'>Criar conta</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div>
                                    <div className='card-base-login' onClick={handleClickReportar} role="button" tabIndex={0}>
                                        <img className='img-res-login' src={report} alt="Ícone de reportar" />
                                        <div>
                                            <p className='fs-11 color-secondary'>reportar</p>
                                        </div>
                                    </div>
                                    {logado ? (
                                        <div className='card-base-login' onClick={handleClickLogout} role="button" tabIndex={1}>
                                            <img className='img-res-login' src={logout_img} alt="Ícone de sair" />
                                            <div>
                                                <p className='fs-11 color-secondary'>Sair</p>
                                            </div>
                                        </div>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='img-res-img ml-25'>
                    <img className='img-res-img' src={logado && user ? user.account.profileImageUrl === '' ? person : user.account.profileImageUrl : person} alt="Ícone de perfil" />
                </div>
            </div>
        </div>
    );
}

export default MenuDrop;