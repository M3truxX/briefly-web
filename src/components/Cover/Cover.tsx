import './cover.scss';
import '../../utils/cssConf.scss'
import { useNavigate } from 'react-router-dom';

function Cover() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/');
    };

    return (
        <div className="background-cover">
            <div className="cover-info">
                <div>
                    <h1 className='titulo-click fs-40' onClick={handleClick}>Briefly</h1>
                    <h1 className='fs-20'>Encurtando links</h1>
                </div>
                <p className='fs-12'>Solução rápida e prática para encurtamento de links.</p>
            </div>
        </div>
    )
}

export default Cover;