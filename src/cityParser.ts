import * as cheerio from "cheerio";
import axios from "axios";

export const getKrishaAdsIds = async (city: string, pageNumber: number): Promise<string[]> => {
  const response = await axios.get(`https://krisha.kz/prodazha/kvartiry/${city}/?page=${pageNumber}`);

  const html = response.data;
  const $ = cheerio.load(html);
  const allCards = Array.from($(".a-card"));
  let result: string[] = [];
  allCards.forEach((card) => {
    const dataId = $(card).attr("data-id");
    if (typeof dataId === "string") {
      result.push(dataId);
    }
  });

  return result;
};
