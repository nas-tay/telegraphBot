import House from "../../db/house/index.js";

export class HouseData {
  public static async getHouse() {}

  public static async updateHouse() {}

  public static async saveHouse(house: any) {
    try {
      const savedHouse = await House.findOne({ id: house.id });
      if (savedHouse) {
        throw new Error("House already exists");
      }
      const newHouse = new House(house);
      await newHouse.save();
      console.log("House is saved to MongoDB");
    } catch (error) {
      console.error(error);
    }
  }
}
