import { ApiService } from "../../../core/rest";
import Box from "../../../core/ui/components/box";
import { ApplicationConfig } from "../../../core/utils/config";
import { PageContextServer } from "../../../core/utils/types";
import UserRegisterForm from "../components/user-video-form";

export interface IUserRegisterProps {
  accessToken: string;
}

export function Page() {
  return (
    <Box className="flex justify-center py-10">
      <UserRegisterForm />
    </Box>
  );
}

export async function onBeforeRender(pageContext: PageContextServer) {
  ApiService.instance(ApplicationConfig.VITE_REST_API ?? "", {
    token: pageContext?.token ?? ApplicationConfig.VITE_PUBLIC_TOKEN,
  });

  return {
    pageContext: {
      pageProps: {},
    },
  };
}

export const passToClient = ["pageProps"];
