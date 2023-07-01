import { google } from "googleapis";
import { UserProfileEntity } from "../../../../core/db/entities/user-profile";
import { CreateVideoRequest } from "../../rest/models/create-video/create-video.req";
import { UserVideoService } from "../video.service";

const userVideoDao = {
  findOne: jest.fn(),
  find: jest.fn(),
  update: jest.fn(),
  insert: jest.fn(),
} as any;
const userVideoActionDao = {
  findOne: jest.fn(),
  find: jest.fn(),
} as any;
const userVideoActionPublisher = {
  onMessageUserDislikeVideo: jest.fn(),
  onMessageUserLikeVideo: jest.fn(),
  onMessageUserUnDislikeVideo: jest.fn(),
  onMessageUserUnLikeVideo: jest.fn(),
} as any;

it("UserVideoService => trigger onSubcriber", async () => {
  const service = new UserVideoService(
    userVideoDao,
    userVideoActionDao,
    userVideoActionPublisher
  );

  userVideoActionPublisher.onMessageUserDislikeVideo.mockImplementation(
    (cb: any) => {
      cb("id_123");
    }
  );
  userVideoActionPublisher.onMessageUserLikeVideo.mockImplementation(
    (cb: any) => {
      cb("id_123");
    }
  );
  userVideoActionPublisher.onMessageUserUnDislikeVideo.mockImplementation(
    (cb: any) => {
      cb("id_123");
    }
  );
  userVideoActionPublisher.onMessageUserUnLikeVideo.mockImplementation(
    (cb: any) => {
      cb("id_123");
    }
  );
  expect(service.onSubcriber());
});

it("UserVideoService => trigger onMessageUserLikeVideo when daoUserVideo is not found", async () => {
  const service = new UserVideoService(
    userVideoDao,
    userVideoActionDao,
    userVideoActionPublisher
  );
  await expect(service.onMessageUserLikeVideo("id_123"));
});

it("UserVideoService => trigger onMessageUserLikeVideo when daoUserVideo is existed", async () => {
  const service = new UserVideoService(
    userVideoDao,
    userVideoActionDao,
    userVideoActionPublisher
  );
  userVideoDao.findOne.mockResolvedValueOnce({});
  await expect(service.onMessageUserLikeVideo("id_123"));
});

// ==========

it("UserVideoService => trigger onMessageUserDislikeVideo when daoUserVideo is not found", async () => {
  const service = new UserVideoService(
    userVideoDao,
    userVideoActionDao,
    userVideoActionPublisher
  );
  await expect(service.onMessageUserDislikeVideo("id_123"));
});

it("UserVideoService => trigger onMessageUserDislikeVideo when daoUserVideo is existed", async () => {
  const service = new UserVideoService(
    userVideoDao,
    userVideoActionDao,
    userVideoActionPublisher
  );
  userVideoDao.findOne.mockResolvedValueOnce({});
  await expect(service.onMessageUserDislikeVideo("id_123"));
});

// ==========

it("UserVideoService => trigger onMessageUserUnLikeVideo when daoUserVideo is not found", async () => {
  const service = new UserVideoService(
    userVideoDao,
    userVideoActionDao,
    userVideoActionPublisher
  );
  await expect(service.onMessageUserUnLikeVideo("id_123"));
});

it("UserVideoService => trigger onMessageUserUnLikeVideo when daoUserVideo is existed", async () => {
  const service = new UserVideoService(
    userVideoDao,
    userVideoActionDao,
    userVideoActionPublisher
  );
  userVideoDao.findOne.mockResolvedValueOnce({});
  await expect(service.onMessageUserUnLikeVideo("id_123"));
});

// ==========

it("UserVideoService => trigger onMessageUserUnDislikeVideo when daoUserVideo is not found", async () => {
  const service = new UserVideoService(
    userVideoDao,
    userVideoActionDao,
    userVideoActionPublisher
  );
  await expect(service.onMessageUserUnDislikeVideo("id_123"));
});

