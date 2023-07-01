import { NotFoundError } from "routing-controllers";
import { v4 } from "uuid";
import { UserProfileEntity } from "../../../../core/db/entities/user-profile";
import { UserVideoEntity } from "../../../../core/db/entities/user-video";
import { UserVideoActionService } from "../user-video-action.service";
import { UserVideoActionEntity } from "../../../../core/db/entities/user-video-action";

const userDao = {
  findOne: jest.fn(),
} as any;
const userVideoDao = {
  findOne: jest.fn(),
} as any;
const userVideoActionDao = {
  findOne: jest.fn(),
  update: jest.fn(),
  insert: jest.fn(),
} as any;
const userVideoActionPublisher = {
  findOne: jest.fn(),
  notifyUserLikeVideo: jest.fn(),
  notifyUserUnDislikeVideo: jest.fn(),
  notifyUserUnLikeVideo: jest.fn(),
  notifyUserDislikeVideo: jest.fn(),
} as any;
const userVideoService = {
  findOne: jest.fn(),
  onSubcriber: jest.fn(),
} as any;

const id = v4();
const userId = v4();

it("UserService => trigger likeVideoByUser, throw NotFoundError daoUserVideo", async () => {
  const service = new UserVideoActionService(
    userDao,
    userVideoDao,
    userVideoActionDao,
    userVideoActionPublisher,
    userVideoService
  );
  await expect(service.likeVideoByUser(id, userId)).rejects.toThrowError(
    NotFoundError
  );
});

it("UserService => trigger likeVideoByUser, throw NotFoundError daoUser", async () => {
  const service = new UserVideoActionService(
    userDao,
    userVideoDao,
    userVideoActionDao,
    userVideoActionPublisher,
    userVideoService
  );
  userVideoDao.findOne.mockResolvedValueOnce(new UserVideoEntity());
  await expect(service.likeVideoByUser(id, userId)).rejects.toThrowError(
    NotFoundError
  );
});

it("UserService => trigger likeVideoByUser, found userDao, userVideoDao, updated userVideoActionDao and notify like", async () => {
  const service = new UserVideoActionService(
    userDao,
    userVideoDao,
    userVideoActionDao,
    userVideoActionPublisher,
    userVideoService
  );
  userVideoActionDao.findOne.mockResolvedValueOnce({
    is_liked: false,
    is_disliked: false,
  });
  userVideoActionDao.update.mockResolvedValueOnce({ affected: 1 });
  userDao.findOne.mockResolvedValueOnce(new UserProfileEntity());
  userVideoDao.findOne.mockResolvedValueOnce(new UserVideoEntity());
  await expect(service.likeVideoByUser(id, userId)).resolves.toBe(true);
});

it("UserService => trigger likeVideoByUser, found userDao, userVideoDao and updated userVideoActionDao and notify like with dislike", async () => {
  const service = new UserVideoActionService(
    userDao,
    userVideoDao,
    userVideoActionDao,
    userVideoActionPublisher,
    userVideoService
  );
  userVideoActionDao.findOne.mockResolvedValueOnce({
    is_liked: false,
    is_disliked: true,
  });
  userVideoActionDao.update.mockResolvedValueOnce({ affected: 1 });
  userDao.findOne.mockResolvedValueOnce(new UserProfileEntity());
  userVideoDao.findOne.mockResolvedValueOnce(new UserVideoEntity());
  await expect(service.likeVideoByUser(id, userId)).resolves.toBe(true);
});

it("UserService => trigger likeVideoByUser, found userDao, userVideoDao but not update userVideoActionDao", async () => {
  const service = new UserVideoActionService(
    userDao,
    userVideoDao,
    userVideoActionDao,
    userVideoActionPublisher,
    userVideoService
  );
  userVideoActionDao.update.mockResolvedValueOnce({ affected: 0 });
  userDao.findOne.mockResolvedValueOnce(new UserProfileEntity());
  userVideoDao.findOne.mockResolvedValueOnce(new UserVideoEntity());
  await expect(service.likeVideoByUser(id, userId)).resolves.toBe(true);
});

// ======================

it("UserService => trigger dislikeVideoByUser, throw NotFoundError daoUserVideo", async () => {
  const service = new UserVideoActionService(
    userDao,
    userVideoDao,
    userVideoActionDao,
    userVideoActionPublisher,
    userVideoService
  );
  await expect(service.dislikeVideoByUser(id, userId)).rejects.toThrowError(
    NotFoundError
  );
});

it("UserService => trigger dislikeVideoByUser, throw NotFoundError daoUser", async () => {
  const service = new UserVideoActionService(
    userDao,
    userVideoDao,
    userVideoActionDao,
    userVideoActionPublisher,
    userVideoService
  );
  userVideoDao.findOne.mockResolvedValueOnce(new UserVideoEntity());
  await expect(service.dislikeVideoByUser(id, userId)).rejects.toThrowError(
    NotFoundError
  );
});

it("UserService => trigger dislikeVideoByUser, found userDao, userVideoDao, updated userVideoActionDao and notify like", async () => {
  const service = new UserVideoActionService(
    userDao,
    userVideoDao,
    userVideoActionDao,
    userVideoActionPublisher,
    userVideoService
  );
  userVideoActionDao.findOne.mockResolvedValueOnce({
    is_liked: false,
    is_disliked: false,
  });
  userVideoActionDao.update.mockResolvedValueOnce({ affected: 1 });
  userDao.findOne.mockResolvedValueOnce(new UserProfileEntity());
  userVideoDao.findOne.mockResolvedValueOnce(new UserVideoEntity());
  await expect(service.dislikeVideoByUser(id, userId)).resolves.toBe(true);
});

