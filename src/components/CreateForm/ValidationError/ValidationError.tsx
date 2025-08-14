import styles from "./ValidationError.module.css";
export interface ValidationErrorProps {
  isError: boolean;
  message: string | undefined;
}
const ValidationError = (props: ValidationErrorProps) => {
  return (
    <>
      {props.isError && (
        <span className={styles.error_message}>{props.message}</span>
      )}
    </>
  );
};

export default ValidationError;
