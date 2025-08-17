import { useEffect, useState } from "react";
import { BackendError } from "../interfaces/BackendError";
import { useNavigate, useParams } from "react-router";
import companyApi from "../api/company.api";
import type { CompanyResponseDto } from "../api/types/company.response.dto";

export default function (): [
  CompanyResponseDto | null,
  boolean,
  string | null,
] {
  const { id } = useParams();
  const navigate = useNavigate();
  const [company, setCompany] = useState<CompanyResponseDto | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<null | string>(null);
  useEffect(() => {
    const handleCompany = async () => {
      try {
        setIsLoading(true);
        if (!id) throw new BackendError("Id is not specified");
        setCompany(await companyApi.getCompany(parseInt(id)));
        setIsLoading(false);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setIsError(err.message || "unknown error");
        navigate("/");
      }
    };
    handleCompany();
  }, [id, navigate]);
  return [company, isLoading, isError];
}
