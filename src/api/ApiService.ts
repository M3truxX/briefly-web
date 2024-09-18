// Importa o axios e as interfaces das respostas necesárias 
import axios, { AxiosInstance } from 'axios'
import { LinkDataResponse } from '../data/models/interfaces/LinkDataResponse';
import { LinkDataRequest } from '../data/models/interfaces/LinkDataRequest';
import { LinkProtectedRequest } from '../data/models/interfaces/LinkProtectedRequest';
import { LinkProtectedResponse } from '../data/models/interfaces/LinkProtectedResponse';
import { CreateAccontRequest } from '../data/models/interfaces/CreateAccontRequest';
import { CreateAccontResponse } from '../data/models/interfaces/CreateAccontResponse';
import { LoggedUserResponse } from '../data/models/interfaces/LoggedUserResponse';
import { LoggedDataRequest } from '../data/models/interfaces/LoggedDataRequest';
import { UploadImageResponse } from '../data/models/interfaces/UploadImageResponse';
import { Account } from '../data/models/interfaces/Account';
import { Config } from '../Config';
import { GetHistoryDataResponse } from '../data/models/interfaces/GetHistoryDataResponse ';
import { ReportingRequest } from '../data/models/interfaces/ReportingRequest';
import { UpdateUserProfileRequest } from '../data/models/interfaces/UpdateUserProfileRequest';
import { UserProfileConfirmRequest } from '../data/models/interfaces/UserProfileConfirmRequest';

// Classe que encapsula a comunicação com a API
export class ApiService {
    private axios: AxiosInstance;
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
        this.axios = axios.create({
            baseURL: this.baseUrl
        });
    }

    /////// Chamadas de link publico /////////////////////////////////////

    // Método para gerar um novo link público
    async generatePublicLinkEntry(publicLinkRequest: LinkDataRequest): Promise<LinkDataResponse> {
        const response = await this.axios.post<LinkDataResponse>("/generate", publicLinkRequest);
        return response.data;
    }

    // Método para redirecionar para um link protegido
    async redirectPrivateLink(privateLinkRequest: LinkProtectedRequest): Promise<LinkProtectedResponse> {
        const response = await this.axios.post<LinkProtectedResponse>("/protected", privateLinkRequest);
        return response.data;
    }

    // Método para obter as informações de um link público
    async getPublicLinkEntry(link: string): Promise<LinkDataResponse> {
        const extractShortLink: string = this.extractCode(link);
        const response = await this.axios.get<LinkDataResponse>(`/info?short=${extractShortLink}`);
        return response.data;
    }

    // Método para gerar link sem corpo da requisição
    async validateAccontUser(email: string): Promise<void> {
        const response = await this.axios.post<void>(`/authentication/generate?identifier=${email}`);
        return response.data;
    }

    // Novo método para enviar um relatório
    async sendReport(token: string, reportData: ReportingRequest): Promise<void> {
        const response = await axios.post<void>(
            `${Config.BASE_URL}/reporting`,
            reportData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        return response.data;
    }

    /////// Chamadas relacionadas com dados do user /////////////////////////////////////

    // Método para criar conta do usuário
    async createAccontUser(CreateRequest: CreateAccontRequest): Promise<CreateAccontResponse> {
        const response = await this.axios.post<CreateAccontResponse>("/user", CreateRequest);
        return response.data;
    }

    // Método alterar a imagem do usuário
    async uploadUserImage(formData: FormData, token: string): Promise<UploadImageResponse> {

        // Realiza a requisição e captura a resposta
        const response = await axios.post<UploadImageResponse>(
            Config.BASE_URL + "/media",
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`, // Inclui o token no cabeçalho de autorização
                }
            }
        );
        return response.data
    }


    // Método para atualizar usuário
    async sessionUser(token: string): Promise<Account> {
        // Realiza a requisição e captura a resposta
        const response = await axios.post<Account>(
            Config.BASE_URL + "/authentication/session",
            null,
            {
                headers: {
                    Authorization: `Bearer ${token}`, // Inclui o token no cabeçalho de autorização
                }
            }
        );
        return response.data
    }

    // Método desligar o usuário
    async signOutUser(token: string): Promise<void> {
        // Realiza a requisição e captura a resposta
        const response = await axios.delete<void>(
            Config.BASE_URL + "/authentication/session",
            {
                headers: {
                    Authorization: `Bearer ${token}`, // Inclui o token no cabeçalho de autorização
                }
            }
        );
        return response.data
    }

    // Método para autenticação do usuário
    async loginUser(signInRequest: LoggedDataRequest): Promise<LoggedUserResponse> {
        const response = await this.axios.post<LoggedUserResponse>('/authentication/login', signInRequest);
        return response.data;
    }

    /////// Chamadas com user logado /////////////////////////////////////

    // Método para gerar um novo link para o user
    async generateUserLinkEntry(token: string, userLinkRequest: LinkDataRequest): Promise<LinkDataResponse> {
        const response = await axios.post<LinkDataResponse>(
            Config.BASE_URL + "/link",
            userLinkRequest,
            {
                headers: {
                    Authorization: `Bearer ${token}`, // Inclui o token no cabeçalho de autorização
                }
            }
        )
        return response.data
    }

    // Método para recuperar informações de link criado por um usuário
    async getUserLinkEntry(token: string, link: string): Promise<LinkDataResponse> {
        const extractShortLink: string = this.extractCode(link);
        const response = await axios.get<LinkDataResponse>(
            `${Config.BASE_URL}/link?short=${extractShortLink}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`, // Inclui o token no cabeçalho de autorização
                }
            }
        );
        return response.data;
    }

    // Método para mudar status dos links criados por um usuário
    async updateUserLinkEntry(token: string, link: string, linkStatus: boolean): Promise<void> {
        const extractShortLink: string = this.extractCode(link);
        const response = await axios.put<void>(
            `${Config.BASE_URL}/user/link?short=${extractShortLink}&active=${linkStatus}`,
            null,
            {
                headers: {
                    Authorization: `Bearer ${token}`, // Inclui o token no cabeçalho de autorização
                }
            }
        );
        return response.data;
    }

    // Método para mudar status dos links criados por um usuário
    async deleteUserLinkEntry(token: string, link: string): Promise<void> {
        const extractShortLink: string = this.extractCode(link);
        const response = await axios.delete<void>(
            `${Config.BASE_URL}/user/link?short=${extractShortLink}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`, // Inclui o token no cabeçalho de autorização
                }
            }
        );
        return response.data;
    }

    // Método para recuperar historico do usuário
    async updateHistory(token: string, page: number, size: number): Promise<GetHistoryDataResponse> {
        const response = await axios.get<GetHistoryDataResponse>(
            `${Config.BASE_URL}/link?page=${page}&size=${size}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`, // Inclui o token no cabeçalho de autorização
                }
            }
        );
        return response.data;
    }

    // Método para atualizar usuário
    async updateUserProfile(token: string, updateData: UpdateUserProfileRequest): Promise<Account> {
        const response = await axios.put<Account>(
            `${Config.BASE_URL}/user/profile`,
            updateData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        return response.data;
    }

    // Método para confirmar a alteração dos dados do usuário
    async confirmUserProfileUpdate(token: string, confirmationData: UserProfileConfirmRequest): Promise<void> {
        const response = await axios.post<void>(
            `${Config.BASE_URL}/user/phone`,
            confirmationData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        return response.data;
    }

    /////// utilitário /////////////////////////////////////

    // Método privado para extrair o código do link fornecido
    private extractCode(url: string): string {
        url = url.replace(/\/$/, '');
        const segments = url.split('/');
        return segments.pop() || '';
    }
}