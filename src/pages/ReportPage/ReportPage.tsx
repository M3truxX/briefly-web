// Importa estilos globais e bibliotecas necessárias
import '../../utils/cssConf.scss';
import Divider from '../../components/Divider/Divider';
import CardFunc from '../../components/Cards/Cards';
import ErrorReport from '../../components/ErrorReport/ErrorReport';

// Define o componente funcional da página Home
function ReportPage() {
    return (
        <div>
            <div className='center mbl-80'>
                <ErrorReport />
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

export default ReportPage;