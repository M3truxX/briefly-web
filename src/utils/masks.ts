function maskPhone(value: string) {
    value = value.replace(/\D/g, "");
    value = value.replace(/^(\d{2})(\d)/g, "($1)$2")
    value = value.replace(/(\d)(\d{4})$/, "$1-$2")
    return value
}

function maskEmail(value: string) {
    value = value.replace(/\s/g, '');
    return value
}

function maskCode(value: string) {
    value = value.replace(/.$/, "$&     ")
    return value
}

export { maskPhone, maskEmail, maskCode };