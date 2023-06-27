import { UserVideoService } from "../../../../shared/services/user-video.service";
import { IUserShareVideoRequest } from "../models/user-video";

export class UserVideoUploadService {
  private service: UserVideoService;

  constructor() {
    this.service = new UserVideoService();
  }

  async excute(req: IUserShareVideoRequest): Promise<boolean> {
    const { data } = await this.service.shareYoutubeVideo<
      IUserShareVideoRequest,
      boolean
    >(req);
    return data;
  }
}
