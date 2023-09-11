import mongoose from "mongoose";
import { Config } from "../domains/config/index.js";

export const initDatabase = async () => {
  const databaseUrl = Config.mainMongoUrl;
  try {
    await mongoose.connect(databaseUrl);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("error: " + error);
  }
};
