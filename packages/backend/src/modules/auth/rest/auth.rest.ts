import "reflect-metadata";
import { Body, JsonController, Post } from "routing-controllers";
import { Container, Service } from "typedi";
import { Response } from "../../../core/models/response.model";
import { AuthService } from "../services/auth.service";
import { UserLoginRequest } from "./models/user-login/user-login.req";
import { UserLoginResponse } from "./models/user-login/user-login.res";
import { UserRegisterRequest } from "./models/user-register/user-register.req";
import { UserRegisterResponse } from "./models/user-register/user-register.res";

@JsonController("/")
@Service()
export default class AuthRestController {
  constructor(private authService: AuthService) {
    this.authService = Container.get(AuthService);
  }

  @Post("register")
  async register(
    @Body() body: UserRegisterRequest
  ): Promise<Response<Partial<UserRegisterResponse>>> {
    return Response.ok<Partial<UserRegisterResponse>>(
      await this.authService.userRegister(body)
    );
  }

  @Post("login")
  async login(
    @Body() body: UserLoginRequest
  ): Promise<Response<Partial<UserLoginResponse>>> {
    return Response.ok<Partial<UserLoginResponse>>(
      await this.authService.userLogin(body)
    );
  }
}
