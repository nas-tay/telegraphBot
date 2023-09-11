import axios from "axios";
import * as cheerio from "cheerio";
export class KrishaHouse {
    static async parseHouse(id) {
        const url = `https://krisha.kz/a/show/${id}`;
        const response = await axios.get(url);
        const html = response.data;
        const $ = cheerio.load(html);
        return {
            id: parseInt(id),
            price: parseInt($(".offer__price").text().trim().replace(/\D/g, "")),
            city: $(".offer__location.offer__advert-short-info span").text().trim(),
            buildingType: $('[data-name="flat.building"] .offer__advert-short-info').text().trim(),
            yearBult: parseInt($('[data-name="house.year"] .offer__advert-short-info').text().trim()),
            floor: parseInt($('[data-name="flat.floor"] .offer__advert-short-info').text().trim().split(" из ")[0]),
            floorMax: parseInt($('[data-name="flat.floor"] .offer__advert-short-info').text().trim().split(" из ")[1]),
            liveSquare: parseInt($('[data-name="live.square"] .offer__advert-short-info').text().trim().replace(/\D/g, "")),
            renovation: $('[data-name="flat.renovation"] .offer__advert-short-info').text().trim(),
            toilet: $('[data-name="flat.toilet"] .offer__advert-short-info').text().trim(),
        };
    }
}
//# sourceMappingURL=index.js.map