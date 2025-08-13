import { type UseFieldArrayAppend } from "react-hook-form";
import { type CompanyFormType } from "../../schema/company.schema";
import { Status } from "../../constants/Status.enum";
import styles from "../CreateForm/CreateForm.module.css";

interface AddProjectButtonProps {
  append: UseFieldArrayAppend<CompanyFormType, "projects">;
}

export default function AddProjectButton({ append }: AddProjectButtonProps) {
  return (
    <button
      type="button"
      onClick={() => append({ name: "", price: "", status: Status.COMPLETED })}
      className={styles.add_project_btn}
    >
      Add new project
    </button>
  );
}