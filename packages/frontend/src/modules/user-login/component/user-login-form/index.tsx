import { Form, Formik } from "formik";
import Yup from "yup";
import { Input } from "../../../../core";
import { IUserLoginProps } from "../../pages/index.server";

interface IUserLoginForm extends IUserLoginProps {}

const UserLoginForm: React.FC<IUserLoginForm> = (props) => {
  return (
    <Formik
      initialValues={{
        username: props.username ?? "",
        password: props.password ?? "",
      }}
      validationSchema={Yup.object({
        username: Yup.string()
          .max(15, "Must be 15 characters or less")
          .required("Required"),
        password: Yup.string()
          .max(20, "Must be 20 characters or less")
          .required("Required"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ values, handleSubmit, handleChange, handleBlur, isSubmitting }) => {
        return (
          <Form className="w-[400px] flex flex-col gap-4 border-l-[1px] p-4">
            <Input
              id="username"
              name="username"
              type="text"
              label="Email / Username"
              placeholder="Input your username"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Input
              id="password"
              name="password"
              type="text"
              label="Password"
              placeholder="Input your password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <button
              disabled={isSubmitting}
              onClick={() => {
                console.log("OnSubmit");
                handleSubmit();
              }}
            >
              Submit
            </button>
          </Form>
        );
      }}
    </Formik>
  );
};
export default UserLoginForm;
