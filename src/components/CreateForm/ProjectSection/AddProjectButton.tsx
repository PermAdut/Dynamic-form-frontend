import { type UseFieldArrayAppend } from "react-hook-form";
import { Status } from "../../../constants/Status.enum";
import styles from "../CreateForm/CreateForm.module.css";
import type { ICompany } from "../../../interfaces/Company.interface";

interface AddProjectButtonProps {
  append: UseFieldArrayAppend<ICompany, "projects">;
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
