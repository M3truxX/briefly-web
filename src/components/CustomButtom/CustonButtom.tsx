// Importa estilos globais e bibliotecas necessárias
import React from 'react';
import './custonButtom.scss';
import { CustomButtomProps } from '../../data/models/interfaces/CustomButtomProps';

// Componente de botão personalizado
const CustonButtom: React.FC<CustomButtomProps> = ({
    type = 'submit', // Define o tipo do botão como submit
    text, // Texto do botão
    activate = true, // Define se o botão está ativo
    loading = false, // Define se o botão está carregando
    onClick, // Função de clique do botão
    secondary = false, // Define se o botão é secundário
    btnHeight = 40, // Altura do botão
    btnWidth = 100 // Largura do botão
}) => {

    // Manipula o clique no botão, se ativado e não carregando
    const handleClick = () => {
        if (activate && !loading) {
            onClick();
        }
    };

    return (
        <button
            className={`button sombras ${activate ? '' : 'desable'} ${loading ? 'loading' : ''} ${secondary && 'secondary'} w-${btnWidth} h-${btnHeight}`}
            onClick={handleClick} // Chama `handleClick` no clique
            type={type}
            disabled={!activate || loading} // Desabilita se não ativado ou carregando
        >
            {loading ? <div className="spinner" /> : text}
        </button>
    );
};

export default CustonButtom;