// Importa estilos globais e bibliotecas necessárias
import '../../utils/cssConf.scss';
import CardFunc from '../../components/Cards/Cards';
import Divider from '../../components/Divider/Divider';
import Login from '../../components/Login/Login';

// Define o componente funcional da página protectedPage
function LoginPage() {
    return (
        <div className='body-size'>
            <div className='center mbl-80'>
                <Login />
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

export default LoginPage;