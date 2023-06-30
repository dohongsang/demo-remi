import { Form, Formik } from "formik";
import Cookies from "js-cookie";
import * as Yup from "yup";
import { Button, Input } from "../../../../core";
import Box from "../../../../core/ui/components/box";
import { UserRegisterService } from "../../infras/services/user-register.service";

interface IUserVideoForm {}

const UserRegisterForm: React.FC<IUserVideoForm> = () => {
  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      }}
      validationSchema={Yup.object({
        firstName: Yup.string().required("Please input a first name"),
        lastName: Yup.string().required("Please input a last name"),
        email: Yup.string()
          .email("Please input a right format email")
          .required("Please input a email"),
        password: Yup.string().required("Please input a password"),
      })}
      onSubmit={(values) => {
        const userRegisterService = new UserRegisterService();
        userRegisterService.excute(values).then((res) => {
          Cookies.remove("token");
          Cookies.set("token", res?.accessToken);
          location.href = "/";
        });
      }}
    >
      {({ values, handleChange, handleBlur, handleSubmit }) => (
        <Form
          className="w-[500px] sm:w-full md:w-full border border-gray-300 relative p-10 flex flex-col gap-2"
          onSubmit={handleSubmit}
        >
          <Box as="label" className="absolute -top-[12px] bg-white">
            Register a new account
          </Box>
          <Box className="flex flex-col gap-4">
            <Input
              type="text"
              id="firstName"
              name="firstName"
              label="First Name"
              placeholder="Input your first name"
              value={values.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Input
              type="text"
              id="lastName"
              name="lastName"
              label="Last Name"
              placeholder="Input your last name"
              value={values.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Input
              type="text"
              id="email"
              name="email"
              label="Username / Email"
              placeholder="Input your email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Input
              type="password"
              id="password"
              name="password"
              label="Password"
              placeholder="Input your password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Button type="submit" variant="primary">
              Register
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => (location.href = "/")}
            >
              Back
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};
export default UserRegisterForm;
