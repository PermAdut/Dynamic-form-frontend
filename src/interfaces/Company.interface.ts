import type { Country } from "../constants/Country.enum";
import type { GlobalMarket } from "../constants/GlobalMarket.enum";
import { type Project } from "./Project.interface";
export interface ICompany {
  name: string;
  creationDate: Date;
  telephone: string | undefined;
  country: Country;
  isGlobal: NonNullable<boolean | undefined>;
  globalMarkets: (GlobalMarket | undefined)[] | undefined;
  globalMarketKeySecretIndex: string | undefined;
  projects: Project[] | undefined;
};