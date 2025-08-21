import { useEffect, useState } from "react";
import type { Project } from "../interfaces/Project.interface";

export default function usePagination(
  projects: Project[],
): [Project[], number, number, React.Dispatch<React.SetStateAction<number>>] {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [paginatedProjects, setPaginatedProjects] = useState<Project[]>([]);
  const updatePagination = () => {
    const projectsPerPage = Math.max(
      Math.ceil(document.documentElement.scrollWidth / 200),
      1,
    );
    setTotalPages(Math.ceil(projects.length / projectsPerPage));
    setPaginatedProjects(
      projects.slice(
        (currentPage - 1) * projectsPerPage,
        currentPage * projectsPerPage,
      ),
    );
  };

  useEffect(() => {
    updatePagination();
    const handleResize = () => {
      const timeoutId = setTimeout(updatePagination, 200);
      return () => clearTimeout(timeoutId);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [projects, currentPage]);

  return [paginatedProjects, totalPages, currentPage, setCurrentPage];
}
