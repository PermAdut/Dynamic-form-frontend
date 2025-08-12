import { useNavigate } from "react-router";
import styles from './EditCompanyItem.module.css'
export interface EditCompanyItemProps{
  id: number;
}
const EditCompanyItem = (props: EditCompanyItemProps) => {
  const navigate = useNavigate();
  const handleClick = async () => {
    navigate(`/edit/${props.id}`)
  }
  return (
    <>
        <button onClick={handleClick} className={styles.edit_btn}>Edit</button>
    </>
  )
}
export default EditCompanyItem;