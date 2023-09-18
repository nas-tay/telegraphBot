import House from "../../db/house/index.js";

export type SaveHouseType = {
  id: number;
  price: number;
  roomNumber: number;
  city: string;
  address: string;
  buildingType: string;
  yearBuilt: number;
  floor: number;
  floorMax: number;
  liveSquare: number;
  renovation: string;
  toilet: string;
};

export class HouseData {
  public static async getHouse(id: string): Promise<SaveHouseType | null> {
    if (!House.findOne({ id })) {
      return null;
    }
    return await House.findOne({ id });
  }

  public static async updateHouse() {}

  public static async saveHouse(house: SaveHouseType): Promise<SaveHouseType | null> {
    const savedHouse = await House.findOne({ id: house.id });
    if (savedHouse) {
      return null;
    }
    const newHouse = new House(house);
    const saved: SaveHouseType = await newHouse.save();
    console.log("House is saved to MongoDB");
    return saved;
  }
}
