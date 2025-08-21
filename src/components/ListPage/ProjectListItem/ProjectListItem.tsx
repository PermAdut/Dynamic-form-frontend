import type { Project } from "../../../interfaces/Project.interface";
import styles from "./ProjectListItem.module.css";

const ProjectListItem = (props: Project) => {
  return (
    <div className={styles.project_item}>
      <h3 className={styles.project_item_title}>
        Project name:{" "}
        <span className={styles.project_item_name}>{props.name}</span>
      </h3>
      <p>
        Project price:{" "}
        <span className={styles.project_item_price}>
          {parseFloat(props.price.replace(",", ".")).toFixed(2)} $
        </span>
      </p>
      <span>
        Project status:{" "}
        <span className={styles.project_item_status}>{props.status}</span>
      </span>
    </div>
  );
};

export default ProjectListItem;
