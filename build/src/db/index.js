import mongoose from "mongoose";
import { ConfigMod } from "../domains/config/index.js";
export const initDatabase = async () => {
    const databaseUrl = ConfigMod.getDbUrl();
    try {
        await mongoose.connect(databaseUrl);
        console.log("Connected to MongoDB");
    }
    catch (error) {
        console.log("error: " + error);
    }
};
//# sourceMappingURL=index.js.map