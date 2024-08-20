export interface CustomButtomProps {
    text: string; // Texto a ser exibido no botão
    activate?: boolean; // Indica se o botão está ativado ou desativado. Opcional.
    loading?: boolean; // Indica se o botão está em estado de carregamento (loading). Opcional.
    onClick: () => void; // Função de callback que é chamada quando o botão é clicado
}