import axios from "axios";
import type { CompanyFormType } from "../schema/company.schema";

export async function createCompany(data: CompanyFormType) {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_SERVER_URL}/api/v1.0/companies/create`,
      data,
    );
    return response.data;
  } catch {
    throw new Error("unknown error");
  }
}
