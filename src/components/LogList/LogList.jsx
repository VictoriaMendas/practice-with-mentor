import { useSelector } from "react-redux";
import LogItem from "../LogItem/LogItem";
import TableGrid from "../TableGrid/TableGrid";

import css from "./LogList.module.css";
import { selectLogs } from "../../redux/logs/selectors";

export default function LogList() {
  const logData = useSelector(selectLogs);

  const sortedLogData = (() => {
    return logData.toSorted(
      (a, b) =>
        new Date(a.date) - new Date(b.date) ||
        a.username.localeCompare(b.username)
    );
  })();
  return (
    <div className={css.table}>
      <TableGrid className={css.head}>
        {["Дата", "ПІБ", "Початок", "Кінець", "Години", ""].map(
          (name, index) => (
            <div className={css.col} key={index}>
              {name}
            </div>
          )
        )}
      </TableGrid>
      <ul>
        {sortedLogData.map((item) => {
          return (
            <li key={item.id} className={css.row}>
              <LogItem item={item} />
            </li>
          );
        })}
      </ul>
      <TableGrid>
        {["", "", "", "Загалом", "", ""].map((name, index) => (
          <div className={css.col} key={index}>
            {name}
          </div>
        ))}
      </TableGrid>
    </div>
  );
}
