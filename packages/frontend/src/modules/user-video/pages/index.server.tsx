import { UserCoreService } from "../../../core/infras/services/user-core.service";
import { ApiService } from "../../../core/rest";
import Box from "../../../core/ui/components/box";
import { PageContextServer } from "../../../core/utils/types";
import UserVideo from "../../../shared/models/user-video";
import UserVideoForm from "../components/user-video-form";

export interface IUserVideoProps {
  videos: UserVideo[];
}

export function Page() {
  return (
    <Box className="flex justify-center py-10">
      <UserVideoForm />
    </Box>
  );
}

export async function onBeforeRender(pageContext: PageContextServer) {
  ApiService.api.setAccessToken(pageContext.token);
  const userCoreService = new UserCoreService();
  return {
    pageContext: {
      pageProps: {
        title: "Share a Youtube video",
        description: "Share a Youtube video",
      },
      user: pageContext?.token ? await userCoreService.excute() : null,
    },
  };
}

export const passToClient = ["pageProps"];
