export interface CustomButtomProps {
    secondary?: boolean // tipo de tema do botão secundario
    text: string; // Texto a ser exibido no botão
    activate?: boolean; // Indica se o botão está ativado ou desativado. Opcional.
    loading?: boolean; // Indica se o botão está em estado de carregamento (loading). Opcional.
    onClick: () => void; // Função de callback que é chamada quando o botão é clicado
    btnWidth?: number; // Indica o tamanho horizontal do botão
    btnHeight?: number; // Indica o tamanho vertical do botão
}