import passport from "passport";
import {
  Body,
  CurrentUser,
  JsonController,
  Post,
  UseBefore,
} from "routing-controllers";
import Container, { Service } from "typedi";
import { Response } from "../../../core/models/response.model";
import { UserVideoService } from "../services/video.service";
import { CreateVideoRequest } from "./models/create-video/create-video.req";

@JsonController("/video")
@Service()
export default class UserVideoController {
  constructor(private readonly userVideoService: UserVideoService) {
    this.userVideoService = Container.get(UserVideoService);
  }

  @Post("")
  @UseBefore(passport.authenticate("jwt", { session: false }))
  async create(
    @Body() body: CreateVideoRequest,
    @CurrentUser() user: any
  ): Promise<Response<any>> {
    return Response.ok<any>(await this.userVideoService.shareVideo(body));
  }
}
