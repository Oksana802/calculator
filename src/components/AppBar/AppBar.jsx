import { useSelector } from "react-redux";
import AuthNav from "../AuthNav/AuthNav";
import Navigation from "../Navigation/Navigation";
import UserMenu from "../UserMenu/UserMenu";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import s from "./AppBar.module.css";
const AppBar = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return (
    <div className={s.container}>
      <header className={s.nav}>
        <Navigation />
        {isLoggedIn && <UserMenu />}
        {!isLoggedIn && <AuthNav />}
      </header>
    </div>
  );
};

export default AppBar;
