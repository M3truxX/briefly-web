// Importa estilos globais e bibliotecas necessárias
import { Link } from 'react-router-dom';
import './erro.scss';
import '../../utils/cssConf.scss';
import GenericStatus from '../../components/GenericStatus/GenericStatus';
import Divider from '../../components/Divider/Divider';
import CardFunc from '../../components/Cards/Cards';

// Define o componente funcional da página Erro
function Erro() {
    return (
        <div className='body-size'>
            <div className='center mbl-80'>
                <GenericStatus title='404' subTitle='Página não encontrada!' />
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

export default Erro;