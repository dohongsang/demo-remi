import { ForbiddenError, HttpError } from "routing-controllers";
import { Password } from "../../../../core";
import { UserLoginRequest } from "../../rest/models/user-login/user-login.req";
import { UserRegisterRequest } from "../../rest/models/user-register/user-register.req";
import { AuthService } from "../auth.service";

jest.mock("../../../../core/security/password.security");

const userDao = {
  findOne: jest.fn().mockResolvedValueOnce,
} as any;
const accountDao = {
  findOne: jest.fn(),
  transaction: jest.fn(),
} as any;

const username = "dohongsang@gmail.com";
const password = "1qazxsw2";

it("User register a new account, but system throw error because not insert db", async () => {
  accountDao.findOne.mockResolvedValue();
  const authService = new AuthService(userDao, accountDao);
  await expect(
    authService.userRegister({
      email: "",
      firstName: "",
      lastName: "",
      password: "",
    })
  ).rejects.toThrowError(HttpError);
});

it("User register a new account, but a account existed", async () => {
  accountDao.findOne.mockResolvedValue({
    email: username,
  });

  const authService = new AuthService(userDao, accountDao);
  await expect(
    authService.userRegister({
      email: username,
    } as any)
  ).rejects.toThrowError(ForbiddenError);
});

it("User register a new account, sucessfully", async () => {
  const passObject = new Password();
  const authService = new AuthService(userDao, accountDao);
  const encryptPassword = passObject.encryptPasswordFromClient(password);
  const userRegisterRequest: UserRegisterRequest = {
    email: username,
    firstName: "Đỗ Hồng",
    lastName: "Sang",
    password: encryptPassword,
  };

  accountDao.findOne.mockResolvedValueOnce();
  accountDao.findOne.mockResolvedValueOnce({
    id: "uuid",
    email: username,
  });
  await jest.mocked(accountDao.transaction).mockImplementation(() => {
    return;
  });

  jest
    .spyOn(passObject, "decryptPasswordFromClient")
    .mockImplementation(() => encryptPassword);
  await expect(authService.userRegister(userRegisterRequest)).toMatchSnapshot();
});

it("User login, but account is not existed", async () => {
  const passObject = new Password();
  const encryptPassword = passObject.encryptPasswordFromClient(password);
  accountDao.findOne.mockResolvedValue();

  const request: UserLoginRequest = {
    username: username,
    password: encryptPassword,
  };
  const authService = new AuthService(userDao, accountDao);
  await expect(authService.userLogin(request)).rejects.toThrowError(HttpError);
});

it("User login, but password is not match", async () => {
  const fakePass = "1qazxsw3";
  const passObject = new Password();
  const encryptPassword = passObject.encryptPasswordFromClient(password);
  const request: UserLoginRequest = {
    username: username,
    password: encryptPassword,
  };
  accountDao.findOne.mockResolvedValue({
    email: username,
  });

  jest.spyOn(passObject, "decryptPasswordFromClient").mockReturnValue(fakePass);
  jest.spyOn(passObject, "decryptPassword").mockReturnValue(password);
  const authService = new AuthService(userDao, accountDao);
  await expect(authService.userLogin(request));
});

it("User login, it successful", async () => {
  const passObject = new Password();
  const encryptPassword = passObject.encryptPasswordFromClient(password);
  const request: UserLoginRequest = {
    username: username,
    password: encryptPassword,
  };

  const hashKey = passObject.generateHashKey();
  const hashPassword = passObject.encryptPassword(password, hashKey);
  accountDao.findOne.mockResolvedValue({
    email: username,
    hash_key: hashKey,
    hash_password: hashPassword,
  });

  const authService = new AuthService(userDao, accountDao);
  await expect(authService.userLogin(request));
});
