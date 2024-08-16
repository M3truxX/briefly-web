export function validationName(text:string) {
    const containsDesiredPattern = /^(?=.*[a-zA-Z])(?!.*[^a-zA-Z\s]).{5,}$/.test(text);
    return !containsDesiredPattern;
}

export function validationEmail(text:string) {
    const containsDesiredPattern = /\@.*\.com/.test(text);
    return containsDesiredPattern;
}


export function validationPhone(text:string) {
    const containsDesiredPattern = text.length == 14;
    return containsDesiredPattern;
}

export function validationSenha(text: any) {
    var containsDesiredPattern = /^^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
    return text.match(containsDesiredPattern);
    
}