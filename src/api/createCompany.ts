import axios, { AxiosError } from "axios";
import type { CompanyFormType } from "../schema/company.schema";
import { BackendError } from "../interfaces/BackendError";

export async function createCompany(data: CompanyFormType) {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_SERVER_URL}/api/v1.0/companies/create`,
      data,
    );
    return response.data;
  } catch(err) {
    if(err instanceof AxiosError){
      throw new BackendError(err.message)
    }
    throw new BackendError("unknown error");
  }
}
