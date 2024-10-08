import { ClickerResponse } from "./ClickerResponse";

export interface LinkEntry {
    userId: string; // ID do usuário que criou o link.
    active: boolean; // Indica se o link está ativo (true) ou inativo (false).
    shortLink: string; // URL encurtada gerada para o link original.
    qrCodeLink: string; // URL do QR Code associado ao link encurtado.
    originalLink: string; // URL original antes de ser encurtada.
    totalVisits: ClickerResponse[]; // Lista de respostas de cliques associadas ao link
    expiresAt: string; // Data de expiração do link ou "No expiration" se não houver.
    createdAt: string; // Data e hora de criação do link.
}