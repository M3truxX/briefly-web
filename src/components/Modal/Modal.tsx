// Importa estilos globais e bibliotecas necessárias
import React, { useEffect } from 'react';
import './modal.scss';
import { ModalProps } from '../../data/models/interfaces/ModalProps';

// Componente Modal funcional, recebe propriedades para controlar visibilidade
const Modal: React.FC<ModalProps> = ({ isVisible, onClose, children }) => {
  // Efeito para bloquear o scroll do body quando o modal estiver visível
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden'; // Desabilita o scroll do body
    } else {
      document.body.style.overflow = ''; // Restaura o scroll do body
    }

    // Cleanup para restaurar o scroll quando o modal for fechado
    return () => {
      document.body.style.overflow = '';
    };
  }, [isVisible]);

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