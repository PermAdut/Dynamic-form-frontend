import styles from "./ListPageBtn.module.css";
import classNames from "classnames";

interface ListPageBtnProps {
  cb: () => void;
  isEdit: boolean;
  text: string;
}

const ListPageBtn = ({ cb, isEdit, text }: ListPageBtnProps) => {
  return (
    <button
      onClick={cb}
      className={classNames({
        [styles.edit_btn]: isEdit,
        [styles.add_btn]: !isEdit,
      })}
    >
      {text}
    </button>
  );
};

export default ListPageBtn;
