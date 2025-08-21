import CreateForm from "../../components/CreateForm/CreateForm/CreateForm";
import styles from "../CreatePage/CreatePage.module.css";
import useGetCompany from "../../hooks/useGetCompany";

const EditPage = () => {
  const [company, isLoading, isError] = useGetCompany();
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
