import Container from "typedi";
import { Password } from "../../core";
import entities from "../../core/db/entities";
import "../../core/db/entities/user-account";
import "../../core/db/entities/user-profile";
import AuthRestController from "../auth/rest/auth.rest";
import { UserLoginRequest } from "../auth/rest/models/user-login/user-login.req";
import { UserRegisterRequest } from "../auth/rest/models/user-register/user-register.req";
import { AuthService } from "../auth/services/auth.service";
import { Database } from "../../core/db";

describe("Test Sign Up / Sign In Integration", () => {
  const database: Database = new Database();

  beforeAll(async () => {
    await database.init();
  });

  afterAll(async () => {
    await database.destroy();
  });

  it("User will sign in and login with this account", async () => {
    // Sign up with new account
    const password = new Password();
    const authService = Container.get(AuthService);
    const controller = new AuthRestController(authService);

    const reqRegister: UserRegisterRequest = {
      email: "integration-test@gmail.com",
      password: password.encryptPassword(
        "123123",
        "ZGVtby1yZW1pLXNvdXJjZS1jb2Rl"
      ),
      firstName: "Integration",
      lastName: "Test",
    };
    const resRegister = await controller.register(reqRegister);
    expect(resRegister.data.id).toBeTruthy();

    // Sign in with new above account
    const reqLogin: UserLoginRequest = {
      username: "integration-test@gmail.com",
      password: password.encryptPassword(
        "123123",
        "ZGVtby1yZW1pLXNvdXJjZS1jb2Rl"
      ),
    };
    const result = await controller.login(reqLogin);
    expect(result.data.id).toBeTruthy();
  });
});
