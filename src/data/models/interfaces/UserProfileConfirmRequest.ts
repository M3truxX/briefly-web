export interface UserProfileConfirmRequest {
    name?: string; // Nome do usuário
    phone?: string; // Telefone do usuário
    validationCode: number; // Código de validação
}