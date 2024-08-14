import '../../utils/cssConf.scss'
import { ApiService } from '../../api/ApiService';
import Cover from '../../components/Cover/Cover';
import { DatabaseRepository } from '../../data/models/class/DatabaseRepository';
import { DefaultRepository } from '../../data/repository/DefaultRepository';
import { Config } from '../../Config';
import PrivatedLink from '../../components/PrivatedLink/PrivatedLink';
import Rodape from '../../components/Rodape/Rodape';
import CardFunc from '../../components/Func/FuncLink';
import Divider from '../../components/Divider/Divider';

function protectedPage() {
  const apiService: ApiService = new ApiService(Config.BASE_URL_MOBILE)
  const database: DatabaseRepository = new DefaultRepository(apiService)

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
  )
}

export default protectedPage;