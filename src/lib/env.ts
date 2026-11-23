
function getEnv(key: string): string {
  const value = process.env[key];

  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }

  return value;
}

export const env = {
  app: {
    name: process.env.NEXT_PUBLIC_APP_NAME ?? "Chunkk City Builder",
    url: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3080",
    nodeEnv: process.env.NODE_ENV ?? "development",
  },

  database: {
    host: getEnv("DB_HOST"),
    port: Number(process.env.DB_PORT ?? 3306),
    user: getEnv("DB_USER"),
    password: getEnv("DB_PASSWORD"),
    name: getEnv("DB_NAME"),
  },

  mail: {
    host: process.env.SMTP_HOST ?? "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT ?? 465),
    secure: process.env.SMTP_SECURE !== "false",
    user: getEnv("SMTP_USER"),
    password: getEnv("SMTP_PASSWORD"),
    from: getEnv("SMTP_FROM"),
  },

  cron: {
    secret: getEnv("CRON_SECRET"),
  },
};
