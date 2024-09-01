export interface statusPrps {
    title: string,
    sizeTitle?: number,
    sizeSubTitle?: number,
    subTitle: string,
    activatebutton?: boolean
    nomeBotaoAction?: string
    isLoading?: boolean
    onClick?: () => void; // Função de callback que é chamada quando o botão é clicado
}