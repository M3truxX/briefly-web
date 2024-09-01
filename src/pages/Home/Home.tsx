// Importa estilos globais e bibliotecas necessárias
import '../../utils/cssConf.scss';
import Divider from '../../components/Divider/Divider';
import CardFunc from '../../components/Cards/Cards';
import LinkGenerator from '../../components/LinkGenerator/LinkGenerator';
import { DatabaseRepository } from '../../data/models/class/DatabaseRepository';

// Define o componente funcional da página Home
function Home() {
    return (
        <div className='body-size'>
            <div className='center mbl-80'>
                <LinkGenerator />
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

export default Home;