import { Pencil, Trash } from "lucide-react";

import { differenceInHours, differenceInMinutes, format } from "date-fns";
import { uk } from "date-fns/locale";

import TableGrid from "../TableGrid/TableGrid";

import css from "./LogItem.module.css";
import IconButton from "../IconButton/IconButton";
import { deleteLog, setCurrentLog } from "../../redux/logs/slice";
import { useDispatch } from "react-redux";

export default function LogItem({ item }) {
  const dispatch = useDispatch();

  const formatedDate = format(new Date(item.date), "E dd.MM", {
    locale: uk,
  });
  const formatedStart = format(item.start, "HH:mm");
  const formateEnd = format(item.end, "HH:mm");
  const hours = differenceInHours(item.end, item.start);
  const minutes = differenceInMinutes(item.end, item.start, {
    roundingMethod: "round",
  });

  const total = hours + (minutes - hours * 60) / 60;

  return (
    <TableGrid>
      <div className={css.col}>{formatedDate}</div>
      <div className={css.col}>{item.username}</div>
      <div className={css.col}>{formatedStart}</div>
      <div className={css.col}>{formateEnd}</div>
      <div className={css.col}>{total.toFixed(2)}</div>
      <div className={css.col}>
        <div className={css.controls}>
          <IconButton
            RLIcon={Pencil}
            onClick={() => {
              dispatch(setCurrentLog(item));
            }}
          />
          <IconButton
            RLIcon={Trash}
            onClick={() => {
              dispatch(deleteLog(item.id));
            }}
          />
        </div>
      </div>
    </TableGrid>
  );
}
