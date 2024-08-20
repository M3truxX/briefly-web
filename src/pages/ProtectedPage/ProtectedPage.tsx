// Importa estilos globais e bibliotecas necessárias
import '../../utils/cssConf.scss';
import { ApiService } from '../../api/ApiService';
import Cover from '../../components/Cover/Cover';
import PrivatedLink from '../../components/PrivatedLink/PrivatedLink';
import Rodape from '../../components/Rodape/Rodape';
import CardFunc from '../../components/CardFunc/CardFunc';
import Divider from '../../components/Divider/Divider';
import { DatabaseRepository } from '../../data/models/class/DatabaseRepository';
import { DefaultRepository } from '../../data/repository/DefaultRepository';
import { Config } from '../../Config';

// Define o componente funcional da página protectedPage
function protectedPage() {
  const apiService: ApiService = new ApiService(Config.BASE_URL); // Cria uma instância do serviço de API
  const database: DatabaseRepository = new DefaultRepository(apiService); // Cria uma instância do repositório padrão

  return (
    <div>
      <Cover />
      <div className='body-link'>
        <PrivatedLink repository={database} />
      </div>
      <div className="mt-50 mb-50">
        <Divider />
      </div>
      <div className="center mb-50">
        <CardFunc />
      </div>
      <Rodape />
    </div>
  );
}

export default protectedPage;