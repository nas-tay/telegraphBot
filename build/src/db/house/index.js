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
export default HouseModel;
//# sourceMappingURL=index.js.map