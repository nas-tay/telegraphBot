"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const index_js_1 = require("../domains/config/index.js");
const initDatabase = async () => {
    const databaseUrl = index_js_1.Config.mainMongoUrl;
    console.log(`Trying connect to ${databaseUrl}`);
    await mongoose_1.default.connect(databaseUrl);
    console.log("Connected to MongoDB");
};
exports.initDatabase = initDatabase;
//# sourceMappingURL=index.js.map