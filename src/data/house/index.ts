import House from "../../db/house/index.js";

export type SaveHouseType = {
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
};

export class HouseData {
  public static async getHouse() {}

  public static async updateHouse() {}

  public static async saveHouse(house: SaveHouseType) {
    const savedHouse = await House.findOne({ id: house.id });
    if (savedHouse) {
      throw new Error("House already exists");
    }
    const newHouse = new House(house);
    await newHouse.save();
    console.log("House is saved to MongoDB");
  }
}
