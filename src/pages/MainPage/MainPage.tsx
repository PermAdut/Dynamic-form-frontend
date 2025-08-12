import CompanyList from "../../components/CompanyList/CompanyList";
import AddCompanyItem from "../../components/AddCompanyItem/AddCompanyItem";
import { useEffect, useState } from "react";
import type { Company } from "../../interfaces/Company.interface";
import { getCompanies } from "../../api/getCompanies";
import { BackendError } from "../../interfaces/BackendError";
const MainPage = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<null | string>(null);
  useEffect(() => {
    const handleCompanies = async () => {
      try {
        setIsLoading(true);
        setCompanies(await getCompanies());
        setIsLoading(false);
      } catch (err: unknown) {
        if (err instanceof BackendError) {
          setIsError(err.message);
        }
        setIsError("unknown error");
      }
    };
    handleCompanies();
  }, []);
  if (isError) return <div>Error: {isError}</div>;
  if (isLoading) return <div>Loading...</div>;
  return (
    <>
      <AddCompanyItem />
      <CompanyList companies={companies} />
    </>
  );
};

export default MainPage;
