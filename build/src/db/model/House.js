import mongoose from "mongoose";
const { Schema, model } = mongoose;
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
export default House;
//# sourceMappingURL=House.js.map