import { DeviceInfo } from "./DeviceInfo"
import { Region } from "./Region"

export interface ClickerResponse {
    region: Region
    deviceInfo: DeviceInfo
    clickedAt: string
}