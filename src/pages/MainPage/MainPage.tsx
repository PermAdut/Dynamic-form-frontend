import { useNavigate } from "react-router";
import CompanyList from "../../components/ListPage/CompanyList/CompanyList";
import useGetCompanies from "../../hooks/useGetCompanies";
import ListPageBtn from "../../components/ListPage/ListPageBtn/ListPageBtn";

const MainPage = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/create");
  };
  const [companies, isLoading, isError] = useGetCompanies();
  if (isError) return <div>Error: {isError}</div>;
  if (isLoading) return <div>Loading...</div>;
  return (
    <>
      <ListPageBtn text="Add new company" isEdit={false} cb={handleClick} />
      <CompanyList companies={companies} />
    </>
  );
};

export default MainPage;
