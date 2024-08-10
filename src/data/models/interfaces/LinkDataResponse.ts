import { ClickerResponse } from "./ClickerResponse"

export interface LinkDataResponse {
  active: boolean;
  shortLink: string;
  qrCodeLink: string;
  originalLink: string;
  totalVisits: ClickerResponse[];
  expiresAt: string;
  createAt: string;
}