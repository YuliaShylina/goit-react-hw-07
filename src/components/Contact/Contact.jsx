import css from "./Contact.module.css";
import { FaPhone, FaUser } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contacts/contactsOps";

function Contact({ name, number, id }) {
  const dispatch = useDispatch();
  return (
    <div className={css.container}>
      <ul className={css.item}>
        <li className={css.itemContact}>
          <FaUser />
          <p>{name}</p>
        </li>
        <li className={css.itemContact}>
          <FaPhone />
          <p>{number}</p>
        </li>
      </ul>
      <button
        type="button"
        className={css.button}
        onClick={() => dispatch(deleteContact(id))}
      >
        Delete
      </button>
    </div>
  );
}

export default Contact;
