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
import { UploadImageResponse } from "../models/interfaces/UploadImageResponse";
import { Account } from "../models/interfaces/Account";
import { GetHistoryDataResponse } from "../models/interfaces/GetHistoryDataResponse ";

// Implementações de requisições de links usando ApiService.
export class DefaultRepository extends DatabaseRepository {
    private service: ApiService;

    constructor(apiService: ApiService) {
        super();
        this.service = apiService;
    }

    /////// Chamadas de link publico /////////////////////////////////////

    async generateLinkData(linkDataRequest: LinkDataRequest): Promise<LinkDataResponse> {
        const linkDataResponse: LinkDataResponse = await this.service.generatePublicLinkEntry(linkDataRequest);
        return linkDataResponse;
    }

    async requestProtectedLinkData(linkPrivateDataRequest: LinkProtectedRequest): Promise<LinkProtectedResponse> {
        const linkDataResponse: LinkProtectedResponse = await this.service.redirectPrivateLink(linkPrivateDataRequest);
        return linkDataResponse;
    }

    async getLinkDataInfo(shortLink: string): Promise<LinkDataResponse> {
        const linkDataResponse: LinkDataResponse = await this.service.getPublicLinkEntry(shortLink);
        return linkDataResponse;
    }

    /////// Chamadas relacionadas com dados do user /////////////////////////////////////

    async CreateAccontData(CreateAccontRequest: CreateAccontRequest): Promise<CreateAccontResponse> {
        const createDataResponse: CreateAccontResponse = await this.service.createAccontUser(CreateAccontRequest);
        return createDataResponse;
    }

    async ActivateAccont(email: string): Promise<void> {
        const dataResponse: void = await this.service.validateAccontUser(email);
        return dataResponse;
    }

    async loginUser(loginRequest: LoggedDataRequest): Promise<LoggedUserResponse> {
        const loggedUserResponse: LoggedUserResponse = await this.service.loginUser(loginRequest);
        return loggedUserResponse;
    }

    async sessionUser(token: string): Promise<Account> {
        const sessionUserResponse: Account = await this.service.sessionUser(token);
        return sessionUserResponse;
    }

    async signOutUser(token: string): Promise<void> {
        const signOutResponse: void = await this.service.signOutUser(token);
        return signOutResponse;
    }

    async uploadUserImage(formData: FormData, token: string): Promise<UploadImageResponse> {
        const uploadImageResponse: UploadImageResponse = await this.service.uploadUserImage(formData, token);
        return uploadImageResponse;
    }

    async updateUserLinkEntry(token: string, link: string, linkStatus: boolean): Promise<void> {
        const updateLinkResponse: void = await this.service.updateUserLinkEntry(token, link, linkStatus);
        return updateLinkResponse;
    }

    async deleteUserLinkEntry(token: string, link: string): Promise<void> {
        const deleteLinkResponse: void = await this.service.deleteUserLinkEntry(token, link);
        return deleteLinkResponse;
    }


    /////// Chamadas com user logado /////////////////////////////////////

    async generateUserLinkEntry(token: string, userLinkRequest: LinkDataRequest): Promise<LinkDataResponse> {
        const linkDataResponse: LinkDataResponse = await this.service.generateUserLinkEntry(token, userLinkRequest);
        return linkDataResponse;
    }

    async getUserLinkEntry(token: string, link: string): Promise<LinkDataResponse> {
        const linkDataResponse: LinkDataResponse = await this.service.getUserLinkEntry(token, link);
        return linkDataResponse;
    }

    async updateHistory(token: string, page: number, size: number): Promise<GetHistoryDataResponse> {
        const updateHistoryDataResponse: GetHistoryDataResponse = await this.service.updateHistory(token, page, size);
        return updateHistoryDataResponse;
    }
}