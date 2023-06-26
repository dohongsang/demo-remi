import ReactDOMServer from "react-dom/server";
import { ServerStyleSheet } from "styled-components";
import { dangerouslySkipEscape, escapeInject } from "vite-plugin-ssr/server";
import "../public/global.css";
import { PageShell } from "./PageShell";
import logoUrl from "./logo.svg";
import type { PageContextServer } from "./types";

async function render(pageContext: PageContextServer) {
  const { Page, pageProps } = pageContext;

  const sheet = new ServerStyleSheet();
  const { documentProps } = pageContext.exports;
  const title = documentProps && documentProps.title;
  const desc = documentProps && documentProps.description;
  const documentHtml = escapeInject`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <link rel="icon" href="${logoUrl}" />
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap" rel="stylesheet">
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="${desc ?? ""}" />
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

  return {
    documentHtml,
    pageContext: {},
  };
}
export { render };
export const passToClient = ["pageProps", "urlPathname"];
