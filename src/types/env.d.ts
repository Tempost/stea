/// <reference types='vite/client' />
export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly VITE_PUBLIC_PAYPAL_CLIENT_ID: string;
      readonly PAYPAL_CLIENT_ID: string;
      readonly PAYPAL_SECRET: string;
      readonly DATABASE_URL: URL;
      readonly AUTH_GOOGLE_ID: string;
      readonly AUTH_GOOGLE_SECRET: string;
      readonly AUTH_URL: string;
      readonly AUTH_SECRET: string;
      readonly SENDGRID_API_KEY: string;
      readonly USERS: string;
      readonly NODE_ENV: 'development' | 'production' | 'test';
    }
  }
}
