interface ImportMetaEnv {
  readonly DEV: boolean;
  readonly PROD: boolean;
  readonly MODE: string;
  readonly BASE_URL: string;
  readonly SSR: boolean;
  readonly VITE_DEMO_CONTACT_EMAIL?: string;
  readonly VITE_API_BASE_URL?: string;
  readonly [key: string]: unknown;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
