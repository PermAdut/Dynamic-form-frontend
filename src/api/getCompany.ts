import axios, { AxiosError } from "axios";
import { GetError } from "./getCompanies";

export const getCompany = async (id: number) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_SERVER_URL}/api/v1.0/companies/${id}`,
    );
    return response.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      throw new GetError(err.message);
    }
    throw new GetError("unknown error");
  }
};
