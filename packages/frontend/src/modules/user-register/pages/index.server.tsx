import { ApiService } from "../../../core/rest";
import Box from "../../../core/ui/components/box";
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
  ApiService.api.setAccessToken(pageContext.token);
  return {
    pageContext: {
      pageProps: {
        title: "Register a new account",
        description: "Register a new account",
        isRegister: true,
      },
    },
  };
}

export const passToClient = ["pageProps"];
