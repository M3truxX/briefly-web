// Importa estilos globais e bibliotecas necessárias
import React from 'react';
import './modal.scss';
import { ModalProps } from '../../data/models/interfaces/ModalProps';

// Componente Modal funcional, recebe propriedades para controlar visibilidade
const Modal: React.FC<ModalProps> = ({ isVisible, onClose, children }) => {
  if (!isVisible) return null; // Retorna null se o modal estiver invisível

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <div className="modal-body">
          {children} {/* Renderiza o conteúdo do modal */}
        </div>
      </div>
    </div>
  );
};

export default Modal;