export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_PAYPAL_CLIENT_ID: string;
      PAYPAL_CLIENT_ID: string;
      PAYPAL_SECRET: string;
      DATABASE_URL: URL;
      GOOGLE_CLIENT_ID: string;
      GOOGLE_CLIENT_SECRET: string;
      GOOGLE_CLIENT_ID: string;
      NEXTAUTH_URL: string;
      SENDGRID_API_KEY: string;
      USERS: string;
    }
  }
}
