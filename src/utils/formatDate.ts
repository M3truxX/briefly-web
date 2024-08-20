// Função utilitária para formatar uma data no formato "dd/mm/aa"
export const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    // Verifica se a data é inválida
    if (isNaN(date.getTime())) {
        return "Link sem tempo de expiração";
    }

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    return `${day}/${month}/${year}`;
};