import { useState } from "react";
import type { Project } from "../interfaces/Project.interface";

export default function usePagination(
  projects: Project[],
): [Project[], number, number, React.Dispatch<React.SetStateAction<number>>] {
  const projectsPerPage = Math.ceil(window.innerWidth / 200) | 1;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = Math.ceil(projects.length / projectsPerPage);
  const paginatedProjects = projects.slice(
    (currentPage - 1) * projectsPerPage,
    currentPage * projectsPerPage,
  );
  return [paginatedProjects, totalPages, currentPage, setCurrentPage];
}
