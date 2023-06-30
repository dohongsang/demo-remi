import { UserCoreService } from "../../../core/infras/services/user-core.service";
import { ApiService } from "../../../core/rest";
import { ServiceResult } from "../../../core/rest/models/service-result";
import Box from "../../../core/ui/components/box";
import { PageContextServer } from "../../../core/utils/types";
import UserVideo from "../../../shared/models/user-video";
import VideoItem from "../components/video-item";
import VideoListService from "../infras/services/video-list.service";

export interface IUserVideoProps {
  data: ServiceResult<UserVideo[]>;
}

export function Page({ data }: IUserVideoProps) {
  return (
    <Box className="flex flex-col items-center p-10 sm:p-2 md:p-2 gap-4">
      {data.data.map((item) => (
        <VideoItem key={`VideoItem_${item.id}`} {...item} />
      ))}
    </Box>
  );
}

export async function onBeforeRender(pageContext: PageContextServer) {
  ApiService.api.setAccessToken(pageContext.token);
  const userCoreService = new UserCoreService();
  const service = new VideoListService();
  const result = await service.excute();
  return {
    pageContext: {
      pageProps: {
        title: "Remitano Demo Application",
        description: "Remitano Demo Application",
        data: result,
      },
      user: pageContext?.token ? await userCoreService.excute() : null,
    },
  };
}

export const passToClient = ["pageProps"];
