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
        try {
            const response = await this.axios.post<LinkDataResponse>("/generate", publicLinkRequest)
            return response.data

        } catch (error) {
            console.log(error)
            throw new Error(`Desconhecido, tente novamente em instantes!`)
        }
    }

    async redirectPrivateLink(privateLinkRequest: LinkProtectedRequest): Promise<LinkProtectedResponse> {
        try {
            const response = await this.axios.post<LinkProtectedResponse>("/protected", privateLinkRequest)
            return response.data

        } catch (error) {
            console.log(error)
            throw new Error(`Desconhecido, tente novamente em instantes!`)
        }
    }

    async getPublicLinkEntry(link: string): Promise<LinkDataResponse> {
        try {
            const extractShortLink: string = this.extractCode(link)
            const response = await this.axios.get<LinkDataResponse>(`/info?short=${extractShortLink}`)
            return response.data

        } catch (error) {
            console.log(error)
            throw new Error(`Desconhecido, tente novamente em instantes!`)
        }
    }



    private extractCode(linkOrCode: string): string {
        const urlPattern = /https?:\/\/[^\s/]+\/([^\s/]+)/;
        const match = linkOrCode.match(urlPattern);
        return match ? match[1] : linkOrCode;
    }
}