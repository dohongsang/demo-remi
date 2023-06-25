import passport from "passport";
import {
  Body,
  CurrentUser,
  JsonController,
  Param,
  Post,
  UseBefore,
} from "routing-controllers";
import Container, { Service } from "typedi";
import { Response } from "../../../core/models/response.model";
import { UserVideoActionService } from "../services/user-video-action.service";
import { UserVideoService } from "../services/video.service";
import { CreateVideoRequest } from "./models/create-video/create-video.req";

@JsonController("/video")
@Service()
export default class UserVideoController {
  constructor(
    private readonly userVideoService: UserVideoService,
    private readonly userVideoActionService: UserVideoActionService
  ) {
    this.userVideoService = Container.get(UserVideoService);
    this.userVideoActionService = Container.get(UserVideoActionService);
  }

  @Post("")
  @UseBefore(passport.authenticate("jwt", { session: false }))
  async create(
    @Body() body: CreateVideoRequest,
    @CurrentUser() user: any
  ): Promise<Response<any>> {
    return Response.ok<any>(await this.userVideoService.shareVideo(body));
  }

  @Post("/:id/like")
  @UseBefore(passport.authenticate("jwt", { session: false }))
  async likeVideo(
    @Param("id") id: string,
    @CurrentUser() user: any
  ): Promise<Response<any>> {
    return Response.ok<any>(
      await this.userVideoActionService.likeVideoByUser(id, user.profile.id)
    );
  }

  @Post("/:id/dislike")
  @UseBefore(passport.authenticate("jwt", { session: false }))
  async dislikeVideo(
    @Param("id") id: string,
    @CurrentUser() user: any
  ): Promise<Response<any>> {
    return Response.ok<any>(
      await this.userVideoActionService.dislikeVideoByUser(id, user.profile.id)
    );
  }
}
