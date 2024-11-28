import { LogOut, Menu } from "lucide-react";
import Container from "../Container/Container";

import css from "./Header.module.css";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";
import IconButton from "../IconButton/IconButton";

import { NavLink } from "react-router-dom";
import ButtonLink from "../Button/ButtonLink";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/auth/operations";
import { selectIsLoggedIn } from "../../redux/auth/selectors";

const Header = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const logout = () => {
    dispatch(logOut());
  };
  return (
    <header className={css.header}>
      <Container className={css.headerBox}>
        <NavLink to="/" style={{ marginRight: "auto" }}>
          LOGO
        </NavLink>
        <nav className={css.nav}>
          <ul className={css.navList}>
            {isLoggedIn && (
              <>
                <li>
                  <NavLink to="/logs">Logs</NavLink>
                </li>
                <li>
                  <NavLink to="/logs-search">Search</NavLink>
                </li>
              </>
            )}
            {!isLoggedIn && (
              <>
                <li>
                  <ButtonLink to="/sign-in">Sign In</ButtonLink>
                </li>
                <li>
                  <ButtonLink to="/sign-up">Sign Up</ButtonLink>
                </li>
              </>
            )}
          </ul>
        </nav>
        {isLoggedIn && <IconButton RLIcon={LogOut} onClick={logout} />}
        <ThemeSwitcher />
        {/* <IconButton RLIcon={Menu} /> */}
      </Container>
    </header>
  );
};

export default Header;
