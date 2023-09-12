import House from "../../db/house/index.js";
export class HouseData {
    static async getHouse(id) {
        return await House.findOne({ id });
    }
    static async updateHouse() { }
    static async saveHouse(house) {
        const savedHouse = await House.findOne({ id: house.id });
        if (savedHouse) {
            throw new Error("House already exists");
        }
        const newHouse = new House(house);
        const saved = await newHouse.save();
        console.log("House is saved to MongoDB");
        return saved;
    }
}
//# sourceMappingURL=index.js.map