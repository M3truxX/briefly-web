// Importa estilos globais e bibliotecas necessárias
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';

// Cria a raiz do React para renderizar a aplicação no elemento DOM com id 'root'
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// Renderiza o componente principal da aplicação dentro do modo estrito do React
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);