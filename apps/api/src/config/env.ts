

export const env = {
  HOST: process.env.HOST ?? '127.0.0.1',
  PORT: Number(process.env.PORT ?? 3333),
  DATABASE_URL: process.env.DATABASE_URL ?? ''
};
