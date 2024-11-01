import { useDispatch, useSelector } from "react-redux";
import Button from "../Button/Button";
import { toggleTheme } from "../../redux/global/slice";
import { selectThemeTitle } from "../../redux/global/selectors";
import { useEffect } from "react";

export default function ThemeSwitcher() {
  const dispatch = useDispatch();

  const theme = useSelector(selectThemeTitle);

  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [theme]);
  const handleClick = () => {
    dispatch(toggleTheme(theme === "light" ? "dark" : "light"));
  };

  return <Button onClick={handleClick}>{theme}</Button>;
}
