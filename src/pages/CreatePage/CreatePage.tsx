import CreateForm from "../../components/CreateForm/CreateForm/CreateForm";
import { Country } from "../../constants/Country.enum";
import styles from "./CreatePage.module.css";

const CreatePage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.create_title}>Create new company</h1>
      <CreateForm
        name=""
        creationDate={new Date()}
        telephone=""
        country={Country.USA}
        isGlobal={false}
        globalMarkets={[]}
        globalMarketKeySecretIndex=""
        projects={[]}
        btnText="Create company"
      />
    </div>
  );
};

export default CreatePage;
