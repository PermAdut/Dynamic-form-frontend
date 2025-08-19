import type { Control, FieldErrors } from "react-hook-form";
import { type CompanyFormType } from "../../../schema/company.schema";
import { Country } from "../../../constants/Country.enum";
import InputField from "../InputField/InputField";
import SelectField from "../SelectField/SelectField";
import type { ICompany } from "../../../interfaces/Company.interface";
import FieldComponent from "../FieldComponents/FieldComponent";

interface BasicSectionInfoProps {
  control: Control<ICompany, unknown, CompanyFormType>;
  errors: FieldErrors<CompanyFormType>;
}

export default function BasicSectionInfo({
  control,
  errors,
}: BasicSectionInfoProps) {
  const countryOptions = Object.values(Country);

  return (
    <>
      <FieldComponent
        name="name"
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
        errors={errors}
      />

      <FieldComponent
        name="creationDate"
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
        errors={errors}
      />

      <FieldComponent
        name="telephone"
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
        errors={errors}
      />
      <FieldComponent
        name="country"
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
        errors={errors}
      />
    </>
  );
}
