/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_REST_API: string;
  readonly VITE_PUBLIC_TOKEN: string;
  readonly VITE_SECRET_HASH_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
