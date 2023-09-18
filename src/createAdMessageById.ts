import { KrishaHouse } from "./domains/krisha/house/index.js";
import { HouseData, SaveHouseType } from "./data/house/index.js";
import { adMessageTemplate } from "./adMessageTemplate.js";

export const createAdMessageById = async (id: string): Promise<string> => {
  let message: string = "";
  const house = await HouseData.getHouse(id);
  if (!house) {
    const newHouse: SaveHouseType | undefined = await KrishaHouse.parseHouse(id);
    if (!newHouse) {
      message = "Объявление не найдено";
    } else if (newHouse) {
      const saved: SaveHouseType | null = await HouseData.saveHouse(newHouse);
      if (saved) {
        message = adMessageTemplate(saved);
      }
    }
  } else {
    message = adMessageTemplate(house);
  }
  return message;
};
