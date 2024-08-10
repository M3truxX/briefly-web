import { ApiService } from "../../api/ApiService";
import { DatabaseRepository } from "../models/class/DatabaseRepository";
import { LinkDataRequest } from "../models/interfaces/LinkDataRequest";
import { LinkDataResponse } from "../models/interfaces/LinkDataResponse";
import { LinkProtectedRequest } from "../models/interfaces/LinkProtectedRequest";
import { LinkProtectedResponse } from "../models/interfaces/LinkProtectedResponse";

export class DefaultRepository extends DatabaseRepository {
    private service: ApiService

    constructor(apiService: ApiService) {
        super();
        this.service = apiService
    }

    async generateLinkData(linkDataRequest: LinkDataRequest): Promise<LinkDataResponse> {
        const linkDataResponse: LinkDataResponse = await this.service.generatePublicLinkEntry(linkDataRequest)
        return linkDataResponse
    }

    async requestProtectedLinkData(linkPrivateDataRequest: LinkProtectedRequest): Promise<LinkProtectedResponse> {
        const linkDataResponse: LinkProtectedResponse = await this.service.redirectPrivateLink(linkPrivateDataRequest)
        return linkDataResponse
    }

    async getLinkDataInfo(shortLink: string): Promise<LinkDataResponse> {
        const linkDataResponse: LinkDataResponse = await this.service.getPublicLinkEntry(shortLink)
        return linkDataResponse
    }
}