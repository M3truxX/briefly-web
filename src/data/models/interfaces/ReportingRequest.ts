export interface ReportingRequest {
    username: string;    // Nome do usuário que está fazendo o relatório
    email: string;       // Endereço de e-mail do usuário para contato
    reportType: string;  // Tipo de relatório sendo enviado (ex: bug, sugestão, reclamação)
    reporting: string;   // Conteúdo detalhado do relatório
}