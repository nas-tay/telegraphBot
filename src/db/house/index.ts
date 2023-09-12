import mongoose from "mongoose";
const { Schema, model } = mongoose;

interface IHouse {
  id: number;
  price: number;
  city: string;
  buildingType: string;
  yearBuilt: number;
  floor: number;
  floorMax: number;
  liveSquare: number;
  renovation: string;
  toilet: string;
}

const houseSchema = new Schema<IHouse>({
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

const HouseModel = model<IHouse>("House", houseSchema);
export default HouseModel;
