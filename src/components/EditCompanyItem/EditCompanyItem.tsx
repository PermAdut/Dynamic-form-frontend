import { useNavigate } from "react-router";
import styles from './EditCompanyItem.module.css'
const EditCompanyItem = () => {
  const navigate = useNavigate();
  const handleClick = async () => {
    navigate('/edit')
  }
  return (
    <>
        <button onClick={handleClick} className={styles.edit_btn}>Edit</button>
    </>
  )
}
export default EditCompanyItem;