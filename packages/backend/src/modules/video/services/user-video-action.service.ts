import { NotFoundError } from "routing-controllers";
import { Inject, Service } from "typedi";
import { UserVideoActionDao } from "../../../common/dao/user-video-action.dao";
import { UserVideoDao } from "../../../common/dao/user-video.dao";
import { UserDao } from "../../../common/dao/user.dao";
import { UserVideoActionPublisher } from "../../../common/event/publisher/user-video-actions.publisher";
import { UserVideoActionModel } from "../models/user-video-action.model";
import { UserVideoService } from "./video.service";

@Service()
export class UserVideoActionService {
  constructor(
    @Inject() private userDao: UserDao,
    @Inject() private userVideoDao: UserVideoDao,
    @Inject() private userVideoActionDao: UserVideoActionDao,
    @Inject() private userVideoActionPublisher: UserVideoActionPublisher,
    @Inject() private userVideoService: UserVideoService
  ) {
    this.userVideoService.onSubcriber();
  }

  async likeVideoByUser(id: string, userId: string) {
    const userVideoActionId = `${id}_${userId}`;
    const [daoUser, daoUserVideo, daoUserVideoAction] = await Promise.all([
      this.userDao.findOne({ id: userId }),
      this.userVideoDao.findOne({ id }),
      this.userVideoActionDao.findOne({ id: userVideoActionId }),
    ]);

    if (!daoUserVideo || !daoUser) {
      throw new NotFoundError();
    }

    const videoModel = new UserVideoActionModel({
      isLiked: true,
      isDisliked: false,
      updatedBy: userId,
    });

    const userActionUpdated = await this.userVideoActionDao.update(videoModel, {
      id: userVideoActionId,
    });

    if (userActionUpdated.affected === 0) {
      this.userVideoActionPublisher.notifyUserLikeVideo({ id });
      await this.userVideoActionDao.insert(
        new UserVideoActionModel({
          id: userVideoActionId,
          isLiked: true,
          isDisliked: false,
          createdBy: userId,
        })
      );
      return true;
    }

    if (!daoUserVideoAction.is_liked) {
      this.userVideoActionPublisher.notifyUserLikeVideo({ id });
      if (daoUserVideoAction.is_disliked) {
        this.userVideoActionPublisher.notifyUserUnDislikeVideo({ id });
      }
    }

    return true;
  }

  async dislikeVideoByUser(id: string, userId: string) {
    const userVideoActionId = `${id}_${userId}`;
    const [daoUser, daoUserVideo, daoUserVideoAction] = await Promise.all([
      this.userDao.findOne({ id: userId }),
      this.userVideoDao.findOne({ id }),
      this.userVideoActionDao.findOne({ id: userVideoActionId }),
    ]);

    if (!daoUserVideo || !daoUser) throw new NotFoundError();

    const videoModel = new UserVideoActionModel({
      isLiked: false,
      isDisliked: true,
      updatedBy: userId,
    });

    const userActionUpdated = await this.userVideoActionDao.update(videoModel, {
      id: userVideoActionId,
    });

    if (userActionUpdated.affected === 0) {
      this.userVideoActionPublisher.notifyUserDislikeVideo({ id });
      await this.userVideoActionDao.insert(
        new UserVideoActionModel({
          id: userVideoActionId,
          isLiked: false,
          isDisliked: true,
          createdBy: userId,
        })
      );
      return true;
    }

    if (!daoUserVideoAction.is_disliked) {
      this.userVideoActionPublisher.notifyUserDislikeVideo({ id });
      if (daoUserVideoAction.is_liked) {
        this.userVideoActionPublisher.notifyUserUnLikeVideo({ id });
      }
    }
    return true;
  }

  async unlikeVideoByUser(id: string, userId: string) {
    const userVideoActionId = `${id}_${userId}`;
    const [daoUser, daoUserVideo, daoUserVideoAction] = await Promise.all([
      this.userDao.findOne({ id: userId }),
      this.userVideoDao.findOne({ id }),
      this.userVideoActionDao.findOne({ id: userVideoActionId }),
    ]);

    if (!daoUserVideo || !daoUser || !daoUserVideoAction) {
      throw new NotFoundError();
    }

    await this.userVideoActionDao.update(
      new UserVideoActionModel({
        isLiked: false,
        updatedBy: userId,
      }),
      {
        id: userVideoActionId,
      }
    );

    this.userVideoActionPublisher.notifyUserUnLikeVideo({ id });
    return true;
  }

  async unDislikeVideoByUser(id: string, userId: string) {
    const userVideoActionId = `${id}_${userId}`;
    const [daoUser, daoUserVideo, daoUserVideoAction] = await Promise.all([
      this.userDao.findOne({ id: userId }),
      this.userVideoDao.findOne({ id }),
      this.userVideoActionDao.findOne({ id: userVideoActionId }),
    ]);

    if (!daoUserVideo || !daoUser || !daoUserVideoAction) {
      throw new NotFoundError();
    }

    await this.userVideoActionDao.update(
      new UserVideoActionModel({
        isDisliked: false,
        updatedBy: userId,
      }),
      {
        id: userVideoActionId,
      }
    );

    this.userVideoActionPublisher.notifyUserUnDislikeVideo({ id });
    return true;
  }
}
