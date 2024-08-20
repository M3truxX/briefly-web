// Importa estilos globais e bibliotecas necessárias
import './collapse.scss'
import '../../utils/cssConf.scss'
import { useState } from 'react';
import { CollapseProps } from '../../data/models/interfaces/CollapseProps';

const Collapse: React.FC<CollapseProps> = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false); // Estado para controle de abertura

    // Alterna o estado de aberto/fechado
    const toggleCollapse = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="collapse-container">
            <button onClick={toggleCollapse} className={`collapse-button secundary-text ${isOpen ? 'open' : ''}`}>
                {title} {/* Título do colapso */}
            </button>
            <div className={`collapse-content ${isOpen ? 'open' : ''}`}>
                {children} {/* Conteúdo do colapso */}
            </div>
        </div>
    );
}

export default Collapse;