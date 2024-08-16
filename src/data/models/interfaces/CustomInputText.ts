import { HTMLInputTypeAttribute } from "react";

export interface CustomInputText {
    estado: number;
    resetText?: boolean;
    textPlaceholder?: string;
    textdescription?: string;
    type?: HTMLInputTypeAttribute | undefined;
    travelInfo: (value: string) => void;
    lengthMax?: number;
    mask?: "phone" | "email" | "code";
    color?: string;
    alignText?: "center" | "left" | "right";
    showTextdescription?: boolean;
    keyBoard?: React.HTMLInputTypeAttribute;
}
