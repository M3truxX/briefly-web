// Importa o interfaces das respostas necessárias
import { CreateAccontRequest } from "../interfaces/CreateAccontRequest";
import { CreateAccontResponse } from "../interfaces/CreateAccontResponse";
import { LinkDataRequest } from "../interfaces/LinkDataRequest";
import { LinkDataResponse } from "../interfaces/LinkDataResponse";
import { LinkProtectedRequest } from "../interfaces/LinkProtectedRequest";
import { LinkProtectedResponse } from "../interfaces/LinkProtectedResponse";
import { LoggedUserResponse } from "../interfaces/LoggedUserResponse";
import { LoggedDataRequest } from "../interfaces/LoggedDataRequest";
import { UploadImageResponse } from "../interfaces/UploadImageResponse";
import { Account } from "../interfaces/Account";
import { GetHistoryDataResponse } from "../interfaces/GetHistoryDataResponse ";

// Classe abstrata que define a interface para interações com a base de dados
export abstract class DatabaseRepository {
    // Create link public
    abstract generateLinkData(linkDataRequest: LinkDataRequest): Promise<LinkDataResponse>;
    abstract requestProtectedLinkData(linkDataRequest: LinkProtectedRequest): Promise<LinkProtectedResponse>;
    abstract getLinkDataInfo(shortLink: string): Promise<LinkDataResponse>;

    // Create link user
    abstract generateUserLinkEntry(token: string, userLinkRequest: LinkDataRequest,): Promise<LinkDataResponse>;
    abstract getUserLinkEntry(token: string, link: string): Promise<LinkDataResponse>;
    abstract updateUserLinkEntry(token: string, link: string, linkStatus: boolean): Promise<void>;
    abstract deleteUserLinkEntry(token: string, link: string): Promise<void>;

    // User class
    abstract CreateAccontData(linkDataRequest: CreateAccontRequest): Promise<CreateAccontResponse>;
    abstract ActivateAccont(email: string): Promise<void>;
    abstract loginUser(loginRequest: LoggedDataRequest): Promise<LoggedUserResponse>;
    abstract sessionUser(token: string): Promise<Account>;
    abstract signOutUser(token: string): Promise<void>;
    abstract uploadUserImage(formData: FormData, token: string): Promise<UploadImageResponse>;
    abstract updateHistory(token: string, page: number, size: number): Promise<GetHistoryDataResponse>;
}