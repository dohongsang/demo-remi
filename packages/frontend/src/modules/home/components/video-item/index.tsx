import { useMemo } from "react";
import {
  FaRegThumbsDown,
  FaRegThumbsUp,
  FaThumbsDown,
  FaThumbsUp,
} from "react-icons/fa/index";
import Box from "../../../../core/ui/components/box";
import { usePageContext } from "../../../../core/utils/usePageContext";
import UserVideo from "../../../../shared/models/user-video";
import UserActionVideoService from "../../infras/services/user-action-video.service";

const VideoItem: React.FC<UserVideo> = ({
  id,
  link,
  title,
  description,
  numberOfLike,
  numberOfDislike,
  user,
  isLiked,
  isDisliked,
}) => {
  const userActionVideoService = new UserActionVideoService();
  const { user: userAuth } = usePageContext();

  const getYoutubeId = (url: string) => {
    const regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[7].length == 11 ? match[7] : false;
  };

  const youtubeLink = useMemo(() => {
    return `https://www.youtube.com/embed/${getYoutubeId(link)}`;
  }, [link]);

  const likeAndDislikeComponent = useMemo(() => {
    if (isLiked) {
      return (
        <Box className="flex gap-4">
          <FaThumbsUp
            size={40}
            onClick={() => {
              userActionVideoService.userUnLikeVideo({ id }).then(() => {
                location.href = "/";
              });
            }}
            className="cursor-pointer hover:text-orange-500"
          />
        </Box>
      );
    }
    if (isDisliked) {
      return (
        <Box className="flex gap-4">
          <FaThumbsDown
            size={40}
            onClick={() => {
              userActionVideoService.userUnDislikeVideo({ id }).then(() => {
                location.href = "/";
              });
            }}
            className="cursor-pointer hover:text-orange-500"
          />
        </Box>
      );
    }
    return (
      <Box className="flex gap-4">
        <FaRegThumbsUp
          size={40}
          onClick={() => {
            userActionVideoService.userLikeVideo({ id }).then(() => {
              location.href = "/";
            });
          }}
          className="cursor-pointer hover:text-orange-500"
        />
        <FaRegThumbsDown
          size={40}
          onClick={() => {
            userActionVideoService.userDislikeVideo({ id }).then(() => {
              location.href = "/";
            });
          }}
          className="cursor-pointer hover:text-orange-500"
        />
      </Box>
    );
  }, [id, isLiked, isDisliked]);

  return (
    <Box className="flex sm:flex-col md:flex-col gap-2 items-stretch w-full justify-center">
      <Box className="mt-1 flex items-center bg-gray-300 rounded-md">
        <iframe
          src={youtubeLink}
          frameBorder="0"
          className="w-full min-h-[200px]"
        />
      </Box>
      <Box className="flex flex-col gap-2 w-[400px] sm:w-full md:w-full">
        <Box className="flex gap-4 items-center">
          <Box as="label" className="font-semibold line-clamp-2">
            {title}
          </Box>
          {userAuth && userAuth?.id !== user?.id
            ? likeAndDislikeComponent
            : null}
        </Box>
        <Box as="label" className="text-neutral-500">
          Shared by {user.email}
        </Box>
        <Box className="flex items-center gap-4">
          <Box className="flex items-center gap-8">
            <Box className="flex items-center gap-2">
              <FaRegThumbsUp size={25} />
              <Box as="h3">{numberOfLike}</Box>
            </Box>
            <Box className="flex items-center gap-2">
              <FaRegThumbsDown size={25} />
              <Box as="h3">{numberOfDislike}</Box>
            </Box>
          </Box>
          <Box className="flex items-center"></Box>
        </Box>
        <Box as="ul">
          <Box as="label">Description:</Box>
          <Box as="li">
            <Box as="label" className="line-clamp-3">
              {description}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default VideoItem;
