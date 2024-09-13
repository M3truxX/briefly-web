// Função utilitária para formatar uma data no formato "dd/mm/aaaa hh:mm:ss"
export const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    // Verifica se a data é inválida
    if (isNaN(date.getTime())) {
        return "Link sem tempo de expiração";
    }

    // Extrai o dia, mês, ano, hora, minuto e segundo
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear());
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    // Retorna a data e hora formatadas
    return `${day}/${month}/${year} ás ${hours}:${minutes}`;
};
