import React from 'react';
import { Link } from 'react-router-dom';
import './erro.css';

function Erro() {
    return (
        <div className='not-found'>
            <h1>404</h1>
            <h2>Página não encontrada!</h2>
            <Link to="/">Voltar para a tela principal</Link>
        </div>
    )
}

export default Erro;