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
    roomNumber: {
        type: Number,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: false,
    },
    buildingType: {
        type: String,
        required: false,
    },
    yearBuilt: {
        type: Number,
        required: false,
    },
    floor: {
        type: Number,
        required: false,
    },
    floorMax: {
        type: Number,
        required: false,
    },
    liveSquare: {
        type: Number,
        required: true,
    },
    renovation: {
        type: String,
        required: false,
    },
    toilet: {
        type: String,
        required: false,
    },
});
const HouseModel = model("House", houseSchema);
exports.default = HouseModel;
//# sourceMappingURL=index.js.map