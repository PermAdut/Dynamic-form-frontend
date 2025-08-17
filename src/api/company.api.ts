/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import type { CompanyFormType } from "../schema/company.schema";
import { BackendError } from "../interfaces/BackendError";
import type { CompanyResponseDto } from "./types/company.response.dto";
class CompanyApi {
  private axiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: `${import.meta.env.VITE_API_SERVER_URL}/api/v1.0/companies`,
    });
    axios.interceptors.request.use(
      (res) => res,
      (err: any) => {
        throw new BackendError(err.message || "unknown error");
      },
    );
  }

  async createCompany(data: CompanyFormType) {
    const response = await this.axiosInstance.post("", data);
    return response.data;
  }

  async editCompany(
    id: string,
    data: Partial<
      Record<keyof CompanyFormType, CompanyFormType[keyof CompanyFormType]>
    >,
  ) {
    const response = await this.axiosInstance.patch(`${id}`, data);
    return response.data;
  }

  async getCompany(id: number): Promise<CompanyResponseDto> {
    const response = await this.axiosInstance.get(`${id}`);
    return response.data;
  }

  async getCompanies(): Promise<CompanyResponseDto[]> {
    const response = await this.axiosInstance.get("");
    return response.data;
  }
}
const companyApi = new CompanyApi();
export default companyApi;
