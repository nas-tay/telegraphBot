import axios from "axios";
import * as cheerio from "cheerio";

export type ParsedKrishaHouse = {
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

export class KrishaHouse {
  public static async parseHouse(id: string) {
    const url = `https://m.krisha.kz/a/show/${id}`;
    try {
      const response = await axios.get(url);
      const html = response.data;
      const $ = cheerio.load(html);

      return {
        id: parseInt(id),
        price: parseInt($(".offer__price").text().trim().replace(/\D/g, "")),
        roomNumber: parseInt($(".offer__advert-title h1").text().trim().replace(/\D/g, "").split("")[0]),
        city: $(".offer__location.offer__advert-short-info span").text().trim(),
        address: $(".offer__advert-title h1").text().split(",")[2].trim(),
        buildingType: $('[data-name="flat.building"] .offer__advert-short-info').text().trim(),
        yearBuilt: $('[data-name="house.year"] .offer__advert-short-info').length > 0 ? parseInt($('[data-name="house.year"] .offer__advert-short-info').text().trim()) : 0,
        floor: $('[data-name="flat.floor"] .offer__advert-short-info').length > 0 ? parseInt($('[data-name="flat.floor"] .offer__advert-short-info').text().trim().split(" из ")[0]) : 0,
        floorMax: $('[data-name="flat.floor"] .offer__advert-short-info').length > 0 ? parseInt($('[data-name="flat.floor"] .offer__advert-short-info').text().trim().split(" из ")[1]) : 0,
        liveSquare: parseFloat(
          $('[data-name="live.square"] .offer__advert-short-info')
            .text()
            .trim()
            .replace(/[^0-9.]+/g, "")
        ),
        renovation: $('[data-name="flat.renovation"] .offer__advert-short-info').text().trim(),
        toilet: $('[data-name="flat.toilet"] .offer__advert-short-info').text().trim(),
      };
    } catch (error) {
      console.log("error");

      // if (error.response && error.response.status === 404) {
      //   return "Обявление не найдено";

      // throw customError;
    }
  }
}
