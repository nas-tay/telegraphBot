"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var Schema = mongoose_1.default.Schema, model = mongoose_1.default.model;
var houseSchema = new Schema({
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
var House = model("House", houseSchema);
exports.default = House;
