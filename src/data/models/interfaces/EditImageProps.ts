import { AxiosError } from "axios";
import { AxiosErrorResponse } from "./AxiosErroResponse";

export interface EditImageProps {
    onAxiosError: (error: AxiosError<AxiosErrorResponse> | null) => void; // Função para lidar com erros do Axios
}