it("UserVideoService => trigger onMessageUserUnDislikeVideo when daoUserVideo is existed", async () => {
  const service = new UserVideoService(
    userVideoDao,
    userVideoActionDao,
    userVideoActionPublisher
  );
  userVideoDao.findOne.mockResolvedValueOnce({});
  await expect(service.onMessageUserUnDislikeVideo("id_123"));
});

// ==========

it("UserVideoService => trigger shareVideo with unvalid link youtube", async () => {
  const body: CreateVideoRequest = {
    link: "https://www.youtube.com/watch",
  };
  const user = new UserProfileEntity();
  user.id = "user_id_123";

  const service = new UserVideoService(
    userVideoDao,
    userVideoActionDao,
    userVideoActionPublisher
  );
  await expect(service.shareVideo(body, user));
});

it("UserVideoService => trigger shareVideo with valid link youtube", async () => {
  const body: CreateVideoRequest = {
    link: "https://www.youtube.com/watch?v=YnOfi96QygE",
  };

  jest.spyOn(google, "youtube").mockReturnValue({
    videos: {
      list: jest.fn().mockResolvedValue({
        data: {
          items: [{ snippet: { title: "title", description: "description" } }],
        },
      }),
    },
  } as any);

  const user = new UserProfileEntity();
  user.id = "user_id_123";
  userVideoDao.insert.mockResolvedValue({
    title: "video.title",
    description: "video.description",
    link: "body.link",
    numberOfDislike: 0,
    numberOfLike: 0,
    user,
  });
  const service = new UserVideoService(
    userVideoDao,
    userVideoActionDao,
    userVideoActionPublisher
  );
  await expect(service.shareVideo(body, user));
});

it("UserVideoService => trigger shareVideo with valid link youtube", async () => {
  const body: CreateVideoRequest = {
    link: "https://www.youtube.com/watch?v=YnOfi96QygE",
  };

  jest.spyOn(google, "youtube").mockReturnValue({
    videos: {
      list: jest.fn().mockResolvedValue({
        data: {
          items: undefined,
        },
      }),
    },
  } as any);

  const user = new UserProfileEntity();
  user.id = "user_id_123";
  userVideoDao.insert.mockResolvedValue({
    title: "video.title",
    description: "video.description",
    link: "body.link",
    numberOfDislike: 0,
    numberOfLike: 0,
    user,
  });
  const service = new UserVideoService(
    userVideoDao,
    userVideoActionDao,
    userVideoActionPublisher
  );
  await expect(service.shareVideo(body, user));
});

// ========

it("UserVideoService => trigger find userEntity", async () => {
  const user = new UserProfileEntity();
  user.id = "user_id_123";
  const service = new UserVideoService(
    userVideoDao,
    userVideoActionDao,
    userVideoActionPublisher
  );
  userVideoDao.find.mockResolvedValue();
  userVideoActionDao.find.mockImplementation(() => ({
    then: jest.fn().mockResolvedValue({ id_123: {} }),
  }));
  await expect(service.find(user));
});

it("UserVideoService => trigger find userEntity", async () => {
  const user = new UserProfileEntity();
  user.id = "user_id_123";
  const service = new UserVideoService(
    userVideoDao,
    userVideoActionDao,
    userVideoActionPublisher
  );
  userVideoDao.find.mockResolvedValue([
    {
      id: "id_123",
      title: "video.title",
      description: "video.description",
      link: "body.link",
      numberOfDislike: 0,
      numberOfLike: 0,
      user,
    },
    {
      id: "id_1234",
      title: "video.title",
      description: "video.description",
      link: "body.link",
      numberOfDislike: 0,
      numberOfLike: 0,
      user,
    },
  ]);
  userVideoActionDao.find.mockResolvedValueOnce([
    { id: "id_123", is_liked: true, is_disliked: true },
    { id: "id_1234" },
  ]);
  await expect(service.find(user));
});
