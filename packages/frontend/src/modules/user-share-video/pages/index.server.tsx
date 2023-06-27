import { PageContextServer } from "../../../core/utils/types";
import UserVideo from "../../../shared/models/user-video";

export interface IUserVideoProps {
  videos: UserVideo[];
}

export function Page() {
  return <>Share Video</>;
}

const generateRequest = (pageContext: PageContextServer) => {
  return {};
};

export async function onBeforeRender(pageContext: PageContextServer) {
  return {
    pageContext: {
      pageProps: { pageContext },
    },
  };
}

export const passToClient = ["pageProps"];
