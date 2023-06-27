import { BiHome } from "react-icons/bi";
import UserInfo from "../../models/user-info";
import Box from "../../ui/components/box";
import UserAuthorized from "../user-authorized";
import UserLoginForm from "../user-login-form";
import css from "./header.module.css";

interface IBHeaderProps {
  user?: UserInfo;
}

const BHeader: React.FC<IBHeaderProps> = ({ user }) => {
  return (
    <Box className={css.header_container}>
      <Box className={css.header_container__left}>
        <BiHome size={40} />
        <Box as="h1">Funny Movies</Box>
      </Box>
      <Box className={css.header_container__right}>
        {user ? <UserAuthorized {...user} /> : <UserLoginForm />}
      </Box>
    </Box>
  );
};

export default BHeader;
