import { useDispatch } from "react-redux";
import { deleteContact } from "/src/redux/contactsSlice.js";

import styles from "./Contact.module.css";

const Contact = ({ name, number, id }) => {
  const dispatch = useDispatch();

  const handleCLickDeleteBtn = () => {
    const contactId = id;
    dispatch(deleteContact(contactId));
  };

  return (
    <div className={styles.item}>
      <div>
        <p>{name}</p>
        <p>{number}</p>
      </div>
      <button type="button" onClick={handleCLickDeleteBtn}>
        Delete
      </button>
    </div>
  );
};

export default Contact;
