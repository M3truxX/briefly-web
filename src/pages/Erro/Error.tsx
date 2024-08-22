// Importa estilos globais e bibliotecas necessárias
import { Link } from 'react-router-dom';
import './erro.scss';
import '../../utils/cssConf.scss';

// Define o componente funcional da página Erro
function Erro() {
    return (
        <div className='not-found'>
            <h1 className="fs-55 font-bold color-dark">404</h1>
            <p className="fs-14 mb-20 color-secondary">Página não encontrada!</p>
            <Link className='buttom-link p-10' to="/">Voltar para a tela principal</Link> {/* Link para retornar à página principal */}
        </div>
    );
}

export default Erro;