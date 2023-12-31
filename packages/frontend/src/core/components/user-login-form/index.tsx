import { Form, Formik } from "formik";
import Cookies from "js-cookie";
import { useState } from "react";
import * as Yup from "yup";
import { Button, Input } from "../..";
import { UserLoginService } from "../../infras/services/user-login.service";
import Box from "../../ui/components/box";

interface IUserLoginForm {}

const UserLoginForm: React.FC<IUserLoginForm> = () => {
  const [error, setError] = useState<string>();
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
          const service = new UserLoginService();
          service
            .excute(values)
            .then((res) => {
              Cookies.set("token", res?.data?.accessToken);
              location.href = `/`;
            })
            .catch(() => {
              setError("Username / Password is not match");
            });
        } else {
          location.href = `/register`;
        }
      }}
    >
      {({ values, handleChange, handleBlur, handleSubmit }) => (
        <Box className="flex flex-col">
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
          <Box as="label" className="text-red-500">
            {error}
          </Box>
        </Box>
      )}
    </Formik>
  );
};
export default UserLoginForm;
