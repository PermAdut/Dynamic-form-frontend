import axios, { AxiosError } from "axios";

export class GetError extends Error {
  constructor(message: string) {
    super(message)
  }
}

export const getCompanies = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_SERVER_URL}/api/v1.0/companies`,
    );
    return response.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      throw new GetError(err.message);
    }
    throw new GetError("unknown error");
  }
};
