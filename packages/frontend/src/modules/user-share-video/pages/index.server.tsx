import { PageContextServer } from "../../../../renderer/types";
import UserVideo from "../../../models/user-video";

export interface IUserVideoProps {
  videos: UserVideo[];
}

export function Page() {
  return <>Share Video</>;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const generateRequest = (pageContext: PageContextServer) => {
  return {};
};

// eslint-disable-next-line react-refresh/only-export-components
export async function onBeforeRender(pageContext: PageContextServer) {
  return {
    pageContext: {
      pageProps: { pageContext },
    },
  };
}

export const passToClient = ["pageProps"];
