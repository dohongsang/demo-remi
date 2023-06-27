import { useField } from "formik";
import Box from "../box";
import css from "./input.module.css";

const Input: React.FC<any> = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <Box className={css.input_container}>
      {label ? (
        <Box as="label" className={css["input_container--label"]}>
          {label}
        </Box>
      ) : null}
      <Box className={css["input_container--wrapper"]}>
        <input
          {...field}
          {...props}
          className={css["input_container--wrapper__input"]}
        />
      </Box>
      {meta.touched && meta.error ? (
        <Box as="small" className={css["input_container--validation_error"]}>
          {meta.error}
        </Box>
      ) : null}
    </Box>
  );
};

export default Input;
