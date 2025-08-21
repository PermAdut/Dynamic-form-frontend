import styles from "./EmptyLayout.module.css";
type EmptyLayoutPropsType = React.PropsWithChildren<{
  text: string;
  exist: boolean;
}>;

const EmptyLayout = (props: EmptyLayoutPropsType) => {
  if (!props.exist) return <div className={styles.no_data}>{props.text}</div>;
  return props.children;
};
export default EmptyLayout;
