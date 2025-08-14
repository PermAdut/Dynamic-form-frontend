import { Controller } from "react-hook-form";
import type { ControllerProps, FieldValues } from "react-hook-form";
import styles from "./FormGroup.module.css";
export interface FormGroupProps<T extends FieldValues> {
  label: string;
  htmlFor: string;
  controllerProps: ControllerProps<T>;
}
export default function FormGroup<T extends FieldValues>(
  props: FormGroupProps<T>,
) {
  return (
    <>
      <label className={styles.form_group_label} htmlFor={props.htmlFor}>
        {props.label}
      </label>
      <Controller
        name={props.controllerProps.name}
        control={props.controllerProps.control}
        render={props.controllerProps.render}
      />
    </>
  );
}
