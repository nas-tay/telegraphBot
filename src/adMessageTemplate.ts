import { SaveHouseType } from "./data/house";

export const adMessageTemplate = (data: SaveHouseType) => {
  return `
${data.id} (id)
${data.roomNumber}-комнатная квартира, ${data.liveSquare} м², ${data.address}
Стоимость: ${data.price.toLocaleString("ru")} 〒
Город: ${data.city}
${data.buildingType !== "" ? "Тип Дома: " + data.buildingType + "\n" : ""}${data.yearBuilt !== 0 ? "Год постройки: " + data.yearBuilt + "\n" : ""}Этаж: ${
    data.floor !== 0 && data.floorMax !== 0 ? data.floor + " из " + data.floorMax : "не указан"
  }
Площадь: ${data.liveSquare} м²
${data.toilet !== "" ? "Санузел: " + data.toilet : ""}
`;
};
