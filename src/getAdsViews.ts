import axios from "axios";

export const getAdsViewsById = async (
  adsIds: string[]
): Promise<{
  [key: string]: number;
}> => {
  const response = await axios.get(`https://krisha.kz/ms/views/krisha/live/${adsIds.join(",")}/`);
  const data = response.data.data;

  const result: {
    [key: string]: number;
  } = {};

  for (const id of adsIds) {
    result[id] = data[id].nb_views;
  }

  return result;
};
