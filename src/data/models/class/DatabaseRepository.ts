// Importa o interfaces das respostas necessárias
import { LinkDataRequest } from "../interfaces/LinkDataRequest";
import { LinkDataResponse } from "../interfaces/LinkDataResponse";
import { LinkProtectedRequest } from "../interfaces/LinkProtectedRequest";
import { LinkProtectedResponse } from "../interfaces/LinkProtectedResponse";

// Classe abstrata que define a interface para interações com a base de dados relacionada a links
export abstract class DatabaseRepository {
    abstract generateLinkData(linkDataRequest: LinkDataRequest): Promise<LinkDataResponse>;
    abstract requestProtectedLinkData(linkDataRequest: LinkProtectedRequest): Promise<LinkProtectedResponse>;
    abstract getLinkDataInfo(shortLink: string): Promise<LinkDataResponse>;
}