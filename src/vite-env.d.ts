/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_TOKEN_AUTH: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
