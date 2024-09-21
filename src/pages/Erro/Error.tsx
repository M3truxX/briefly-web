// Importa estilos globais e bibliotecas necessárias
import './erro.scss';
import '../../utils/cssConf.scss';
import GenericStatus from '../../components/GenericStatus/GenericStatus';

// Define o componente funcional da página Erro
function Erro() {
    return (
        <div>
            <div className='center mbl-80'>
                <GenericStatus title='404' subTitle='Página não encontrada!' />
            </div>
        </div>
    );
}

export default Erro;