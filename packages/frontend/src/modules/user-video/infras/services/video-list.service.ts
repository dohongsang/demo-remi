import { ServiceResult } from "../../../../core/rest/models/service-result";
import UserVideo from "../../../../shared/models/user-video";
import { UserVideoService } from "../../../../shared/services/user-video.service";

export default class VideoListService {
  private service: UserVideoService;

  constructor() {
    this.service = new UserVideoService();
  }

  async excute(): Promise<ServiceResult<UserVideo[]>> {
    return await this.service.getYoutubeVideos();
  }
}
