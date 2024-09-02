// Importa estilos globais e bibliotecas necessárias
import '../../utils/cssConf.scss';
import CardFunc from '../../components/Cards/Cards';
import Divider from '../../components/Divider/Divider';
import TableHistory from '../../components/TableHistory/TableHistory';

// Define o componente funcional da página protectedPage
function HistoryPage() {
    return (
        <div className='body-size'>
            <div className='center mbl-80'>
                <TableHistory/>
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

export default HistoryPage;