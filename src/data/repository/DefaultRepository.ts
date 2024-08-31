// Importa o serviço de API para comunicação com o backend
import { ApiService } from "../../api/ApiService";

// Importa a classe base para repositórios de banco de dados
import { DatabaseRepository } from "../models/class/DatabaseRepository";

// Importa interfaces para as requisições e respostas dos links
import { LinkDataRequest } from "../models/interfaces/LinkDataRequest";
import { LinkDataResponse } from "../models/interfaces/LinkDataResponse";
import { LinkProtectedRequest } from "../models/interfaces/LinkProtectedRequest";
import { LinkProtectedResponse } from "../models/interfaces/LinkProtectedResponse";
import { CreateAccontRequest } from "../models/interfaces/CreateAccontRequest";
import { CreateAccontResponse } from "../models/interfaces/CreateAccontResponse";
import { LoggedDataRequest } from "../models/interfaces/LoggedDataRequest";
import { LoggedUserResponse } from "../models/interfaces/LoggedUserResponse";

// Implementações de requisições de links usando ApiService.
export class DefaultRepository extends DatabaseRepository {
    private service: ApiService;

    constructor(apiService: ApiService) {
        super();
        this.service = apiService;
    }

    async generateLinkData(linkDataRequest: LinkDataRequest): Promise<LinkDataResponse> {
        const linkDataResponse: LinkDataResponse = await this.service.generatePublicLinkEntry(linkDataRequest);
        return linkDataResponse;
    }

    async requestProtectedLinkData(linkPrivateDataRequest: LinkProtectedRequest): Promise<LinkProtectedResponse> {
        const linkDataResponse: LinkProtectedResponse = await this.service.redirectPrivateLink(linkPrivateDataRequest);
        return linkDataResponse;
    }

    async CreateAccontData(CreateAccontRequest: CreateAccontRequest): Promise<CreateAccontResponse> {
        const createDataResponse: CreateAccontResponse = await this.service.createAccontUser(CreateAccontRequest);
        return createDataResponse;
    }

    async ActivateAccont(email: string): Promise<void> {
        const dataResponse: void = await this.service.validateAccontUser(email);
        return dataResponse;
    }

    async getLinkDataInfo(shortLink: string): Promise<LinkDataResponse> {
        const linkDataResponse: LinkDataResponse = await this.service.getPublicLinkEntry(shortLink);
        return linkDataResponse;
    }

    // Método para autenticação do usuário usando o serviço da API
    async loginUser(loginRequest: LoggedDataRequest): Promise<LoggedUserResponse> {
        // Chama o método de login da API e retorna a resposta
        const loggedUserResponse: LoggedUserResponse = await this.service.loginUser(loginRequest);
        // Define o token de autenticação no cabeçalho para futuras requisições
        this.service.setAuthToken(loggedUserResponse.token);
        return loggedUserResponse;
    }
}