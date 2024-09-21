// Importa estilos globais e bibliotecas necessárias
import '../../utils/cssConf.scss';
import Divider from '../../components/Divider/Divider';
import CardFunc from '../../components/Cards/Cards';
import GenericStatus from '../../components/GenericStatus/GenericStatus';

// Define o componente funcional da página Home
function InactivatePage() {
    return (
        <div>
            <div className='center mbl-80'>
                <GenericStatus
                    title='Link inativo!'
                    sizeTitle={24}
                    subTitle='Volte para página principal'
                    sizeSubTitle={14} />
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

export default InactivatePage;