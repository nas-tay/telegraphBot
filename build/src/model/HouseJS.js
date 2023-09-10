"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, model } = mongoose_1.default;
const houseSchema = new Schema({
    id: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    buildingType: {
        type: String,
        required: true,
    },
    yearBult: {
        type: Number,
        required: true,
    },
    floor: {
        type: Number,
        required: true,
    },
    floorMax: {
        type: Number,
        required: true,
    },
    liveSquare: {
        type: Number,
        required: true,
    },
    renovation: {
        type: String,
        required: true,
    },
    toilet: {
        type: String,
        required: true,
    },
});
const House = model("House", houseSchema);
exports.default = House;
//# sourceMappingURL=HouseJS.js.map