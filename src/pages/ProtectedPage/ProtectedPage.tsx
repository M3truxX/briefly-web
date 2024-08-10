import './protectedPage.css';
import '../../utils/cssConf.css'
import { ApiService } from '../../api/ApiService';
import Cover from '../../components/Cover/Cover';
import { DatabaseRepository } from '../../data/models/class/DatabaseRepository';
import { DefaultRepository } from '../../data/repository/DefaultRepository';
import { Config } from '../../Config';
import PrivatedLink from '../../components/PrivatedLink/PrivatedLink';

function protectedPage() {
  const apiService: ApiService = new ApiService(Config.BASE_URL_MOBILE)
  const database: DatabaseRepository = new DefaultRepository(apiService)

  return (
    <div>
      <Cover />
      <div className='body-link'>
        <PrivatedLink repository={database} />
      </div>
    </div>
  )
}

export default protectedPage;