it("UserService => trigger dislikeVideoByUser, found userDao, userVideoDao and updated userVideoActionDao and notify like with dislike", async () => {
  const service = new UserVideoActionService(
    userDao,
    userVideoDao,
    userVideoActionDao,
    userVideoActionPublisher,
    userVideoService
  );
  userVideoActionDao.findOne.mockResolvedValueOnce({
    is_liked: true,
    is_disliked: false,
  });
  userVideoActionDao.update.mockResolvedValueOnce({ affected: 1 });
  userDao.findOne.mockResolvedValueOnce(new UserProfileEntity());
  userVideoDao.findOne.mockResolvedValueOnce(new UserVideoEntity());
  await expect(service.dislikeVideoByUser(id, userId)).resolves.toBe(true);
});

it("UserService => trigger dislikeVideoByUser, found userDao, userVideoDao but not update userVideoActionDao", async () => {
  const service = new UserVideoActionService(
    userDao,
    userVideoDao,
    userVideoActionDao,
    userVideoActionPublisher,
    userVideoService
  );
  userVideoActionDao.update.mockResolvedValueOnce({ affected: 0 });
  userDao.findOne.mockResolvedValueOnce(new UserProfileEntity());
  userVideoDao.findOne.mockResolvedValueOnce(new UserVideoEntity());
  await expect(service.dislikeVideoByUser(id, userId)).resolves.toBe(true);
});

// ============

it("UserService => trigger unlikeVideoByUser, throw NotFoundError daoUserVideo", async () => {
  const service = new UserVideoActionService(
    userDao,
    userVideoDao,
    userVideoActionDao,
    userVideoActionPublisher,
    userVideoService
  );
  await expect(service.unlikeVideoByUser(id, userId)).rejects.toThrowError(
    NotFoundError
  );
});

it("UserService => trigger unlikeVideoByUser, throw NotFoundError daoUser, userVideoDao", async () => {
  const service = new UserVideoActionService(
    userDao,
    userVideoDao,
    userVideoActionDao,
    userVideoActionPublisher,
    userVideoService
  );
  userDao.findOne.mockResolvedValueOnce(new UserProfileEntity());
  await expect(service.unlikeVideoByUser(id, userId)).rejects.toThrowError(
    NotFoundError
  );
});

it("UserService => trigger unlikeVideoByUser, throw NotFoundError daoUserVideoAction", async () => {
  const service = new UserVideoActionService(
    userDao,
    userVideoDao,
    userVideoActionDao,
    userVideoActionPublisher,
    userVideoService
  );
  userDao.findOne.mockResolvedValueOnce(new UserProfileEntity());
  userVideoDao.findOne.mockResolvedValueOnce(new UserVideoEntity());
  await expect(service.unlikeVideoByUser(id, userId)).rejects.toThrowError(
    NotFoundError
  );
});

it("UserService => trigger unlikeVideoByUser, ", async () => {
  const service = new UserVideoActionService(
    userDao,
    userVideoDao,
    userVideoActionDao,
    userVideoActionPublisher,
    userVideoService
  );
  userDao.findOne.mockResolvedValueOnce(new UserProfileEntity());
  userVideoDao.findOne.mockResolvedValueOnce(new UserVideoEntity());
  userVideoActionDao.findOne.mockResolvedValueOnce(new UserVideoActionEntity());
  await expect(service.unlikeVideoByUser(id, userId)).resolves.toBe(true);
});

// ============

it("UserService => trigger unDislikeVideoByUser, throw NotFoundError daoUserVideo", async () => {
  const service = new UserVideoActionService(
    userDao,
    userVideoDao,
    userVideoActionDao,
    userVideoActionPublisher,
    userVideoService
  );
  await expect(service.unDislikeVideoByUser(id, userId)).rejects.toThrowError(
    NotFoundError
  );
});

it("UserService => trigger unDislikeVideoByUser, throw NotFoundError daoUser, userVideoDao", async () => {
  const service = new UserVideoActionService(
    userDao,
    userVideoDao,
    userVideoActionDao,
    userVideoActionPublisher,
    userVideoService
  );
  userDao.findOne.mockResolvedValueOnce(new UserProfileEntity());
  await expect(service.unDislikeVideoByUser(id, userId)).rejects.toThrowError(
    NotFoundError
  );
});

it("UserService => trigger unDislikeVideoByUser, throw NotFoundError daoUserVideoAction", async () => {
  const service = new UserVideoActionService(
    userDao,
    userVideoDao,
    userVideoActionDao,
    userVideoActionPublisher,
    userVideoService
  );
  userDao.findOne.mockResolvedValueOnce(new UserProfileEntity());
  userVideoDao.findOne.mockResolvedValueOnce(new UserVideoEntity());
  await expect(service.unDislikeVideoByUser(id, userId)).rejects.toThrowError(
    NotFoundError
  );
});

it("UserService => trigger unDislikeVideoByUser, ", async () => {
  const service = new UserVideoActionService(
    userDao,
    userVideoDao,
    userVideoActionDao,
    userVideoActionPublisher,
    userVideoService
  );
  userDao.findOne.mockResolvedValueOnce(new UserProfileEntity());
  userVideoDao.findOne.mockResolvedValueOnce(new UserVideoEntity());
  userVideoActionDao.findOne.mockResolvedValueOnce(new UserVideoActionEntity());
  await expect(service.unDislikeVideoByUser(id, userId)).resolves.toBe(true);
});
