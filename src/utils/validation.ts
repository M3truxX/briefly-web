// Função para validar o nome
export function validationName(text: string) {
    const containsDesiredPattern = /^(?=.*[a-zA-Z])(?!.*[^a-zA-Z\s]).{5,}$/.test(text);
    return !containsDesiredPattern;
}

// Função para validar o e-mail
export function validationEmail(text: string) {
    const containsDesiredPattern = /\@.*\.com/.test(text);
    return containsDesiredPattern;
}

// Função para validar o número de telefone
export function validationPhone(text: string) {
    const containsDesiredPattern = text.length == 14;
    return containsDesiredPattern;
}

// Função para validar a senha
export function validationSenha(text: any) {
    var containsDesiredPattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
    return text.match(containsDesiredPattern);
}