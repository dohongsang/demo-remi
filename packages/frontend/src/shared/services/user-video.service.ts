import { ApiService } from "../../core/rest";
import { ServiceResult } from "../../core/rest/models/service-result";

export class UserVideoService {
  async getYoutubeVideos<REQ = any, RES = any>(): Promise<ServiceResult<RES>> {
    return await ApiService.api.get<REQ, RES>({
      url: `/videos`,
    });
  }

  async shareYoutubeVideo<REQ = any, RES = any>(
    req: REQ
  ): Promise<ServiceResult<RES>> {
    return await ApiService.api.post<REQ, RES>({
      url: `/videos`,
      params: req,
    });
  }

  async userLikeVideo<REQ = any, RES = any>(
    req: REQ
  ): Promise<ServiceResult<RES>> {
    return await ApiService.api.post<REQ, RES>({
      url: `/videos/${(req as any).id}/like`,
    });
  }

  async userDislikeVideo<REQ = any, RES = any>(
    req: REQ
  ): Promise<ServiceResult<RES>> {
    return await ApiService.api.post<REQ, RES>({
      url: `/videos/${(req as any).id}/dislike`,
    });
  }

  async userUnLikeVideo<REQ = any, RES = any>(
    req: REQ
  ): Promise<ServiceResult<RES>> {
    return await ApiService.api.post<REQ, RES>({
      url: `/videos/${(req as any).id}/unlike`,
    });
  }

  async userUnDislikeVideo<REQ = any, RES = any>(
    req: REQ
  ): Promise<ServiceResult<RES>> {
    return await ApiService.api.post<REQ, RES>({
      url: `/videos/${(req as any).id}/undislike`,
    });
  }
}
