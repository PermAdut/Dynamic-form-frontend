import { useState, useEffect } from "react";
import ProjectList from "../ProjectList/ProjectList";
import styles from "./CompanyListItem.module.css";
import { useNavigate } from "react-router";
import ListPageBtn from "../ListPageBtn/ListPageBtn";
import type { CompanyResponseDto } from "../../../api/types/company.response.dto";
export interface CompanyListItemProps extends CompanyResponseDto {
  id: number;
}
const CompanyListItem = (props: CompanyListItemProps) => {
  const navigate = useNavigate();
  const [globalMarkets, setGlobalMarkets] = useState<string | null>(null);
  const handleClick = () => {
    navigate(`/edit/${props.id}`);
  };
  useEffect(() => {
    if (props.globalMarkets) {
      setGlobalMarkets(props.globalMarkets.join(", "));
    } else {
      setGlobalMarkets(null);
    }
  }, [props.globalMarkets]);

  return (
    <div className={styles.company_item}>
      <h2 className={styles.company_item_title}>{props.name}</h2>
      <h3 className={styles.company_item_date}>Since: {props.creationDate}</h3>
      {props.telephone && (
        <p className={styles.company_telephone}>Telephone: {props.telephone}</p>
      )}
      <p className={styles.company_location}>Located at: {props.country}</p>
      {props.isGlobal && (
        <div className={styles.global_info}>
          <span className={styles.company_global_market}>
            Global Markets: {globalMarkets || "None"}
          </span>
          <span className={styles.company_global_index}>
            Global Market Index: {props.globalMarketKeySecretIndex || "N/A"}
          </span>
        </div>
      )}
      {props.projects && <ProjectList projects={props.projects} />}
      <div className={styles.company_edit}>
        <ListPageBtn cb={handleClick} text="Edit" isEdit={true} />
      </div>
    </div>
  );
};

export default CompanyListItem;
