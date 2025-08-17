import { useState, useEffect } from "react";
import companyApi from "../api/company.api";
import type { CompanyResponseDto } from "../api/types/company.response.dto";
export default function useGetCompanies(): [CompanyResponseDto[], boolean, string | null] {
  const [companies, setCompanies] = useState<CompanyResponseDto[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<null | string>(null);
  useEffect(() => {
    const handleCompanies = async () => {
      try {
        setIsLoading(true);
        setCompanies(await companyApi.getCompanies());
        setIsLoading(false);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setIsError(err.message || "unknown error");
      }
    };
    handleCompanies();
  }, []);
  return [companies, isLoading, isError];
}
