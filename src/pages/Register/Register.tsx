// Importa estilos globais e bibliotecas necessárias
import '../../utils/cssConf.scss';
import CardFunc from '../../components/Cards/Cards';
import Divider from '../../components/Divider/Divider';
import RegisterUser from '../../components/RegisterUser/RegisterUser';

// Define o componente funcional da página protectedPage
function Register() {
    return (
        <div>
            <div className='center mbl-80'>
                <RegisterUser />
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

export default Register;