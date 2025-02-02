import { FaPhone } from "react-icons/fa6";
import { IoPersonSharp } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contacts/operations";
import s from "./Contact.module.css";
import { CiEdit } from "react-icons/ci";

const Contact = ({ id, name, number, onEdit }) => {
  const dispatch = useDispatch();

  return (
    <div className={s.box_card}>
      <li className={s.item}>
        <ul>
          <li className={s.input}>
            <IoPersonSharp className={s.icon_p} />
            {name}
          </li>
          <li className={s.input}>
            <FaPhone className={s.icon_t} />
            {number}
          </li>
        </ul>
        <div className={s.box_btn}>
          <button onClick={() => dispatch(deleteContact(id))} className={s.btn}>
            Delete
          </button>
          <button onClick={onEdit} className={s.btn}>
            <CiEdit />
          </button>
        </div>
      </li>
    </div>
  );
};

export default Contact;
