// Importa estilos globais e bibliotecas necessárias
import './Header.scss';
import '../../utils/cssConf.scss'
import { useNavigate } from 'react-router-dom';
import MenuDrop from '../menuDrop/MenuDrop';
import { useAppContext } from '../../contexts/AppContext';
import { useEffect } from 'react';

function Header() {
    const navigate = useNavigate(); // Hook para navegação
    const { user, session } = useAppContext(); // Use o contexto geral

    // useEffect(() => {
    //     if(user){
    //         session()
    //     }
    // }, [])
    
    const handleClick = () => {
        navigate('/');
    };

    return (
        <div className="background-cover">
            <div className="cover-info"> {/* Informações do cover */}
                <div>
                    <h1 className='fs-40 titulo-click' onClick={handleClick}>Briefly</h1> {/* Título com clique para navegar */}
                    <p className='fs-20'>Encurtando links</p> {/* Descrição */}
                </div>
                <p className='fs-12'>Solução rápida e prática para encurtamento de links.</p> {/* Subdescrição */}
            </div>
            <div className='lado-direito mt-80 mr-30'>
                <MenuDrop />
            </div>
        </div>
    )
}

export default Header;