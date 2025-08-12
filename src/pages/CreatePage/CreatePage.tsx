import CreateForm from "../../components/CreateForm/CreateForm";
import styles from "./CreatePage.module.css";


const CreatePage = () => {

  return (
    <div className={styles.container}>
      <h1 className={styles.create_title}>Create new company</h1>
      <CreateForm />
    </div>
  );
};

export default CreatePage;
