import { google } from "googleapis";
import { Inject, Service } from "typedi";
import { UserVideoDao } from "../../../common/dao/user-video.dao";
import { UserVideoModel } from "../models/user-video.model";
import { CreateVideoRequest } from "../rest/models/create-video/create-video.req";

@Service()
export class UserVideoService {
  constructor(@Inject() private readonly userVideoDao: UserVideoDao) {}

  async shareVideo(body: CreateVideoRequest) {
    const youtubeId = this.getYoutubeId(body.link);

    if (youtubeId) {
      const youtube = google.youtube({
        version: "v3",
        auth: "AIzaSyDVGPPcou6miUOrdLu7ML0VCXzd4KI9pjk",
      });

      const video = await youtube.videos
        .list({
          part: ["snippet"],
          id: [youtubeId],
        })
        .then((res: any) => {
          return res.data.items.map((item: any) => ({
            title: item.snippet.title,
            description: item.snippet.description,
          }))?.[0];
        });

      if (video) {
        return await this.userVideoDao.insert(
          new UserVideoModel({
            title: video.title,
            description: video.description,
          })
        );
      }
    }
    return false;
  }

  getYoutubeId(url: string) {
    const regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[7].length == 11 ? match[7] : false;
  }
}
