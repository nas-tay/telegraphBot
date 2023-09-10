"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const cheerio_1 = __importDefault(require("cheerio"));
const mongoose_1 = __importDefault(require("mongoose"));
const HouseJS_js_1 = __importDefault(require("./model/HouseJS.js"));
const createDB = async (html, id) => {
    const $ = cheerio_1.default.load(html);
    const price = parseInt($(".offer__price").text().trim().replace(/\D/g, ""));
    const city = $(".offer__location.offer__advert-short-info span").text().trim();
    const buildingType = $('[data-name="flat.building"] .offer__advert-short-info').text().trim();
    const yearBult = parseInt($('[data-name="house.year"] .offer__advert-short-info').text().trim());
    const floor = parseInt($('[data-name="flat.floor"] .offer__advert-short-info').text().trim().split(" из ")[0]);
    const floorMax = parseInt($('[data-name="flat.floor"] .offer__advert-short-info').text().trim().split(" из ")[1]);
    const liveSquare = parseInt($('[data-name="live.square"] .offer__advert-short-info').text().trim().replace(/\D/g, ""));
    const renovation = $('[data-name="flat.renovation"] .offer__advert-short-info').text().trim();
    const toilet = $('[data-name="flat.toilet"] .offer__advert-short-info').text().trim();
    const aprt = new HouseJS_js_1.default({
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
    console.log(aprt);
    await aprt.save();
};
const getData = async (id) => {
    const url = `https://krisha.kz/a/show/${id}`;
    await axios_1.default
        .get(url)
        .then(async function (response) {
        const html = response.data;
        createDB(html, id);
    })
        .catch(function (error) {
        console.log(error);
    })
        .finally(function () { });
};
const initDB = async () => {
    try {
        await mongoose_1.default.connect("mongodb+srv://anastasia:123456789mongo@cluster0.8tssfhh.mongodb.net/KrishaKZ?retryWrites=true&w=majority");
        console.log("success");
    }
    catch (error) {
        console.log("error: " + error);
    }
};
initDB().then(() => getData("681426253"));
//# sourceMappingURL=index.js.map