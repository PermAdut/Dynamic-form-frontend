import type { Control, FieldErrors } from "react-hook-form";
import { type CompanyFormType } from "../../schema/company.schema";
import { Status } from "../../constants/Status.enum";
import FormGroup from "../../components/FormGroup/FormGroup";
import ValidationError from "../ValidationError/ValidationError";
import InputField from "../InputField/InputField";
import SelectField from "../SelectField/SelectField";
import styles from "../CreateForm/CreateForm.module.css";

interface ProjectItemProps {
  control: Control<CompanyFormType>;
  errors: FieldErrors<CompanyFormType>;
  index: number;
  remove: (index: number) => void;
}

export default function ProjectItem({ control, errors, index, remove }: ProjectItemProps) {
  const statusOptions = Object.values(Status);

  return (
    <div className={styles.project_item}>
      <div className={styles.form_group}>
        <FormGroup
          htmlFor={`projects.${index}.name`}
          label="Project name"
          controllerProps={{
            name: `projects.${index}.name`,
            control,
            render: ({ field }) => (
              <InputField
                type="text"
                id={`projects.${index}.name`}
                placeholder="Type project name"
                {...field}
              />
            ),
          }}
        />
        <ValidationError
          isError={Boolean(errors.projects?.[index]?.name)}
          message={errors.projects ? errors.projects[index]?.name?.message : undefined}
        />
      </div>

      <div className={styles.form_group}>
        <FormGroup
          htmlFor={`projects.${index}.price`}
          label="Price"
          controllerProps={{
            name: `projects.${index}.price`,
            control,
            render: ({ field }) => (
              <InputField
                type="text"
                id={`projects.${index}.price`}
                placeholder="10,00"
                {...field}
              />
            ),
          }}
        />
        <ValidationError
          isError={Boolean(errors.projects?.[index]?.price)}
          message={errors.projects ? errors.projects[index]?.price?.message : undefined}
        />
      </div>

      <div className={styles.form_group}>
        <FormGroup
          htmlFor={`projects.${index}.status`}
          label="Status"
          controllerProps={{
            name: `projects.${index}.status`,
            control,
            render: ({ field }) => (
              <SelectField
                id={`projects.${index}.status`}
                options={statusOptions}
                {...field}
              />
            ),
          }}
        />
        <ValidationError
          isError={Boolean(errors.projects?.[index]?.status)}
          message={errors.projects ? errors.projects[index]?.status?.message : undefined}
        />
      </div>

      <button
        type="button"
        onClick={() => remove(index)}
        className={styles.remove_project_btn}
      >
        Remove
      </button>
    </div>
  );
}