import axios from "axios";
import * as cheerio from "cheerio";
export class KrishaHouse {
    static async parseHouse(id) {
        const url = `https://m.krisha.kz/a/show/${id}`;
        try {
            const response = await axios.get(url);
            const html = response.data;
            const $ = cheerio.load(html);
            console.log(1);
            console.log($('[data-name="flat.floor"] .offer__advert-short-info') ? $('[data-name="flat.floor"] .offer__advert-short-info') : 3);
            return {
                id: parseInt(id),
                price: parseInt($(".offer__price").text().trim().replace(/\D/g, "")),
                city: $(".offer__location.offer__advert-short-info span").text().trim(),
                buildingType: $('[data-name="flat.building"] .offer__advert-short-info').text().trim(),
                yearBuilt: $('[data-name="house.year"] .offer__advert-short-info').length > 0 ? parseInt($('[data-name="house.year"] .offer__advert-short-info').text().trim()) : 0,
                floor: $('[data-name="flat.floor"] .offer__advert-short-info').length > 0 ? parseInt($('[data-name="flat.floor"] .offer__advert-short-info').text().trim().split(" из ")[0]) : 0,
                floorMax: $('[data-name="flat.floor"] .offer__advert-short-info').length > 0 ? parseInt($('[data-name="flat.floor"] .offer__advert-short-info').text().trim().split(" из ")[1]) : 0,
                liveSquare: parseFloat($('[data-name="live.square"] .offer__advert-short-info')
                    .text()
                    .trim()
                    .replace(/[^0-9.]+/g, "")),
                renovation: $('[data-name="flat.renovation"] .offer__advert-short-info').text().trim(),
                toilet: $('[data-name="flat.toilet"] .offer__advert-short-info').text().trim(),
            };
        }
        catch (error) {
            console.log("error");
            // if (error.response && error.response.status === 404) {
            //   return "Обявление не найдено";
            // throw customError;
        }
    }
}
//# sourceMappingURL=index.js.map