import { UserCoreService } from "../../../core/infras/services/user-core.service";
import { ServiceResult } from "../../../core/rest/models/service-result";
import Box from "../../../core/ui/components/box";
import UserVideo from "../../../shared/models/user-video";
import VideoItem from "../components/video-item";
import VideoListService from "../infras/services/video-list.service";

export interface IUserVideoProps {
  data: ServiceResult<UserVideo[]>;
}

export function Page({ data }: IUserVideoProps) {
  return (
    <Box className="flex flex-col items-center px-10 py-4 gap-4">
      {data.data.map((item) => (
        <VideoItem key={`VideoItem_${item.id}`} {...item} />
      ))}
    </Box>
  );
}

export async function onBeforeRender() {
  const userCoreService = new UserCoreService();
  const user = await userCoreService.excute();
  const service = new VideoListService();
  const result = await service.excute();
  return {
    pageContext: {
      pageProps: {
        title: "Remitano Demo Application",
        description: "Remitano Demo Application",
        data: result,
      },
      user,
    },
  };
}

export const passToClient = ["pageProps"];
