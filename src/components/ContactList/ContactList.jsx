import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";
import Contact from "../Contact/Contact";
import { updateContact } from "../../redux/contacts/operations";
import { selectFilteredContacts } from "../../redux/contacts/selectors";
import { ErrorMessage, Field, Form, Formik } from "formik";

import * as Yup from "yup";
import s from "./ContactList.module.css";

Modal.setAppElement("#root");

const ContactList = () => {
  const contacts = useSelector(selectFilteredContacts);
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentContact, setCurrentContact] = useState(null);

  const initialValues = currentContact
    ? { name: currentContact.name, number: currentContact.number }
    : { name: "", number: "" };

  const handleOpenModal = (contact) => {
    if (!isModalOpen) {
      setCurrentContact(contact);
      setIsModalOpen(true);
    }
  };

  const re = /^\d{10}$/;
  const OrderSchema = Yup.object({
    name: Yup.string()
      .min(3, "Minimum length is 3 characters")
      .max(20, "Maximum length is 20 characters")
      .required("This field is required"),
    number: Yup.string()
      .matches(re, "Only digits - 10 characters allowed")
      .max(10, "Maximum length is 10 characters")
      .required("This field is required"),
  });
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentContact(null);
  };
  const handleUpdateContact = async (values) => {
    try {
      await dispatch(
        updateContact({
          id: currentContact.id,
          updates: values,
        })
      );
      handleCloseModal();
    } catch (error) {
      console.error("Failed to update contact:", error);
    }
  };

  return (
    <div className={s.wrapper_card_list}>
      <ul className={s.box_card_list}>
        {contacts.map((contact) => (
          <Contact
            key={contact.id}
            {...contact}
            onEdit={() => handleOpenModal(contact)}
          />
        ))}
      </ul>

      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onRequestClose={handleCloseModal}
          contentLabel="Edit Contact"
          overlayClassName={s.modal_overlay}
          className={s.modal_edit}
        >
          <div>
            <h2 className={s.title_edit}>Edit Contact</h2>
            <Formik
              validationSchema={OrderSchema}
              onSubmit={handleUpdateContact}
              initialValues={initialValues}
            >
              <Form className={s.form}>
                <label className={s.label}>
                  <span className={s.span}>Name</span>
                  <Field
                    className={s.input}
                    type="text"
                    name="name"
                    autoFocus
                    placeholder="Enter name"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className={s.error}
                  />
                </label>
                <label className={s.label}>
                  <span className={s.span}>Number</span>
                  <Field
                    className={s.input}
                    type="text"
                    name="number"
                    placeholder="Enter phone number"
                  />
                  <ErrorMessage
                    name="number"
                    component="div"
                    className={s.error}
                  />
                </label>
                <div className={s.box_btn}>
                  <button type="submit" className={s.btn}>
                    Save
                  </button>
                  <button
                    type="button"
                    className={s.btn}
                    onClick={handleCloseModal}
                  >
                    Cancel
                  </button>
                </div>
              </Form>
            </Formik>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ContactList;
