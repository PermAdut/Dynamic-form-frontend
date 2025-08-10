import styles from "./EmptyLayout.module.css";
type EmptyLayoutPropsType = React.PropsWithChildren<{
  exist: boolean;
}>;

const EmptyLayout = (props: EmptyLayoutPropsType) => {
  if (!props.exist)
    return <div className={styles.projects_no_data}>No projects</div>;
  return props.children;
};
export default EmptyLayout;