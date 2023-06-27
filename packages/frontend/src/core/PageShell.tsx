import React from "react";
import "./PageShell.css";
import { BHeader } from "./components";
import SLayout from "./ui/components/layout";
import type { PageContext } from "./utils/types";
import { PageContextProvider } from "./utils/usePageContext";

export function PageShell({
  children,
  pageContext,
}: {
  children: React.ReactNode;
  pageContext: PageContext;
}) {
  return (
    <React.StrictMode>
      <PageContextProvider pageContext={pageContext}>
        <SLayout>
          <BHeader user={pageContext.user}></BHeader>
          {children}
        </SLayout>
      </PageContextProvider>
    </React.StrictMode>
  );
}
