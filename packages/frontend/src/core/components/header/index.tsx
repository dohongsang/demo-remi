import { BiHome } from "react-icons/bi/index";
import UserInfo from "../../models/user-info";
import Box from "../../ui/components/box";
import { usePageContext } from "../../utils/usePageContext";
import UserAuthorized from "../user-authorized";
import UserLoginForm from "../user-login-form";
import css from "./header.module.css";

interface IBHeaderProps {
  user?: UserInfo;
}

const BHeader: React.FC<IBHeaderProps> = ({ user }) => {
  const { pageProps } = usePageContext();
  return (
    <Box className={css.header_container}>
      <Box
        className={`${css.header_container__left} cursor-pointer`}
        onClick={() => (location.href = "/")}
      >
        <BiHome size={40} />
        <Box as="h1">Funny Movies</Box>
      </Box>
      {!pageProps?.isRegister ? (
        <Box className={css.header_container__right}>
          {user ? <UserAuthorized {...user} /> : <UserLoginForm />}
        </Box>
      ) : null}
    </Box>
  );
};

export default BHeader;
