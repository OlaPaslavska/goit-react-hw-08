import { BsPersonFill } from "react-icons/bs";
import { FaPhone } from "react-icons/fa6";
import css from "./Contact.module.css";
import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contactsSlice";
import PropTypes from "prop-types";
const Contact = ({ contact }) => {
  const dispatch = useDispatch();
  return (
    <li className={css.contactItem}>
      <div>
        <span className={css.dataText}>
          <BsPersonFill /> {contact.name}
        </span>
        <br />
        <span className={css.dataText}>
          <FaPhone /> {contact.number}
        </span>
      </div>

      <button
        type="button"
        className={css.contactBtnDel}
        onClick={() => dispatch(deleteContact(contact.id))}
      >
        Delete
      </button>
    </li>
  );
};

Contact.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }),
};

export default Contact;
