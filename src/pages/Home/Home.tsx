// Importa estilos globais e bibliotecas necessárias
import '../../utils/cssConf.scss';
import { ApiService } from '../../api/ApiService';
import Divider from '../../components/Divider/Divider';
import CardFunc from '../../components/Cards/Cards';
import LinkGenerator from '../../components/LinkGenerator/LinkGenerator';
import { DatabaseRepository } from '../../data/models/class/DatabaseRepository';
import { DefaultRepository } from '../../data/repository/DefaultRepository';
import { Config } from '../../Config';

// Define o componente funcional da página Home
function Home() {
    const apiService: ApiService = new ApiService(Config.BASE_URL);
    const database: DatabaseRepository = new DefaultRepository(apiService);

    return (
        <div className='body-size'>
            <div className='center mbl-80'>
                <LinkGenerator repository={database} />
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