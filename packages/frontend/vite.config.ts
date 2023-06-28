import react from "@vitejs/plugin-react";
import { ConfigEnv, defineConfig, loadEnv } from "vite";
import ssr from "vite-plugin-ssr/plugin";

export default ({ mode }: ConfigEnv) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd(), "") };
  return defineConfig({
    plugins: [
      react(),
      ssr({
        includeAssetsImportedByServer: true,
      }),
    ],
    ssr: {
      noExternal:
        process.env.NODE_ENV === "production"
          ? ["styled-components", "@emotion/*", "lodash"]
          : [],
    },
    optimizeDeps: {
      exclude: ["js-big-decimal"],
    },
  });
};
