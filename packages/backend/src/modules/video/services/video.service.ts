import { google } from "googleapis";
import { keyBy } from "lodash";
import { Inject, Service } from "typedi";
import { In } from "typeorm";
import { UserVideoActionDao } from "../../../common/dao/user-video-action.dao";
import { UserVideoDao } from "../../../common/dao/user-video.dao";
import { UserVideoActionPublisher } from "../../../common/event/video-actions.publisher";
import { UserProfileEntity } from "../../../core/db/entities/user-profile";
import { UserVideoModel } from "../models/user-video.model";
import { CreateVideoRequest } from "../rest/models/create-video/create-video.req";

@Service()
export class UserVideoService {
  constructor(
    @Inject() private readonly userVideoDao: UserVideoDao,
    @Inject() private readonly userVideoActionDao: UserVideoActionDao,
    @Inject()
    private readonly userVideoActionSubcriber: UserVideoActionPublisher
  ) {}

  onSubcriber() {
    this.userVideoActionSubcriber.onMessageUserDislikeVideo((message) =>
      this.onMessageUserDislikeVideo(message)
    );
    this.userVideoActionSubcriber.onMessageUserLikeVideo((message) =>
      this.onMessageUserLikeVideo(message)
    );
    this.userVideoActionSubcriber.onMessageUserUnDislikeVideo((message) =>
      this.onMessageUserUnDislikeVideo(message)
    );
    this.userVideoActionSubcriber.onMessageUserUnLikeVideo((message) =>
      this.onMessageUserUnLikeVideo(message)
    );
  }

  async onMessageUserLikeVideo({ id }: any) {
    const daoUserVideo = await this.userVideoDao.findOne({ id });
    if (daoUserVideo) {
      return await this.userVideoDao.update(
        new UserVideoModel({
          id,
          numberOfLike: daoUserVideo.number_of_like + 1,
        })
      );
    }
  }

  async onMessageUserDislikeVideo({ id }: any) {
    const daoUserVideo = await this.userVideoDao.findOne({ id });
    if (daoUserVideo) {
      return await this.userVideoDao.update(
        new UserVideoModel({
          id,
          numberOfDislike: daoUserVideo.number_of_dislike + 1,
        })
      );
    }
  }

  async onMessageUserUnLikeVideo({ id }: any) {
    const daoUserVideo = await this.userVideoDao.findOne({ id });
    if (daoUserVideo) {
      return await this.userVideoDao.update(
        new UserVideoModel({
          id,
          numberOfLike: daoUserVideo.number_of_like - 1,
        })
      );
    }
  }

  async onMessageUserUnDislikeVideo({ id }: any) {
    const daoUserVideo = await this.userVideoDao.findOne({ id });
    if (daoUserVideo) {
      return await this.userVideoDao.update(
        new UserVideoModel({
          id,
          numberOfDislike: daoUserVideo.number_of_dislike - 1,
        })
      );
    }
  }

  async shareVideo(body: CreateVideoRequest, user: UserProfileEntity) {
    const youtubeId = this.getYoutubeId(body.link);

    if (youtubeId) {
      const youtube = google.youtube({
        version: "v3",
        auth: process.env.GOOGLE_API_KEY,
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
        const userVideoCreated = await this.userVideoDao.insert(
          new UserVideoModel({
            title: video.title,
            description: video.description,
            link: body.link,
            numberOfDislike: 0,
            numberOfLike: 0,
            user,
          })
        );
        return UserVideoModel.mappingToDomain(userVideoCreated);
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

  async find(user: UserProfileEntity): Promise<UserVideoModel[]> {
    const result = await this.userVideoDao.find(undefined, { user: true });
    const ids = result.map((item: any) => `${item.id}_${user.id}`);
    const userVideoActions = await this.userVideoActionDao
      .find({ id: In(ids) })
      .then((res) => keyBy(res, "id"));

    return result.map((item: any) => {
      const action = userVideoActions[`${item.id}_${user.id}`];
      return UserVideoModel.mappingToDomain(
        item,
        action?.is_liked,
        action?.is_disliked
      );
    });
  }
}
