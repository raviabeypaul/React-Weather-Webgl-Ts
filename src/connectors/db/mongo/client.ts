import { MongoClient, Db } from "mongodb";
import { CONFIG } from "config";

let cachedDb: Db = null;

export const client = async (): Promise<Db> => {
  // console.info("establising database connection");

  if (cachedDb) {
    return cachedDb;
  }

  const mongoUrl = await CONFIG.DATABASE_URL();

  const client = new MongoClient(mongoUrl);

  try {
    await client.connect();
    console.info("database connection established");
    cachedDb = await client.db(await CONFIG.DATABASE_NAME());
    return cachedDb;
  } catch (error) {
    console.error("Unable to connect with the mongoDb : ", error);
    throw error;
  }
};