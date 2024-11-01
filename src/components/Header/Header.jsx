import { Menu } from "lucide-react";
import Container from "../Container/Container";

import css from "./Header.module.css";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";
import IconButton from "../IconButton/IconButton";
import Button from "../Button/Button";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className={css.header}>
      <Container className={css.headerBox}>
        <NavLink to="/" style={{ marginRight: "auto" }}>
          LOGO
        </NavLink>
        <nav className={css.nav}>
          <ul className={css.navList}>
            <li>
              <NavLink to="/logs">Logs</NavLink>
            </li>
            <li>
              <NavLink to="/logs-search">Search</NavLink>
            </li>
          </ul>
        </nav>
        <Button>Sign In</Button>
        <ThemeSwitcher />
        <IconButton RLIcon={Menu} />
      </Container>
    </header>
  );
};

export default Header;
