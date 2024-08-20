import { HTMLInputTypeAttribute } from "react";

export interface CustomInputText {
    estado: number; // Estado do campo de entrada, representado por um número (por exemplo, código de estado ou valor)
    resetText?: boolean; // Indica se o texto do campo de entrada deve ser redefinido. Opcional.
    textPlaceholder?: string; // Texto que será exibido como placeholder no campo de entrada. Opcional.
    textdescription?: string; // Texto descritivo que pode ser exibido abaixo do campo de entrada. Opcional.
    type?: HTMLInputTypeAttribute | undefined; // Tipo de entrada HTML para o campo, como "text", "password", "email". Opcional.
    travelInfo: (value: string) => void; // Função de callback que é chamada quando o valor do campo de entrada muda. Recebe o valor do campo como argumento.
    lengthMax?: number; // Número máximo de caracteres permitidos no campo de entrada. Opcional.
    mask?: "phone" | "email" | "code"; // Máscara de entrada a ser aplicada, como "phone" (telefone), "email" (e-mail), ou "code" (código). Opcional.
    color?: string; // Cor do texto ou fundo do campo de entrada. Opcional.
    alignText?: "center" | "left" | "right"; // Alinhamento do texto dentro do campo de entrada, como "center" (centrado), "left" (esquerda), ou "right" (direita). Opcional.
    showTextdescription?: boolean; // Indica se o texto descritivo deve ser exibido. Opcional.
    keyBoard?: React.HTMLInputTypeAttribute; // Tipo de teclado a ser exibido para o campo de entrada, como "text", "number", "email". Opcional.
}