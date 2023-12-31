import compression from "compression";
import express from "express";
import { renderPage } from "vite-plugin-ssr/server";
import { root } from "./root.js";
const isProduction = process.env.NODE_ENV === "production";

startServer();

async function startServer() {
  const app = express();
  app.use(compression());

  if (isProduction) {
    const sirv = (await import("sirv")).default;
    app.use(sirv(`${root}/dist/client`));
  } else {
    const vite = await import("vite");
    const viteDevMiddleware = (
      await vite.createServer({
        root,
        server: { middlewareMode: true },
      })
    ).middlewares;
    app.use(viteDevMiddleware);
  }

  app.get("*", async (req, res, next) => {
    const cookie = req.headers.cookie;
    const posToken = cookie?.indexOf("token=") ?? 0;
    const pageContextInit = {
      urlOriginal: req.originalUrl,
      token: cookie?.substring(posToken + 6, cookie.length),
    };

    const pageContext = await renderPage(pageContextInit);
    const { httpResponse } = pageContext;
    if (!httpResponse) return next();

    const { body, statusCode, contentType, earlyHints } = httpResponse;
    if (res.writeEarlyHints) {
      res.writeEarlyHints({ link: earlyHints.map((e) => e.earlyHintLink) });
    }

    res.status(statusCode).type(contentType).send(body);
  });

  const port = process.env.PORT || 3000;
  app.listen(port);
  console.log(`Server running at http://localhost:${port}`);
}
