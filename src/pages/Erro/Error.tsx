// Importa estilos globais e bibliotecas necessárias
import { Link } from 'react-router-dom';
import './erro.scss';
import '../../utils/cssConf.scss';

// Define o componente funcional da página Erro
function Erro() { 
    return (
        <div className='not-found'>
            <h1>404</h1>
            <h2>Página não encontrada!</h2>
            <Link className='buttom-link mt-14 p-10' to="/">Voltar para a tela principal</Link> {/* Link para retornar à página principal */}
        </div>
    );
}

export default Erro;