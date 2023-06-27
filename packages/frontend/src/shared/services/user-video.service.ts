import { ApiService } from "../../core/rest";
import { ServiceResult } from "../../core/rest/models/service-result";
import { IUserDislikeVideoRequest } from "../interface/user-dislike-video";
import { IUserLikeVideoRequest } from "../interface/user-like-video";
import {
  IUserShareVideoRequest,
  IUserShareVideoResponse,
} from "../interface/user-share-video";
import UserVideo from "../models/user-video";

export class UserVideoService {
  async getYoutubeVideos(): Promise<ServiceResult<UserVideo[]>> {
    return await ApiService.api.get<IUserShareVideoRequest, UserVideo[]>({
      url: `/videos`,
    });
  }

  async shareYoutubeVideo(
    req: IUserShareVideoRequest
  ): Promise<ServiceResult<IUserShareVideoResponse>> {
    return await ApiService.api.post<
      IUserShareVideoRequest,
      IUserShareVideoResponse
    >({
      url: `/video`,
      params: req,
    });
  }

  async userLikeVideo(
    req: IUserLikeVideoRequest
  ): Promise<ServiceResult<boolean>> {
    return await ApiService.api.post<IUserLikeVideoRequest, boolean>({
      url: `/${req.id}/like`,
      params: req,
    });
  }

  async userDislikeVideo(
    req: IUserDislikeVideoRequest
  ): Promise<ServiceResult<boolean>> {
    return await ApiService.api.post<IUserDislikeVideoRequest, boolean>({
      url: `/${req.id}/dislike`,
      params: req,
    });
  }
}
