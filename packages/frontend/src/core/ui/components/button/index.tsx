import { PropsWithChildren } from "react";
import Box from "../box";
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
  onClick?: () => void;
}

const SButton: React.FC<ISButtonProps> = ({
  type = "submit",
  variant = "primary",
  children,
  onClick,
}) => {
  return (
    <Box
      as="button"
      type={type}
      className={`${css.button_container} ${
        css[`button_container--${variant}`]
      }`}
      onClick={onClick}
    >
      {children}
    </Box>
  );
};

export default SButton;
