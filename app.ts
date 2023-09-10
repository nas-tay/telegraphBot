import axios from "axios";
import cheerio from "cheerio";
import mongoose from "mongoose";
import House from "./src/db/model/House.js";

const id: string = "681426253";

const createDB = async (html: string, id: string) => {
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

  const aprt = new House({
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

const getData = async (id: string) => {
  const url = `https://krisha.kz/a/show/${id}`;
  await axios
    .get(url)
    .then(async function (response) {
      const html = response.data;
      createDB(html, id);
    })
    .catch(function (error) {
      console.log(error);
    })
    .finally(function () {});
};

const initDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://anastasia:123456789mongo@cluster0.8tssfhh.mongodb.net/KrishaKZ?retryWrites=true&w=majority");
    console.log("success");
  } catch (error) {
    console.log("error: " + error);
  }
};

initDB().then(() => getData(id));
