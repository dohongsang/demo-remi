import { PropsWithChildren } from "react";
import Box from "../box/box";
import css from "./button.module.css";

interface ISButtonProps extends PropsWithChildren {
  type?: "submit" | "reset" | "button";
  variant?:
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger"
    | "info"
    | "disabled";
  disabled?: boolean;
}

const SButton: React.FC<ISButtonProps> = ({
  type = "submit",
  variant = "primary",
  children,
}) => {
  return (
    <Box
      as="button"
      type={type}
      className={`${css.button_container} ${
        css[`button_container--${variant}`]
      }`}
    >
      {children}
    </Box>
  );
};

export default SButton;
