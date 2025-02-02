import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import * as Yup from "yup";
import { login } from "../../redux/auth/operations";
import { Navigate, useNavigate } from "react-router-dom";
import s from "./LoginForm.module.css";
import toast from "react-hot-toast";

import foto from "../../assets/login-b.jpg";
import foto2x from "../../assets/login-2x.jpg";
import fotoTab from "../../assets/login-tab.jpg";
import fotoTab2x from "../../assets/login-tab-2x.jpg";
import fotoMob from "../../assets/login-mob.jpg";
import fotoMob2x from "../../assets/login-mob-2x.jpg";

const LoginForm = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
  };
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .min(7, "Password must be at least 7 characters")
      .required("Required"),
  });
  const handleSubmit = (values, options) => {
    dispatch(login(values))
      .unwrap()
      .then(() => {
        navigate(`/contacts`);
      })
      .catch(() => {
        toast("try another email");
      });
    options.resetForm();
  };
  if (isLoggedIn) {
    return <Navigate to="/contacts" />;
  }
  return (
    <div className={s.wrapper_l}>
      <div className={s.box_log}>
        <h2>Login</h2>
        <Formik
          onSubmit={handleSubmit}
          initialValues={initialValues}
          validationSchema={validationSchema}
        >
          <Form className={s.form}>
            <label className={s.label}>
              <span>Email</span>
              <Field className={s.input} type="email" name="email" />
              <ErrorMessage name="email" component="div" className={s.error} />
            </label>
            <label className={s.label}>
              <span>Password</span>
              <Field className={s.input} type="password" name="password" />
              <ErrorMessage
                name="password"
                component="div"
                className={s.error}
              />
            </label>
            <button className={s.btn} type="submit">
              Log in
            </button>
          </Form>
        </Formik>
      </div>
      <p className={s.text}>
        Who's the first on your list to connect with today? Let's get started
        and make it happen!
      </p>
      <div>
        <picture>
          <source
            srcSet={`${foto2x} 2x, ${foto} 1x`}
            media="(min-width: 1158px)"
            type="image/jpeg"
          />

          <source
            srcSet={`${fotoTab2x} 2x, ${fotoTab} 1x`}
            media="(min-width: 768px)"
            type="image/jpeg"
          />

          <source
            srcSet={`${fotoMob2x} 2x, ${fotoMob} 1x`}
            media="(min-width: 320px)"
            type="image/jpeg"
          />
          <img
            src={fotoMob}
            alt="Сhristmas wreath"
            // width="300"
            // height="256"
          />
        </picture>
      </div>
    </div>
  );
};

export default LoginForm;
