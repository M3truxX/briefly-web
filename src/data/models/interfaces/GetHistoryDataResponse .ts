import { LinkEntry } from "./LinkEntry";
import { PaginationResponse } from "./PaginationResponse";

export interface GetHistoryDataResponse {
    linkEntryList: LinkEntry[]; // Lista de todos os links encurtados do usuário.
    paginationResponse: PaginationResponse; // Dados relacionados à paginação dos links.
}