import ProjectList from "../../components/ProjectList/ProjectList";
import { Status } from "../../constants/Status.enum";
import type { Project } from "../../interfaces/Project.interface";

const proj: Project[] = [
  { name: "test", price: "14,13", status: Status.COMPLETED },
  { name: "test", price: "14,13", status: Status.COMPLETED },
  { name: "test", price: "14,13", status: Status.COMPLETED },
  { name: "test", price: "14,13", status: Status.COMPLETED },
  { name: "test", price: "14,13", status: Status.COMPLETED },
  { name: "test", price: "14,13", status: Status.COMPLETED },
  { name: "test", price: "14,13", status: Status.COMPLETED },
  { name: "test", price: "14,13", status: Status.COMPLETED },
  { name: "test", price: "14,13", status: Status.COMPLETED },
  { name: "test", price: "14,13", status: Status.COMPLETED },
  { name: "test", price: "14,13", status: Status.COMPLETED },
  { name: "test", price: "14,13", status: Status.COMPLETED },
];

const MainPage = () => {
  return (
    <>
      <ProjectList projects={proj}/>
    </>
  );
};
export default MainPage;
