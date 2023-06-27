import { Box, Button } from "../../ui";

interface IUserAuthorizedForm {
  email: string;
}

const UserAuthorized: React.FC<IUserAuthorizedForm> = ({ email }) => {
  return (
    <Box className="flex gap-2 items-center">
      <Box as="label">Welcome {email}</Box>
      <Button type="button" variant="warning">Share a movie</Button>
      <Button type="button" variant="secondary">Logout</Button>
    </Box>
  );
};
export default UserAuthorized;
