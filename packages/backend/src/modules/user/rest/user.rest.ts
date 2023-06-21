import "reflect-metadata";
import { Body, Controller, Post } from "routing-controllers";
import { Container, Service } from "typedi";
import { Response } from "../../../core/models/response.model";
import { UserService } from "../services/user.service";
import { UserLoginRequest } from "./models/user-login/user-login.req";
import { UserLoginResponse } from "./models/user-login/user-login.res";

@Service()
@Controller("/user")
export default class UserRestController {
  constructor(private userService: UserService) {
    this.userService = Container.get(UserService);
  }

  @Post("/login")
  async login(
    @Body() body: UserLoginRequest
  ): Promise<Response<Partial<UserLoginResponse>>> {
    return Response.ok<Partial<UserLoginResponse>>(
      await this.userService.userLogin()
    );
  }
}
