import type { Control, FieldErrors } from "react-hook-form";
import { type CompanyFormType } from "../../../schema/company.schema";
import { Country } from "../../../constants/Country.enum";
import FormGroup from "../FormGroup/FormGroup";
import ValidationError from "../ValidationError/ValidationError";
import InputField from "../InputField/InputField";
import SelectField from "../SelectField/SelectField";
import styles from "../CreateForm/CreateForm.module.css";

interface BasicSectionInfoProps {
  control: Control<CompanyFormType>;
  errors: FieldErrors<CompanyFormType>;
}

export default function BasicSectionInfo({
  control,
  errors,
}: BasicSectionInfoProps) {
  const countryOptions = Object.values(Country);

  return (
    <>
      <div className={styles.form_group}>
        <FormGroup
          htmlFor="name"
          label="Company name"
          controllerProps={{
            name: "name",
            control,
            render: ({ field }) => (
              <InputField
                type="text"
                id="name"
                placeholder="Type company name"
                {...field}
                value={typeof field.value === "string" ? field.value : ""}
              />
            ),
          }}
        />
        <ValidationError
          isError={Boolean(errors.name)}
          message={errors.name?.message}
        />
      </div>

      <div className={styles.form_group}>
        <FormGroup
          htmlFor="creationDate"
          label="Creation date"
          controllerProps={{
            name: "creationDate",
            control,
            render: ({ field }) => (
              <InputField
                type="date"
                id="creationDate"
                {...field}
                value={
                  field.value instanceof Date
                    ? field.value.toISOString().split("T")[0]
                    : ""
                }
                onChange={(e) => field.onChange(new Date(e.target.value))}
              />
            ),
          }}
        />
        <ValidationError
          isError={Boolean(errors.creationDate)}
          message={errors.creationDate?.message}
        />
      </div>

      <div className={styles.form_group}>
        <FormGroup
          htmlFor="telephone"
          label="Telephone (not required)"
          controllerProps={{
            name: "telephone",
            control,
            render: ({ field }) => (
              <InputField
                type="tel"
                id="telephone"
                placeholder="+1-555-123-4567"
                {...field}
                value={typeof field.value === "string" ? field.value : ""}
              />
            ),
          }}
        />
        <ValidationError
          isError={Boolean(errors.telephone)}
          message={errors.telephone?.message}
        />
      </div>

      <div className={styles.form_group}>
        <FormGroup
          htmlFor="country"
          label="Country"
          controllerProps={{
            name: "country",
            control,
            render: ({ field }) => (
              <SelectField
                id="country"
                options={countryOptions}
                {...field}
                value={
                  typeof field.value === "string"
                    ? field.value
                    : countryOptions[0]
                }
              />
            ),
          }}
        />
        <ValidationError
          isError={Boolean(errors.country)}
          message={errors.country?.message}
        />
      </div>
    </>
  );
}
