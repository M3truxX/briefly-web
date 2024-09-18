export interface ModalProps {
    isVisible: boolean; // Indica se o modal está visível (true) ou oculto (false)
    onClose: () => void; // Função de callback que é chamada para fechar o modal
    children: React.ReactNode; // Conteúdo (filhos) a ser exibido dentro do modal, geralmente componentes React
    disableClose?: boolean; // Propriedade opcional para desativar o fechamento do modal
}