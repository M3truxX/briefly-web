export interface StatusProps {
    title: string, // Titulo do status
    sizeTitle?: number, // Tamanho do titulo
    sizeSubTitle?: number, // Tamanho do subtitulo
    subTitle?: string, // Subtitulo do status
    activatebutton?: boolean // Se o botão de ação será exibido 
    nomeBotaoAction?: string // Nome do botão de ação
    isLoading?: boolean // Se o botão de ação está carregando
    onClick?: () => void; // Função de callback que é chamada quando o botão é clicado
}