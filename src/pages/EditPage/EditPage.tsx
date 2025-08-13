import { useEffect, useState } from "react";
import CreateForm from "../../components/CreateForm/CreateForm";
import styles from "../CreatePage/CreatePage.module.css";
import type { Company } from "../../interfaces/Company.interface";
import { getCompany } from "../../api/getCompany";
import { useNavigate, useParams } from "react-router";
import { BackendError } from "../../interfaces/BackendError";

const EditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [company, setCompany] = useState<Company | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<null | string>(null);
  useEffect(() => {
    const handleCompany = async () => {
      try {
        setIsLoading(true);
        if (!id) throw new BackendError("Id is not specified");
        setCompany(await getCompany(parseInt(id)));
        setIsLoading(false);
      } catch (err: unknown) {
        if (err instanceof BackendError) {
          setIsError(err.message);
        }
        setIsError("unknown error");
        navigate('/')
      }
    };
    handleCompany();
  }, [id, navigate]);
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
          />
        </>
      )}
    </div>
  );
};

export default EditPage;
