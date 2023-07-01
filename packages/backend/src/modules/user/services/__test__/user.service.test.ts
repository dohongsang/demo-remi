import { UserModel } from "../../models/user.model";
import { UserService } from "../user.service";

const userDao = {
  findOne: jest.fn(),
  insert: jest.fn(),
} as any;

it("UserService => Handle to test createUserProfile", async () => {
  const payload = new UserModel();
  const userService = new UserService(userDao);
  userDao.insert.mockResolvedValue();
  await expect(
    userService.createUserProfile(payload)
  ).resolves.toMatchSnapshot();
});

it("UserService => Handle to test createUserProfile", async () => {
  const userService = new UserService(userDao);
  userDao.findOne.mockResolvedValue();
  await expect(userService.findMe("id_123")).rejects.toMatchSnapshot();
});
