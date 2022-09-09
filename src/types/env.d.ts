export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_SANDBOX_CLIENT_ID: string;
      NEXT_PUBLIC_SANDBOX_SECRET: string;
      DATABASE_URL: URL;
    }
  }
}
