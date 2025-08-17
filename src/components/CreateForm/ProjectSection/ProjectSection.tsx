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
import styles from "../CreateForm/CreateForm.module.css";
import { Country } from "../../../constants/Country.enum";
import { GlobalMarket } from "../../../constants/GlobalMarket.enum";
import { Status } from "../../../constants/Status.enum";
import type { ICompany } from "../../../interfaces/Company.interface";

interface ProjectsSectionProps {
  control: Control<ICompany, unknown, CompanyFormType>;
  errors: FieldErrors<CompanyFormType>;
  fields: FieldArrayWithId<
    {
      name: string;
      creationDate: Date;
      telephone: string | undefined;
      country: Country;
      isGlobal: NonNullable<boolean | undefined>;
      globalMarkets: (GlobalMarket | undefined)[] | undefined;
      globalMarketKeySecretIndex: string | undefined;
      projects:
        | {
            name: string;
            price: string;
            status: Status;
          }[]
        | undefined;
    },
    "projects",
    "id"
  >[];
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
    <div className={styles.form_group}>
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
