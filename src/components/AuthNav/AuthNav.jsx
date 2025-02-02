import { NavLink } from "react-router-dom";
import s from "./AuthNav.module.css";

const AuthNav = () => {
  return (
    <div className={s.box}>
      <div className={s.nav}>
        <NavLink className={s.linkAuth} to="/register">
          Register
        </NavLink>
        <NavLink className={s.linkAuth} to="/login">
          Login
        </NavLink>
      </div>
    </div>
  );
};

export default AuthNav;
