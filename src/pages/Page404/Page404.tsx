import { useNavigate } from "react-router";
import styles from "./Page404.module.css";
export default function Page404() {
  const navigate = useNavigate();
  return (
    <div className={styles.center_container}>
      <h1>Error 404</h1>
      <h3>Not found</h3>
      <p>This page does not exit</p>
      <button onClick={() => navigate("/")}>Go to the main page</button>
    </div>
  );
}
