// Importa o interfaces das respostas necessárias
import { CreateAccontRequest } from "../interfaces/CreateAccontRequest";
import { CreateAccontResponse } from "../interfaces/CreateAccontResponse";
import { LinkDataRequest } from "../interfaces/LinkDataRequest";
import { LinkDataResponse } from "../interfaces/LinkDataResponse";
import { LinkProtectedRequest } from "../interfaces/LinkProtectedRequest";
import { LinkProtectedResponse } from "../interfaces/LinkProtectedResponse";
import { LoggedUserResponse } from "../interfaces/LoggedUserResponse";
import { LoggedDataRequest } from "../interfaces/LoggedDataRequest";

// Classe abstrata que define a interface para interações com a base de dados
export abstract class DatabaseRepository {
    abstract generateLinkData(linkDataRequest: LinkDataRequest): Promise<LinkDataResponse>;
    abstract requestProtectedLinkData(linkDataRequest: LinkProtectedRequest): Promise<LinkProtectedResponse>;
    abstract CreateAccontData(linkDataRequest: CreateAccontRequest): Promise<CreateAccontResponse>;
    abstract getLinkDataInfo(shortLink: string): Promise<LinkDataResponse>;
    abstract ActivateAccont(email: string): Promise<void>;
    abstract loginUser(loginRequest: LoggedDataRequest): Promise<LoggedUserResponse>;
}