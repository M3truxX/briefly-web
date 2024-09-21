// Importa estilos globais e bibliotecas necessárias
import '../../utils/cssConf.scss';
import PrivatedLink from '../../components/PrivatedLink/PrivatedLink';
import CardFunc from '../../components/Cards/Cards';
import Divider from '../../components/Divider/Divider';

// Define o componente funcional da página protectedPage
function protectedPage() {
  return (
    <div>
      <div className='center mbl-80'>
        <PrivatedLink />
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

export default protectedPage;