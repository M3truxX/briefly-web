// Função para validar o nome
export function validationName(text: string) {
    const containsDesiredPattern = /^(?=.*[a-zA-ZÀ-ÿ])(?!.*[^a-zA-ZÀ-ÿ\s]).{5,}$/.test(text);
    return containsDesiredPattern;
}

// Função para validar o e-mail
export function validationEmail(text: string) {
    const containsDesiredPattern2 = /\@.*\.com/.test(text);
    return containsDesiredPattern2;
}

// Função para validar o número de telefone
export function validationPhone(text: string) {
    const containsDesiredPattern3 = text.length == 14;
    return containsDesiredPattern3;
}

// Função para validar a senha
export function validationSenha(text: any) {
    var containsDesiredPattern4 = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
    return text.match(containsDesiredPattern4) === null ? false : true;
}