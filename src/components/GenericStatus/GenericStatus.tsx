import './genericStatus.scss';
import '../../utils/cssConf.scss'
import { useNavigate } from 'react-router-dom';
import CustonButtom from '../CustomButtom/CustonButtom';
import { StatusPrps } from '../../data/models/interfaces/StatusPrps';

const GenericStatus: React.FC<StatusPrps> = ({
    title, subTitle, activatebutton = false,
    nomeBotaoAction = 'none', onClick,
    sizeTitle = 55,
    sizeSubTitle = 14,
    isLoading = false
}) => {
    const navigate = useNavigate(); // Hook para navegação

    // Manipula o clique no botão, se ativado e não carregando
    const handleClick = () => {
        onClick && onClick(); // Chama onClick somente se for uma função
    };

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