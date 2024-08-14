import axios, { AxiosInstance } from 'axios'
import { LinkDataResponse } from '../data/models/interfaces/LinkDataResponse';
import { LinkDataRequest } from '../data/models/interfaces/LinkDataRequest';
import { LinkProtectedRequest } from '../data/models/interfaces/LinkProtectedRequest';
import { LinkProtectedResponse } from '../data/models/interfaces/LinkProtectedResponse';

export class ApiService {
    private axios: AxiosInstance;
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl
        this.axios = axios.create({
            baseURL: this.baseUrl
        })
    }

    async generatePublicLinkEntry(publicLinkRequest: LinkDataRequest): Promise<LinkDataResponse> {
        const response = await this.axios.post<LinkDataResponse>("/generate", publicLinkRequest)
        return response.data
    }

    async redirectPrivateLink(privateLinkRequest: LinkProtectedRequest): Promise<LinkProtectedResponse> {
        const response = await this.axios.post<LinkProtectedResponse>("/protected", privateLinkRequest)
        return response.data
    }

    async getPublicLinkEntry(link: string): Promise<LinkDataResponse> {
        const extractShortLink: string = this.extractCode(link)
        const response = await this.axios.get<LinkDataResponse>(`/info?short=${extractShortLink}`)
        return response.data
    }


    private extractCode(linkOrCode: string): string {
        const urlPattern = /https?:\/\/[^\s/]+\/([^\s/]+)/;
        const match = linkOrCode.match(urlPattern);
        return match ? match[1] : linkOrCode;
    }
}