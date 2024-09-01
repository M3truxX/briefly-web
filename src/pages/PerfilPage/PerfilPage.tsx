// Importa estilos globais e bibliotecas necessárias
import '../../utils/cssConf.scss';
import CardFunc from '../../components/Cards/Cards';
import Divider from '../../components/Divider/Divider';
import EditImage from '../../components/EditImage/EditImage';

// Define o componente funcional da página protectedPage
function perfilPage() {
    return (
        <div className='body-size'>
            <div className='center mbl-80'>
                <EditImage />
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

export default perfilPage;