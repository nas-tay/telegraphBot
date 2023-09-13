"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HouseData = void 0;
const index_js_1 = __importDefault(require("../../db/house/index.js"));
class HouseData {
    static async getHouse(id) {
        return await index_js_1.default.findOne({ id });
    }
    static async updateHouse() { }
    static async saveHouse(house) {
        const savedHouse = await index_js_1.default.findOne({ id: house.id });
        if (savedHouse) {
            throw new Error("House already exists");
        }
        const newHouse = new index_js_1.default(house);
        const saved = await newHouse.save();
        console.log("House is saved to MongoDB");
        return saved;
    }
}
exports.HouseData = HouseData;
//# sourceMappingURL=index.js.map