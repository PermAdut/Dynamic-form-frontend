import type { ICompany } from "../../../interfaces/Company.interface";
import FormGroup from "../FormGroup/FormGroup";
import type { ControllerProps, FieldErrors, Path } from "react-hook-form";
import type { CompanyFormType } from "../../../schema/company.schema";

interface FieldComponentProps<T extends keyof ICompany> {
  name: T;
  label: string;
  controllerProps: ControllerProps<ICompany, Path<ICompany>, CompanyFormType>;
  errors: FieldErrors<CompanyFormType>;
}

export default function FieldComponent<T extends keyof ICompany>(
  props: FieldComponentProps<T>,
) {
  return (
    <>
      <FormGroup
        htmlFor={props.name}
        label={props.label}
        controllerProps={props.controllerProps}
        isError={Boolean(props.errors.name)}
        message={props.errors.name?.message}
      />
    </>
  );
}
