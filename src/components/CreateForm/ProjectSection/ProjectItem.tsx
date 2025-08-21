import type { Control, FieldErrors } from "react-hook-form";
import { type CompanyFormType } from "../../../schema/company.schema";
import { Status } from "../../../constants/Status.enum";
import InputField from "../InputField/InputField";
import SelectField from "../SelectField/SelectField";
import styles from "../CreateForm/CreateForm.module.css";
import type { ICompany } from "../../../interfaces/Company.interface";
import FieldComponent from "../FieldComponents/FieldComponent";

interface ProjectItemProps {
  control: Control<ICompany, unknown, CompanyFormType>;
  errors: FieldErrors<CompanyFormType>;
  index: number;
  remove: (index: number) => void;
}

export default function ProjectItem({
  control,
  errors,
  index,
  remove,
}: ProjectItemProps) {
  const statusOptions = Object.values(Status);

  return (
    <div className={styles.project_item}>
      <FieldComponent
        name="projects"
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
              value={typeof field.value === "string" ? field.value : ""}
            />
          ),
        }}
        errors={errors}
      />

      <FieldComponent
        name="projects"
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
              value={
                typeof field.value === "string" ||
                typeof field.value === "number"
                  ? field.value
                  : ""
              }
            />
          ),
        }}
        errors={errors}
      />

      <FieldComponent
        name="projects"
        label="Status"
        controllerProps={{
          name: `projects.${index}.status`,
          control,
          render: ({ field }) => (
            <SelectField
              id={`projects.${index}.status`}
              options={statusOptions}
              {...field}
              value={typeof field.value === "string" ? field.value : ""}
            />
          ),
        }}
        errors={errors}
      />

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
