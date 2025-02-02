import { ErrorMessage, Field, Form, Formik } from "formik";
import s from "./ContactForm.module.css";

import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contacts/operations";

const ContactForm = () => {
  const dispatch = useDispatch();
  const initialValues = {
    name: "",
    number: "",
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

  const handleSubmit = (values, options) => {
    dispatch(addContact(values));
    options.resetForm();
  };

  return (
    <div className={s.wrapper}>
      <Formik
        validationSchema={OrderSchema}
        onSubmit={handleSubmit}
        initialValues={initialValues}
      >
        <Form className={s.form}>
          <label className={s.label}>
            <span>Name</span>
            <Field
              className={s.input}
              type="text"
              name="name"
              placeholder="friend's name"
            />
            <ErrorMessage name="name" component="div" className={s.error} />
          </label>
          <label className={s.label}>
            <span>Number</span>
            <Field
              className={s.input}
              type="text"
              name="number"
              placeholder="telephone number"
            />
            <ErrorMessage name="number" component="div" className={s.error} />
          </label>
          <button type="submit" className={s.btn}>
            Add contact
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default ContactForm;
