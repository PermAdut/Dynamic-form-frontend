import type { Company } from "../../interfaces/Company.interface";
import CompanyListItem from "../CompanyListItem/CompanyListItem";
import EmptyLayout from "../ui/EmptyLayout/EmptyLayout";
import styles from "./CompanyList.module.css";
export interface CompanyListProps {
  companies: Company[];
}
const CompanyList = (props: CompanyListProps) => {
  return (
    <div className={styles.company_list}>
      <EmptyLayout exist={props.companies.length > 0} text="No companies">
        {props.companies.map((el, index) => (
          <CompanyListItem
            key={index}
            id={index}
            name={el.name}
            creationDate={el.creationDate}
            telephone={el.telephone}
            country={el.country}
            isGlobal={el.isGlobal}
            globalMarkets={el.globalMarkets}
            globalMarketKeySecretIndex={el.globalMarketKeySecretIndex}
            projects={el.projects}
          ></CompanyListItem>
        ))}
      </EmptyLayout>
    </div>
  );
};

export default CompanyList;
