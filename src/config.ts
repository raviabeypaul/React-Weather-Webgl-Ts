export const CONFIG = {
  PORT: () => parseInt(process.env.PORT || "3000", 10),
  DATABASE_URL: () => process.env.DATABASE_URL,
  DATABASE_NAME: () => process.env.DATABASE_NAME,
};
