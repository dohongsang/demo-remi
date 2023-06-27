import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Button, Input } from "../..";

interface IUserLoginForm {}

const UserLoginForm: React.FC<IUserLoginForm> = () => {
  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
      }}
      validationSchema={Yup.object({
        username: Yup.string().email("Please input a right format email"),
        password: Yup.string().max(20, "Must be 20 characters or less"),
      })}
      onSubmit={(values) => {
        if (values?.username && values?.password) {
          location.href = `/login?username=${values.username}&password=${values.password}`;
        } else {
          location.href = `/register`;
        }
      }}
    >
      {({ values, handleChange, handleBlur, handleSubmit }) => (
        <Form className="flex items-center gap-2" onSubmit={handleSubmit}>
          <Input
            id="new-username"
            name="username"
            type="text"
            placeholder="Input your username"
            autoComplete="username"
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Input
            id="new-password"
            name="password"
            type="password"
            placeholder="Input your password"
            autoComplete="current-password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Button type="submit" variant="primary">
            Login / Register
          </Button>
        </Form>
      )}
    </Formik>
  );
};
export default UserLoginForm;