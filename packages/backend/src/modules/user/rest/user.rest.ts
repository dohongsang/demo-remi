import passport from "passport";
import "reflect-metadata";
import {
  CurrentUser,
  Get,
  JsonController,
  UseBefore,
} from "routing-controllers";
import { Container, Service } from "typedi";
import { Response } from "../../../core/models/response.model";
import { UserService } from "../services/user.service";
import { UserInfoResponse } from "./models/user-info/user-info.res";

@JsonController("/")
@Service()
export default class UserRestController {
  constructor(private userService: UserService) {
    this.userService = Container.get(UserService);
  }

  @Get("me")
  @UseBefore(passport.authenticate("jwt", { session: false }))
  async find(
    @CurrentUser() user: any
  ): Promise<Response<Partial<UserInfoResponse>>> {
    return Response.ok<Partial<UserInfoResponse>>(
      await this.userService.findMe(user.profile.id)
    );
  }
}
