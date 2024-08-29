// Importa estilos globais e bibliotecas necessárias
import '../../utils/cssConf.scss';
import { ApiService } from '../../api/ApiService';
import CardFunc from '../../components/Cards/Cards';
import Divider from '../../components/Divider/Divider';
import { DatabaseRepository } from '../../data/models/class/DatabaseRepository';
import { DefaultRepository } from '../../data/repository/DefaultRepository';
import { Config } from '../../Config';
import RegisterUser from '../../components/RegisterUser/RegisterUser';
import Login from '../../components/Login/Login';

// Define o componente funcional da página protectedPage
function Register() {
    const apiService: ApiService = new ApiService(Config.BASE_URL); // Cria uma instância do serviço de API
    const database: DatabaseRepository = new DefaultRepository(apiService); // Cria uma instância do repositório padrão

    return (
        <div className='body-size'>
            <div className='center mbl-80'>
                <RegisterUser repository={database} />
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

export default Register;