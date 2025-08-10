import { useNavigate } from "react-router";
import styles from './AddCompanyItem.module.css'
const AddCompanyItem = () => {
  const navigate = useNavigate();
  const handleClick = async () => {
    navigate('/create')
  }
  return (
    <>
        <button onClick={handleClick} className={styles.add_btn}>Add new company</button>
    </>
  )
}
export default AddCompanyItem;