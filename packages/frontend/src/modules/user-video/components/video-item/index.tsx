import { useMemo } from "react";
import { FaRegThumbsUp, FaThumbsDown } from "react-icons/fa";
import Box from "../../../../core/ui/components/box";
import UserVideo from "../../../../shared/models/user-video";

const VideoItem: React.FC<UserVideo> = ({
  link,
  title,
  description,
  numberOfLike,
  numberOfDislike,
}) => {
  const getYoutubeId = (url: string) => {
    const regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[7].length == 11 ? match[7] : false;
  };

  const youtubeLink = useMemo(() => {
    return `https://www.youtube.com/embed/${getYoutubeId(link)}`;
  }, [link]);

  return (
    <Box className="flex gap-2 items-stretch">
      <Box className="mt-1 flex items-center bg-gray-300 rounded-md">
        <iframe height={200} width={400} src={youtubeLink} frameBorder="0" />
      </Box>
      <Box className="flex flex-col gap-2 w-[400px]">
        <Box className="flex gap-4 items-center">
          <Box as="label" className="font-semibold line-clamp-2">
            {title}
          </Box>
          <Box className="flex gap-4">
            <FaRegThumbsUp size={40} />
            <FaThumbsDown size={40} />
          </Box>
        </Box>
        <Box as="label">Shared by</Box>
        <Box className="flex items-center gap-4">
          <Box className="flex items-center gap-8">
            <Box className="flex items-center gap-2">
              <FaRegThumbsUp size={25} />
              <Box as="h3">{numberOfLike}</Box>
            </Box>
            <Box className="flex items-center gap-2">
              <FaThumbsDown size={25} />
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
