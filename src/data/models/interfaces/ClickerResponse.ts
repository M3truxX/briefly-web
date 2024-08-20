import { DeviceInfo } from "./DeviceInfo";
import { Region } from "./Region";

export interface ClickerResponse {
    region: Region; // Informações sobre a região de onde o clique foi originado
    deviceInfo: DeviceInfo; // Informações sobre o dispositivo que registrou o clique
    clickedAt: string; // Data e hora em que o clique foi registrado
}