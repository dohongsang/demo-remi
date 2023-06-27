import { ServiceResult } from "../../../../core/rest/models/service-result";
import { UserVideoService } from "../../../../shared/services/user-video.service";
import { UserActionVideoRequest } from "../models/user-action-video";

export default class UserActionVideoService {
  private service: UserVideoService;

  constructor() {
    this.service = new UserVideoService();
  }

  async userLikeVideo(
    req: UserActionVideoRequest
  ): Promise<ServiceResult<boolean>> {
    return await this.service.userLikeVideo<UserActionVideoRequest, boolean>(
      req
    );
  }

  async userUnLikeVideo(
    req: UserActionVideoRequest
  ): Promise<ServiceResult<boolean>> {
    return await this.service.userUnLikeVideo<UserActionVideoRequest, boolean>(
      req
    );
  }

  async userDislikeVideo(
    req: UserActionVideoRequest
  ): Promise<ServiceResult<boolean>> {
    return await this.service.userDislikeVideo<UserActionVideoRequest, boolean>(
      req
    );
  }

  async userUnDislikeVideo(
    req: UserActionVideoRequest
  ): Promise<ServiceResult<boolean>> {
    return await this.service.userUnDislikeVideo<
      UserActionVideoRequest,
      boolean
    >(req);
  }
}
