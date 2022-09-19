const { z } = require('zod');

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  NODE_ENV: z.enum(['development', 'test', 'production']),
  NEXT_PUBLIC_SANDBOX_CLIENT_ID: z.string(),
  NEXT_PUBLIC_SANDBOX_SECRET: z.string(),
});

const env = envSchema.safeParse(process.env);

if (!env.success) {
  console.error(
    '❌ Invalid environment variables:',
    JSON.stringify(env.error.format(), null, 4)
  );
  process.exit(1);
}

module.exports.env = env.data;
