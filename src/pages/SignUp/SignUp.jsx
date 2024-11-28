import { ErrorMessage, Field, Form, Formik } from "formik";
// import { nanoid } from "nanoid";
import * as Yup from "yup";
import Container from "../../components/Container/Container";
import Button from "../../components/Button/Button";
import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations";
import toast from "react-hot-toast";

const schema = Yup.object({
  name: Yup.string()
    .min(2, "від 2-х символів")
    .max(40, "до 40 символів")
    .required("*"),
  email: Yup.string().email().required("*"),
  password: Yup.string().min(8).required("*"),
});

export default function SignUp() {
  const dispatch = useDispatch();
  const handleSubmit = async (values, actions) => {
    try {
      await dispatch(register(values)).unwrap();
      actions.resetForm();
    } catch (error) {
      toast.error("Email or password is invalid");
      console.log(error);
    }
  };
  return (
    <section>
      <Container>
        <h1>Sign Up</h1>
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
          }}
          validationSchema={schema}
          onSubmit={handleSubmit}
        >
          <Form>
            <label>
              <span>Name: </span>
              <Field type="text" name="name" />
              <ErrorMessage component="span" name="name" />
            </label>
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
            <Button>Sign Up</Button>
          </Form>
        </Formik>
      </Container>
    </section>
  );
}
