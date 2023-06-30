import { AccountDao } from "../../../../common/dao/account.dao";
import { UserDao } from "../../../../common/dao/user.dao";
import { AuthService } from "../auth.service";
import AuthServiceMock, {
  mockUserRegister,
} from "./__mock__/auth.mock";
import UserDaoMock, { mockFindOne } from "./__mock__/user-dao.mock";
jest.mock("./__mock__/auth.service.mock");

const userDao = jest.mocked(UserDao);
const accountDao = jest.mocked(AccountDao);

beforeEach(() => {
  AuthServiceMock.mockClear();
  UserDaoMock.mockClear();
});

it("We can check if the consumer called the class constructor", () => {
  new AuthService(userDao as any, accountDao as any);
  expect(AuthService).toHaveBeenCalledTimes(1);
});

it("Test with user register function, empty data", () => {
  const authService = new AuthService(userDao as any, accountDao as any);
  const result = authService.userRegister({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
  });
  expect(mockUserRegister).toHaveBeenCalledWith(result);
});
