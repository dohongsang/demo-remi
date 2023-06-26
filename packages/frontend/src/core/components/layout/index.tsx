import { PropsWithChildren } from "react";
import Box from "../box/box";
import css from "./layout.module.css";

interface ISLayoutProps extends PropsWithChildren {}

const SLayout: React.FC<ISLayoutProps> = ({ children }) => {
  return (
    <Box className={css.layout_container}>
      <Box className={css.layout_container__wrapper}>{children}</Box>
    </Box>
  );
};

export default SLayout;
