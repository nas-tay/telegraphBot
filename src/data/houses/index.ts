import * as cheerio from "cheerio";
import House from "../../db/model/House.js";

export const createDatabase = async (html: string, id: string) => {
  const $ = cheerio.load(html);
  const price: number = parseInt($(".offer__price").text().trim().replace(/\D/g, ""));
  const city: string = $(".offer__location.offer__advert-short-info span").text().trim();
  const buildingType: string = $('[data-name="flat.building"] .offer__advert-short-info').text().trim();
  const yearBult: number = parseInt($('[data-name="house.year"] .offer__advert-short-info').text().trim());
  const floor: number = parseInt($('[data-name="flat.floor"] .offer__advert-short-info').text().trim().split(" из ")[0]);
  const floorMax: number = parseInt($('[data-name="flat.floor"] .offer__advert-short-info').text().trim().split(" из ")[1]);
  const liveSquare: number = parseInt($('[data-name="live.square"] .offer__advert-short-info').text().trim().replace(/\D/g, ""));
  const renovation: string = $('[data-name="flat.renovation"] .offer__advert-short-info').text().trim();
  const toilet: string = $('[data-name="flat.toilet"] .offer__advert-short-info').text().trim();

  const newHouse = new House({
    id: parseInt(id),
    price: price,
    city: city,
    buildingType: buildingType,
    yearBult: yearBult,
    floor: floor,
    floorMax: floorMax,
    liveSquare: liveSquare,
    renovation: renovation,
    toilet: toilet,
  });
  console.log(newHouse);
  await newHouse.save();
};
