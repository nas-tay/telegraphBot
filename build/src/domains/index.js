import { initDatabase } from "../db/index.js";
import { HouseData } from "../data/krisha/index.js";
import { KrishaHouse } from "./krisha/house/index.js";
const id = "681426253";
const house = await KrishaHouse.parseHouse(id);
initDatabase().then(() => HouseData.saveHouse(house));
//# sourceMappingURL=index.js.map