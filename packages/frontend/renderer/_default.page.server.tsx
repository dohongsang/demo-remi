import ReactDOMServer from "react-dom/server";
import { ServerStyleSheet } from "styled-components";
import { dangerouslySkipEscape, escapeInject } from "vite-plugin-ssr/server";
import { InjectFilterEntry } from "vite-plugin-ssr/types";
import "../public/global.css";
import { PageShell } from "../src/core/PageShell";
import { PageContextServer } from "../src/core/utils/types";
import logoUrl from "./logo.svg";

export const passToClient = ["pageProps", "routeParams", "token", "user"];

export async function render(pageContext: PageContextServer) {
  const { Page, pageProps } = pageContext;
  const sheet = new ServerStyleSheet();
  const title = `${pageProps && pageProps.title}`;
  const desc = `${pageProps && pageProps.description}`;
  const documentHtml = escapeInject`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <link rel="icon" href="${logoUrl}" />
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap" rel="stylesheet">
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="${desc}" />
        <style>${dangerouslySkipEscape(sheet.getStyleTags())}</style>
        <title>${title ?? ""}</title>
      </head>
      <body>
        <div id="react-root">${dangerouslySkipEscape(
          ReactDOMServer.renderToString(
            sheet.collectStyles(
              <PageShell pageContext={pageContext}>
                <Page {...pageProps} />
              </PageShell>
            )
          )
        )}</div>
      </body>
    </html>`;

  const injectFilter = (assets: InjectFilterEntry[]): void => {
    assets.forEach((asset) => {
      if (asset.isEntry || asset.assetType === "script") {
        return;
      }

      // Preload images
      if (asset.assetType === "style") {
        asset.inject = "HTML_BEGIN";
        asset.isEntry = false;
      }
    });
  };

  return {
    documentHtml,
    pageContext: {},
    injectFilter,
  };
}
