import './collapse.css'
import '../../utils/cssConf.css'
import { useState } from 'react';
import { CollapseProps } from '../../data/models/interfaces/CollapseProps';

const Collapse: React.FC<CollapseProps> = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleCollapse = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="collapse-container">
            <button onClick={toggleCollapse} className={`collapse-button secundary-text ${isOpen ? 'open' : ''}`}>
                {title}
            </button>
            <div className={`collapse-content ${isOpen ? 'open' : ''}`}>
                {children}
            </div>
        </div>
    );
}

export default Collapse;