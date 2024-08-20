export interface LinkDataRequest {
    link: string; // O URL que será encurtado
    personalizedCode: string | null; // Código personalizado opcional para o link encurtado. Pode ser nulo se não for fornecido.
    password: string | null; // Senha opcional para proteger o link encurtado. Pode ser nula se não for necessária.
    expiresIn: string | null; // Data e hora em que o link encurtado deve expirar. Pode ser nula se o link não tiver uma data de expiração.
}