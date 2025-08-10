import { useState } from "react";
import type { Project } from "../../interfaces/Project.interface";
import ProjectListItem from "../ProjectListItem/ProjectListItem";
import EmptyLayout from "../ui/EmptyLayout";
import styles from "./ProjectList.module.css";
export interface ProjectListProps {
  projects: Project[];
}
const ProjectList = (props: ProjectListProps) => {
  const projectsPerPage = Math.ceil(window.innerWidth / 200) | 1;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = Math.ceil(props.projects.length / projectsPerPage);
  const paginatedProjects = props.projects.slice(
    (currentPage - 1) * projectsPerPage,
    currentPage * projectsPerPage,
  );
  return (
    <div className={styles.project_list}>
      <EmptyLayout exist={props.projects.length > 0}>
        {paginatedProjects.map((el, index) => (
          <ProjectListItem
            key={index}
            name={el.name}
            price={el.price}
            status={el.status}
          />
        ))}
      </EmptyLayout>

      {totalPages > 1 && (
        <div className={styles.project_list_pagination}>
          <button
            className={styles.project_list_btn}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Назад
          </button>
          <span className={styles.project_list_cur_page}>
            {currentPage} / {totalPages}
          </span>
          <button
            className={styles.project_list_btn}
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Вперед
          </button>
        </div>
      )}
    </div>
  );
};

export default ProjectList;
