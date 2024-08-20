// Função para aplicar máscara em números de telefone
function maskPhone(value: string) {
    value = value.replace(/\D/g, "");
    value = value.replace(/^(\d{2})(\d)/g, "($1)$2");
    value = value.replace(/(\d)(\d{4})$/, "$1-$2");
    return value;
}

// Função para aplicar máscara em e-mails
function maskEmail(value: string) {
    value = value.replace(/\s/g, '');
    return value;
}

// Função para aplicar máscara em códigos
function maskCode(value: string) {
    value = value.replace(/.$/, "$&     ");
    return value;
}

export { maskPhone, maskEmail, maskCode };