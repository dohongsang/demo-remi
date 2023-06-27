import type {
  PageContextBuiltIn,
  PageContextBuiltInClientWithServerRouting as PageContextBuiltInClient,
} from "vite-plugin-ssr/types";
import UserInfo from "../models/user-info";

type Page = (pageProps: PageProps) => React.ReactElement;

export type PageContextCustom = {
  Page: Page;
  pageProps?: PageProps;
  urlPathname: string;
  token: string;
  user: UserInfo;
};

export type PageContextServer = PageContextBuiltIn<Page> & PageContextCustom;
export type PageContextClient = PageContextBuiltInClient<Page> &
  PageContextCustom;
export type PageContext = PageContextClient | PageContextServer;
export type PageProps = Record<string, unknown>;
