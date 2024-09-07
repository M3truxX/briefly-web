import moment from "moment";

// Função para formatar a data para o formato completo ISO
function formatToIso(date: string): string {
    // Cria um objeto moment a partir da string de data recebida
    const formattedDate = moment(date, 'YYYY-MM-DD')
        .set({ hour: 0, minute: 0, second: 0, millisecond: 0 }) // Define horário como meia-noite
        .format('YYYY-MM-DDTHH:mm:ss.SSSSSSSSS'); // Formato completo para o endpoint

    return formattedDate;
}
export default formatToIso;