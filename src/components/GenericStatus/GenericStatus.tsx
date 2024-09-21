import './genericStatus.scss';
import '../../utils/cssConf.scss'
import { useNavigate } from 'react-router-dom';
import CustonButtom from '../CustomButtom/CustonButtom';
import { StatusProps } from '../../data/models/interfaces/statusPrps';

const GenericStatus: React.FC<StatusProps> = ({
    title, subTitle, activatebutton = false, // Define se o botão de ação está ativo
    nomeBotaoAction = 'none', onClick, // Define o nome do botão de ação e a função de clique
    sizeTitle = 55, // Define o tamanho do título
    sizeSubTitle = 14, // Define o tamanho do subtítulo
    isLoading = false // Define se o carregamento está ativo
}) => {
    const navigate = useNavigate(); // Hook para navegação

    // Manipula o clique no botão, se ativado e não carregando
    const handleClick = () => {
        onClick && onClick(); // Chama onClick somente se for uma função
    };

    // Manipula o clique no botão de volta para a página inicial
    const handleClickHome = () => {
        navigate('/');
    };

    return (
        <div className='not-found mt-50'>
            <h1 className={`fs-${sizeTitle} font-bold color-primary`}>{title}</h1>
            <p className={`fs-${sizeSubTitle} mb-20 color-secondary`}>{subTitle}</p>
            <div className='status-btn-container'>
                <div>
                    <CustonButtom
                        text="Home"
                        secondary={true}
                        activate={true}
                        onClick={handleClickHome} />
                </div>
                {activatebutton ? (
                    <div className='ml-10'>
                        <CustonButtom
                            text={nomeBotaoAction}
                            onClick={handleClick}
                            loading={isLoading} />
                    </div>
                ) : null}
            </div>
        </div>
    )
}

export default GenericStatus;