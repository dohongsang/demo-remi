import React from "react";
import { BHeader } from "../src/core";
import SLayout from "../src/core/components/layout";
import "./PageShell.css";
import type { PageContext } from "./types";
import { PageContextProvider } from "./usePageContext";

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
          <BHeader></BHeader>
          {children}
        </SLayout>
      </PageContextProvider>
    </React.StrictMode>
  );
}
