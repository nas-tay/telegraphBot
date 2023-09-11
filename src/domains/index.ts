import { initDatabase } from "../db/index.js";
import { HouseData, SaveHouseType } from "../data/house/index.js";
import { KrishaHouse } from "./krisha/house/index.js";

const id: string = "681426253";

const house: SaveHouseType = await KrishaHouse.parseHouse(id);

initDatabase().then(() => HouseData.saveHouse(house).catch(console.log));
