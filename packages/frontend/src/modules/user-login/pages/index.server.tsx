import { get } from "lodash";
import { setCookie } from "typescript-cookie";
import { Box } from "../../../core";
import { PageContextServer } from "../../../core/utils/types";
import { UserLoginRequest } from "../infras/models/user-login";
import { UserLoginService } from "../infras/services/auth.service";

export interface IUserLoginProps {
  accessToken: string;
}

export function Page(props: IUserLoginProps) {
  if (typeof window !== "undefined") {
    if (props?.accessToken) {
      setCookie("token", props?.accessToken);
      setTimeout(() => {
        location.href = "/";
      }, 1000);
    }
  }

  return (
    <Box className="h-[500px] flex justify-center items-center gap-8">
      {props?.accessToken ? (
        <Box as="h2">Login Successful</Box>
      ) : (
        <Box as="h2">Login Un-Successful. Please try again!</Box>
      )}
    </Box>
  );
}

const generateRequest = (pageContext: PageContextServer): UserLoginRequest => {
  return {
    username: get(pageContext, "urlParsed.search.username"),
    password: get(pageContext, "urlParsed.search.password"),
  };
};

export async function onBeforeRender(pageContext: PageContextServer) {
  const loginService = new UserLoginService();
  const requestParams = generateRequest(pageContext);
  const result = await loginService.excute(requestParams);
  return {
    pageContext: {
      pageProps: result,
    },
  };
}
export const passToClient = ["pageProps"];
