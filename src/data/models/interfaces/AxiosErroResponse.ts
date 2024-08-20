export interface AxiosErrorResponse {
    message: string; // Mensagem de erro fornecida pelo Axios
    name: string; // Nome da exceção ou erro
    stack?: string; // Stack trace do erro, opcional. Fornece detalhes sobre onde o erro ocorreu no código.
    config: { // Configurações do Axios no momento da requisição que gerou o erro
        transitional: {
            silentJSONParsing: boolean; // Indica se o parsing JSON deve ser feito silenciosamente
            forcedJSONParsing: boolean; // Força o parsing JSON mesmo se o tipo de conteúdo não for JSON
            clarifyTimeoutError: boolean; // Clarifica se o timeout deve ser tratado como um erro de timeout
        };
        adapter: string[]; // Adaptadores utilizados para a requisição (ex.: http, xhr)
        transformRequest: (null | ((data: any, headers: any) => any))[]; // Funções para transformar dados antes da requisição (null ou função)
        transformResponse: (null | ((data: any) => any))[]; // Funções para transformar dados após a resposta (null ou função)
        timeout: number; // Tempo máximo para a requisição, em milissegundos
        xsrfCookieName: string; // Nome do cookie usado para proteger contra XSRF
        xsrfHeaderName: string; // Nome do cabeçalho usado para proteger contra XSRF
        maxContentLength: number; // Tamanho máximo do conteúdo da resposta, em bytes
        maxBodyLength: number; // Tamanho máximo do corpo da requisição, em bytes
        env: Record<string, unknown>;        // Ambiente de execução do Axios, como variáveis de ambiente
        headers: { // Cabeçalhos da requisição
            Accept: string; // Cabeçalho Aceita para o tipo de resposta esperado
            "Content-Type": string; // Cabeçalho Content-Type para o tipo de conteúdo da requisição
        };
        baseURL: string; // URL base para a requisição
        method: string; // Método HTTP utilizado para a requisição (ex.: GET, POST)
        url: string; // URL completa da requisição
        data: string; // Dados enviados na requisição, se houver
    };
    code?: string;    // Código de erro específico fornecido pelo Axios, opcional
    status?: number;    // Código de status HTTP retornado na resposta de erro, opcional
}
