import mongoose from "mongoose";
import { Config } from "../domains/config/index.js";
export const initDatabase = async () => {
    const databaseUrl = Config.mainMongoUrl;
    await mongoose.connect(databaseUrl);
    console.log("Connected to MongoDB");
};
//# sourceMappingURL=index.js.map