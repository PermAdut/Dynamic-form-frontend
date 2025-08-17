import type {
  FieldErrors,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  Control,
  FieldArrayWithId,
} from "react-hook-form";
import { type CompanyFormType } from "../../../schema/company.schema";
import ProjectItem from "./ProjectItem";
import AddProjectButton from "./AddProjectButton";
import styles from "./ProjectSection.module.css";
import type { ICompany } from "../../../interfaces/Company.interface";

interface ProjectsSectionProps {
  control: Control<ICompany, unknown, CompanyFormType>;
  errors: FieldErrors<CompanyFormType>;
  fields: FieldArrayWithId<ICompany, "projects", "id">[];
  append: UseFieldArrayAppend<ICompany, "projects">;
  remove: UseFieldArrayRemove;
}

export default function ProjectsSection({
  control,
  errors,
  fields,
  append,
  remove,
}: ProjectsSectionProps) {
  return (
    <div className={styles.project_section}>
      <h3>Add project (not required)</h3>
      <AddProjectButton append={append} />
      {fields.length > 0 && (
        <div className={styles.project_list}>
          <h4>Added projects:</h4>
          <div className={styles.project_grid}>
            {fields.map((project, index) => (
              <ProjectItem
                key={project.id}
                control={control}
                errors={errors}
                index={index}
                remove={remove}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
