import { get } from "lodash";
import { PageContextServer } from "../../../../renderer/types";
import { ClientRender } from "../../../core";
import Box from "../../../core/components/box/box";

export interface IUserLoginProps {
  username: string;
  password: string;
}

export function Page(props: IUserLoginProps) {
  return (
    <Box className="h-[500px] flex justify-center items-center gap-8">
      <Box as="h2">Login</Box>
      <ClientRender
        component={() => import("../component/user-login-form")}
        fallback={() => <Box>Loading...</Box>}
        {...props}
      />
    </Box>
  );
}

const generateRequest = (pageContext: PageContextServer) => {
  return {
    username: get(pageContext, "urlParsed.search.username"),
    password: get(pageContext, "urlParsed.search.password"),
  };
};

// eslint-disable-next-line react-refresh/only-export-components
export async function onBeforeRender(pageContext: PageContextServer) {
  const requestParams = generateRequest(pageContext);
  return {
    pageContext: {
      pageProps: requestParams,
    },
  };
}

export const passToClient = ["pageProps"];
