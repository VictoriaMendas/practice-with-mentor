import { ErrorMessage, Field, Form, Formik } from "formik";

import * as Yup from "yup";
import IconButton from "../IconButton/IconButton";
import { BadgePlus } from "lucide-react";

import { addMinutes } from "date-fns";
import TimeField from "../Forms/TimeField";
import DateField from "../Forms/DateField";

import css from "./LogForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import { editLog } from "../../redux/logs/operations";

import { selectCurrentLog } from "../../redux/logs/selectors";

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

export default function EditLogForm() {
  const dispatch = useDispatch();
  const currentLog = useSelector(selectCurrentLog);

  return (
    <Formik
      initialValues={{
        date: new Date(currentLog.date),
        username: currentLog.username,
        start: new Date(currentLog.start),
        end: new Date(currentLog.end),
      }}
      validationSchema={schema}
      onSubmit={(values, actions) => {
        const updatedLogItem = { ...values, id: currentLog.id };

        dispatch(editLog(updatedLogItem));
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
