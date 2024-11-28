import { ErrorMessage, Field, Form, Formik } from "formik";
// import { nanoid } from "nanoid";
import * as Yup from "yup";
import IconButton from "../IconButton/IconButton";
import { BadgePlus } from "lucide-react";

import {
  addMinutes,
  setHours,
  setMinutes,
  setSeconds,
  startOfDay,
} from "date-fns";
import TimeField from "../Forms/TimeField";
import DateField from "../Forms/DateField";

import css from "./LogForm.module.css";
import { useDispatch } from "react-redux";
import { addLog } from "../../redux/logs/operations";
import { nanoid } from "nanoid";

const schema = Yup.object({
  date: Yup.date().required("*"),
  username: Yup.string()
    .min(2, "від 2-х символів")
    .max(40, "до 40 символів")
    .required("*"),
  start: Yup.date().required("*"),
  end: Yup.date()
    .test({
      name: "is-future",
      test: (value, { parent }) => parent?.start < value,
      message: "Час закінчення має бути пізніше ніж час початку",
    })
    .required("Обов'язкове поле"),
});

export default function LogForm() {
  const dispatch = useDispatch();
  return (
    <Formik
      initialValues={{
        date: startOfDay(new Date()),
        username: "",
        start: setHours(setMinutes(setSeconds(new Date(), 0), 0), 8),
        end: setHours(setMinutes(setSeconds(new Date(), 0), 0), 20),
      }}
      validationSchema={schema}
      onSubmit={(values, actions) => {
        const newLogItem = { ...values, id: nanoid() };

        dispatch(addLog(newLogItem));
        actions.resetForm();
      }}
    >
      {({ getFieldMeta }) => (
        <Form className={css.form}>
          <div className={css.label}>
            <div>
              ПІБ{" "}
              <ErrorMessage
                component="span"
                className={css.error}
                name="username"
              />
            </div>
            <Field type="text" name="username" className={css.input} />
          </div>
          <div className={css.label}>
            <div>
              Дата{" "}
              <ErrorMessage
                component="span"
                className={css.error}
                name="date"
              />
            </div>
            <DateField name="date" id="qwe" />
          </div>
          <div className={css.label}>
            <div>
              Початок{" "}
              <ErrorMessage
                component="span"
                className={css.error}
                name="start"
              />
            </div>
            <TimeField name="start" />
          </div>
          <div className={css.label}>
            <div>
              Кінець{" "}
              <ErrorMessage component="span" className={css.error} name="end" />
            </div>
            <TimeField
              name="end"
              min={addMinutes(getFieldMeta("start").value, 15)}
            />
          </div>

          <IconButton RLIcon={BadgePlus} type="submit" />
        </Form>
      )}
    </Formik>
  );
}
