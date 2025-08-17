import type { Country } from "../../constants/Country.enum"
import type { GlobalMarket } from "../../constants/GlobalMarket.enum"
import type { Status } from "../../constants/Status.enum"

export interface ProjectResponseDto {
  name: string
  price: string
  status: Status
}

export interface CompanyResponseDto {
  name: string
  creationDate: string
  telephone?: string
  country: Country
  isGlobal: boolean
  globalMarkets?: GlobalMarket[]
  globalMarketKeySecretIndex?: string
  projects?: ProjectResponseDto[]
}