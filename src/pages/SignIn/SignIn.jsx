import { ErrorMessage, Field, Form, Formik } from "formik";
// import { nanoid } from "nanoid";
import * as Yup from "yup";
import Container from "../../components/Container/Container";
import Button from "../../components/Button/Button";
import { useDispatch } from "react-redux";
import { logIn } from "../../redux/auth/operations";

const schema = Yup.object({
  email: Yup.string().email().required("*"),
  password: Yup.string().min(8).required("*"),
});

export default function SignIn() {
  const dispatch = useDispatch();

  return (
    <section>
      <Container>
        <h1>Sign In</h1>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={schema}
          onSubmit={(values, actions) => {
            console.log(values);
            dispatch(logIn(values));
            actions.resetForm();
          }}
        >
          <Form>
            <label>
              <span>Email: </span>
              <Field type="text" name="email" />
              <ErrorMessage component="span" name="email" />
            </label>
            <label>
              <span>Password: </span>
              <Field type="password" name="password" />
              <ErrorMessage component="span" name="password" />
            </label>
            <Button>Sign In</Button>
          </Form>
        </Formik>
      </Container>
    </section>
  );
}
