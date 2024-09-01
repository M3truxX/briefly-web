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
import { Config } from '../Config';

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

    // Método para criar conta do usuário
    async createAccontUser(CreateRequest: CreateAccontRequest): Promise<CreateAccontResponse> {
        const response = await this.axios.post<CreateAccontResponse>("/user", CreateRequest);
        return response.data;
    }

    // Método para gerar link sem corpo da requisição
    async validateAccontUser(email: string): Promise<void> {
        const response = await this.axios.post<void>(`/authentication/generate?identifier=${email}`);
        return response.data;
    }

    // Método para obter as informações de um link público
    async getPublicLinkEntry(link: string): Promise<LinkDataResponse> {
        const extractShortLink: string = this.extractCode(link);
        const response = await this.axios.get<LinkDataResponse>(`/info?short=${extractShortLink}`);
        return response.data;
    }

    // Método para autenticação do usuário
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
    async sessionUser(token: string): Promise<LoggedUserResponse> {
        // Realiza a requisição e captura a resposta
        const response = await axios.post<LoggedUserResponse>(
            Config.BASE_URL + "/authentication/session",
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

    // Método privado para extrair o código do link fornecido
    private extractCode(url: string): string {
        url = url.replace(/\/$/, '');
        const segments = url.split('/');
        return segments.pop() || '';
    }
}