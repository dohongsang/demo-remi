import Cookies from "js-cookie";
import { Box, Button } from "../../ui";

interface IUserAuthorizedForm {
  email: string;
}

const UserAuthorized: React.FC<IUserAuthorizedForm> = ({ email }) => {
  return (
    <Box className="flex md:flex-col sm:flex-col gap-2 items-center">
      <Box as="label">Welcome {email}</Box>
      <Box className="flex">
        <Button
          type="button"
          variant="warning"
          onClick={() => (location.href = `/video`)}
        >
          Share a movie
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={() => {
            Cookies.remove("token");
            location.href = "/";
          }}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
};
export default UserAuthorized;
