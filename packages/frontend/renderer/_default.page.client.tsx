import { hydrateRoot } from "react-dom/client";
import { PageShell } from "../src/core/PageShell";
import { ApiService } from "../src/core/rest";
import { PageContextClient } from "../src/core/utils/types";

export async function render(pageContext: PageContextClient) {
  ApiService.api.setAccessToken(pageContext.token);

  const { Page, pageProps } = pageContext;
  if (!Page) {
    throw new Error(
      "Client-side render() hook expects pageContext.Page to be defined"
    );
  }

  const root = document.getElementById("react-root");
  if (!root) throw new Error("DOM element #react-root not found");

  hydrateRoot(
    root,
    <PageShell pageContext={pageContext}>
      <Page {...pageProps} />
    </PageShell>
  );
}
