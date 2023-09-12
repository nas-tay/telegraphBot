import mongoose from "mongoose";
import { Config } from "../domains/config/index.js";

export const initDatabase = async () => {
  const databaseUrl = Config.mainMongoUrl;
  console.log(`Trying connect to ${databaseUrl}`);
  await mongoose.connect(databaseUrl);
  console.log("Connected to MongoDB");
};
