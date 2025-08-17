/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import type { CompanyFormType } from "../schema/company.schema";
import { BackendError } from "../interfaces/BackendError";
import type { CompanyResponseDto } from "./types/company.response.dto";
class CompanyApi {
  async createCompany(data: CompanyFormType) {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_SERVER_URL}/api/v1.0/companies/create`,
        data,
      );
      return response.data;
    } catch (err: any) {
      throw new BackendError(err.message || "unknown error");
    }
  }

  async editCompany(
    id: string,
    data: Partial<
      Record<keyof CompanyFormType, CompanyFormType[keyof CompanyFormType]>
    >,
  ) {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_SERVER_URL}/api/v1.0/companies/${id}`,
        data,
      );
      return response.data;
    } catch (err: any) {
      throw new BackendError(err.message || "unknown error");
    }
  }

  async getCompany(id: number):Promise<CompanyResponseDto> {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_SERVER_URL}/api/v1.0/companies/${id}`,
      );
      return response.data;
    } catch (err: any) {
      throw new BackendError(err.message || "unknown error");
    }
  }

  async getCompanies():Promise<CompanyResponseDto[]> {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_SERVER_URL}/api/v1.0/companies`,
      );
      return response.data;
    } catch (err: any) {
      throw new BackendError(err.message || "unknown error");
    }
  }
}
const companyApi = new CompanyApi();
export default companyApi;
