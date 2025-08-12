import { Controller } from "react-hook-form";
import type { ControllerProps} from "react-hook-form";
import styles from './FormGroup.module.css';
export interface FormGroupProps {
    label: string;
    htmlFor:string;
    controllerProps: ControllerProps,
}
export default function FormGroup(props: FormGroupProps) {
  return (
    <>
      <label className={styles.form_group_label} htmlFor={props.htmlFor}>{props.label}</label>
      <Controller
        name={props.controllerProps.name}
        control={props.controllerProps.control}
        render={props.controllerProps.render}
      />
    </>
  );
}
