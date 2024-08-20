// Importa estilos globais e bibliotecas necessárias
import React from 'react';
import './custonButtom.scss';
import { CustomButtomProps } from '../../data/models/interfaces/CustomButtomProps';

// Componente de botão personalizado
const CustonButtom: React.FC<CustomButtomProps> = ({ text, activate = true, loading = false, onClick }) => {
    
    // Manipula o clique no botão, se ativado e não carregando
    const handleClick = () => {
        if (activate && !loading) {
            onClick();
        }
    };

    return (
        <button
            className={`button sombras ${activate ? '' : 'desable'} ${loading ? 'loading' : ''}`}
            onClick={handleClick} // Chama `handleClick` no clique
            type="submit"
            disabled={!activate || loading} // Desabilita se não ativado ou carregando
        >
            {loading ? <div className="spinner" /> : text}
        </button>
    );
};

export default CustonButtom;