// Importa estilos globais e bibliotecas necessárias
import './Header.scss';
import '../../utils/cssConf.scss'
import { useNavigate } from 'react-router-dom';
import LoginUser from '../LoginUser/LoginUser';

function Cover() {
    const navigate = useNavigate(); // Hook para navegação

    // Manipula o clique no título para navegar para a página inicial
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
                <LoginUser />
            </div>
        </div>
    )
}

export default Cover;