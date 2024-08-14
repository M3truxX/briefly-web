import '../../utils/cssConf.scss'
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
        <div className='theme-type'>
            <Cover />
            <div>
                <div className='center'>
                    <LinkGenerator repository={database} />
                </div>
                <div className="mt-50 mb-50">
                    <Divider />
                </div>
                <div className="center mb-50">
                    <CardFunc />
                </div>
            </div>
            <Rodape />
        </div>
    )
}

export default Home;