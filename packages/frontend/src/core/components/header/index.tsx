import { BiHome } from "react-icons/bi";
import Box from "../box/box";
import css from "./header.module.css";

interface IBHeaderProps {}

const BHeader: React.FC<IBHeaderProps> = () => {
  return (
    <Box className={css.header_container}>
      <Box className={css.header_container__left}>
        <BiHome size={50} />
        <Box as="h1">Funny Movies</Box>
      </Box>
      <Box className={css.header_container__right}></Box>
    </Box>
  );
};

export default BHeader;
