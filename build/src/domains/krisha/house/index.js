"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KrishaHouse = void 0;
const axios_1 = __importDefault(require("axios"));
const cheerio = __importStar(require("cheerio"));
class KrishaHouse {
    static async parseHouse(id) {
        const url = `https://m.krisha.kz/a/show/${id}`;
        try {
            const response = await axios_1.default.get(url);
            const html = response.data;
            const $ = cheerio.load(html);
            return {
                id: parseInt(id),
                price: parseInt($(".offer__price").text().trim().replace(/\D/g, "")),
                roomNumber: parseInt($(".offer__advert-title h1").text().trim().replace(/\D/g, "").split("")[0]),
                city: $(".offer__location.offer__advert-short-info span").text().trim(),
                address: $(".offer__advert-title h1").text().split(",")[$(".offer__advert-title h1").text().split(",").length - 1].trim(),
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
exports.KrishaHouse = KrishaHouse;
//# sourceMappingURL=index.js.map