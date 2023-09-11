import * as cheerio from "cheerio";
import House from "../../db/model/House.js";
export const createDatabase = async (html, id) => {
    const $ = cheerio.load(html);
    const price = parseInt($(".offer__price").text().trim().replace(/\D/g, ""));
    const city = $(".offer__location.offer__advert-short-info span").text().trim();
    const buildingType = $('[data-name="flat.building"] .offer__advert-short-info').text().trim();
    const yearBult = parseInt($('[data-name="house.year"] .offer__advert-short-info').text().trim());
    const floor = parseInt($('[data-name="flat.floor"] .offer__advert-short-info').text().trim().split(" из ")[0]);
    const floorMax = parseInt($('[data-name="flat.floor"] .offer__advert-short-info').text().trim().split(" из ")[1]);
    const liveSquare = parseInt($('[data-name="live.square"] .offer__advert-short-info').text().trim().replace(/\D/g, ""));
    const renovation = $('[data-name="flat.renovation"] .offer__advert-short-info').text().trim();
    const toilet = $('[data-name="flat.toilet"] .offer__advert-short-info').text().trim();
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
//# sourceMappingURL=index.js.map