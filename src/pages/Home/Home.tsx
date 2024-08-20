// Importa estilos globais e bibliotecas necessárias
import './home.scss';
import '../../utils/cssConf.scss';
import { ApiService } from '../../api/ApiService';
import Cover from '../../components/Cover/Cover';
import Divider from '../../components/Divider/Divider';
import CardFunc from '../../components/CardFunc/CardFunc';
import Rodape from '../../components/Rodape/Rodape';
import LinkGenerator from '../../components/LinkGenerator/LinkGenerator';
import { DatabaseRepository } from '../../data/models/class/DatabaseRepository';
import { DefaultRepository } from '../../data/repository/DefaultRepository';
import { Config } from '../../Config';

// Define o componente funcional da página Home
function Home() {
    const apiService: ApiService = new ApiService(Config.BASE_URL);
    const database: DatabaseRepository = new DefaultRepository(apiService);

    return (
        <div className='theme-type'>
            <Cover />
            <div className='center'>
                <LinkGenerator repository={database} />
            </div>
            <div className="mt-50 mb-50">
                <Divider />
            </div>
            <div className="center mb-100">
                <CardFunc />
            </div>
            <div className="rodape-container">
                <Rodape />
            </div>
        </div>
    );
}

export default Home;