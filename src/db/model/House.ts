import mongoose from "mongoose";
const { Schema, model } = mongoose;

interface IHouse {
  id: number;
  price: number;
  city: string;
  buildingType: string;
  yearBult: number;
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

const House = model<IHouse>("House", houseSchema);
export default House;
