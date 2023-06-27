import passport from "passport";
import {
  Body,
  CurrentUser,
  Get,
  JsonController,
  Param,
  Post,
  UseBefore,
} from "routing-controllers";
import Container, { Service } from "typedi";
import { Response } from "../../../core/models/response.model";
import { UserVideoModel } from "../models/user-video.model";
import { UserVideoActionService } from "../services/user-video-action.service";
import { UserVideoService } from "../services/video.service";
import { CreateVideoRequest } from "./models/create-video/create-video.req";

@JsonController("/")
@Service()
export default class UserVideoController {
  constructor(
    private readonly userVideoService: UserVideoService,
    private readonly userVideoActionService: UserVideoActionService
  ) {
    this.userVideoService = Container.get(UserVideoService);
    this.userVideoActionService = Container.get(UserVideoActionService);
  }

  @Get("videos")
  @UseBefore(passport.authenticate("jwt", { session: false }))
  async find(@CurrentUser() user: any): Promise<Response<UserVideoModel[]>> {
    return Response.ok<UserVideoModel[]>(
      await this.userVideoService.find(user.profile)
    );
  }

  @Post("videos")
  @UseBefore(passport.authenticate("jwt", { session: false }))
  async create(
    @Body() body: CreateVideoRequest,
    @CurrentUser() user: any
  ): Promise<Response<any>> {
    return Response.ok<any>(
      await this.userVideoService.shareVideo(body, user.profile)
    );
  }

  @Post("videos/:id/like")
  @UseBefore(passport.authenticate("jwt", { session: false }))
  async likeVideo(
    @Param("id") id: string,
    @CurrentUser() user: any
  ): Promise<Response<any>> {
    return Response.ok<any>(
      await this.userVideoActionService.likeVideoByUser(id, user.profile.id)
    );
  }

  @Post("videos/:id/dislike")
  @UseBefore(passport.authenticate("jwt", { session: false }))
  async dislikeVideo(
    @Param("id") id: string,
    @CurrentUser() user: any
  ): Promise<Response<any>> {
    return Response.ok<any>(
      await this.userVideoActionService.dislikeVideoByUser(id, user.profile.id)
    );
  }

  @Post("videos/:id/unlike")
  @UseBefore(passport.authenticate("jwt", { session: false }))
  async unlikeVideo(
    @Param("id") id: string,
    @CurrentUser() user: any
  ): Promise<Response<any>> {
    return Response.ok<any>(
      await this.userVideoActionService.unlikeVideoByUser(id, user.profile.id)
    );
  }

  @Post("videos/:id/undislike")
  @UseBefore(passport.authenticate("jwt", { session: false }))
  async unDislikeVideo(
    @Param("id") id: string,
    @CurrentUser() user: any
  ): Promise<Response<any>> {
    return Response.ok<any>(
      await this.userVideoActionService.unDislikeVideoByUser(
        id,
        user.profile.id
      )
    );
  }
}
