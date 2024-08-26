import { ClickerResponse } from "./ClickerResponse";

export interface LinkDataResponse {
    active: boolean; // Indica se o link está ativo (true) ou inativo (false)
    shortLink: string; // O link encurtado gerado
    qrCodeLink: string; // URL para o código QR associado ao link encurtado
    originalLink?: string; // O link original antes de ser encurtado
    totalVisits: ClickerResponse[]; // Lista de respostas de cliques associadas ao link
    expiresAt: string; // Data e hora em que o link expira
    createAt: string; // Data e hora em que o link foi criado
}