import { Link } from "react-router-dom";
import css from "./Button.module.css";

export default function ButtonLink({ children, to, ...restProps }) {
  console.log(restProps);
  return (
    <Link to={to} {...restProps} className={css.button}>
      {children}
    </Link>
  );
}
