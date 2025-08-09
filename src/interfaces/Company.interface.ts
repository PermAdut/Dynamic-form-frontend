import type { Country } from "../constants/Country.enum";
import type { GlobalMarket } from "../constants/GlobalMarket.enum";
import { type Project } from "./Project.interface";
export interface Company{
    name: string,
    creationDate: string,
    telephone?: string,
    country: Country
    isGlobal:boolean,
    globalMarket?: GlobalMarket[], 
    globalMarketKeySecretIndex?: string,
    projects?: Project[],
}