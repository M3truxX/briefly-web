import './home.css';
import '../../utils/cssConf.css'
import { ApiService } from '../../api/ApiService';
import Cover from '../../components/Cover/Cover';
import Divider from '../../components/Divider/Divider';
import CardFunc from '../../components/Func/FuncLink';
import Rodape from '../../components/Rodape/Rodape';
import LinkGenerator from '../../components/LinkGenerator/LinkGenerator';
import { DatabaseRepository } from '../../data/models/class/DatabaseRepository';
import { DefaultRepository } from '../../data/repository/DefaultRepository';
import { Config } from '../../Config';

function Home() {
    const apiService: ApiService = new ApiService(Config.BASE_URL_MOBILE)
    const database: DatabaseRepository = new DefaultRepository(apiService)

    return (
        <div>
            <Cover />
            <div className='body-link'>
                <div className='center'>
                    <LinkGenerator repository={database} />
                </div>
                <div className="mt-5 mb-5">
                    <Divider />
                </div>
                <div className="center mb-5">
                    <CardFunc />
                </div>
            </div>
            <Rodape />
        </div>
    )
}

export default Home;