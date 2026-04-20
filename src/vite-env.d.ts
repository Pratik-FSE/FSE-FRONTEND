/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ENV?: string;
  readonly VITE_API_URL?: string;
  readonly VITE_API_BASE?: string;
  readonly VITE_API_URL_FALLBACK?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
