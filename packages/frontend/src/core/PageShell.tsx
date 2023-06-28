import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket";
import "./PageShell.css";
import { BHeader } from "./components";
import { Alert } from "./ui";
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
  const { sendMessage } = useWebSocket(
    "ws://127.0.0.1:8000",
    {
      onOpen: () => {
        console.info("WebSocket connection established.");
      },
      onMessage: (message) => {
        const data = JSON.parse(message.data);
        toast.custom((t) => <Alert message={data.message} t={t} />);
      },
    },
    true
  );

  return (
    <React.StrictMode>
      <PageContextProvider pageContext={{ ...pageContext, sendMessage }}>
        <SLayout>
          <BHeader user={pageContext.user} sendMessage={sendMessage}></BHeader>
          {children}
        </SLayout>
        <Toaster position="top-right" reverseOrder={false} />
      </PageContextProvider>
    </React.StrictMode>
  );
}
