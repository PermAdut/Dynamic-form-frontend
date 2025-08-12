import { useEffect, useState } from "react";
import CreateForm from "../../components/CreateForm/CreateForm";
import styles from "./EditPage.module.css";
import type { Company } from "../../interfaces/Company.interface";
import { getCompany } from "../../api/getCompany";
import { useParams } from "react-router";
import { GetError } from "../../api/getCompanies";

const EditPage = () => {
  const { id } = useParams();
  const [company, setCompany] = useState<Company | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<null | string>(null);
  useEffect(() => {
    const handleCompany = async () => {
      try {
        setIsLoading(true);
        if (!id) throw new GetError("Id is not specified");
        setCompany(await getCompany(parseInt(id)));
        setIsLoading(false);
      } catch (err: unknown) {
        if (err instanceof GetError) {
          setIsError(err.message);
        }
        setIsError("unknown error");
      }
    };
    handleCompany();
  }, [id]);
  if (isError) return <div>Error: {isError}</div>;
  if (isLoading) return <div>Loading...</div>;
  return (
    <div className={styles.container}>
      {company && (
        <>
          <h1 className={styles.create_title}>Edit exist company</h1>
          <CreateForm
            name={company.name}
            creationDate={new Date(company.creationDate)}
            telephone={company.telephone}
            country={company.country}
            isGlobal={company.isGlobal}
            globalMarkets={company.globalMarkets}
            globalMarketKeySecretIndex={company.globalMarketKeySecretIndex}
            projects={company.projects}
            btnText="Edit company"
            isEdit={true}
          />
        </>
      )}
    </div>
  );
};

export default EditPage;
