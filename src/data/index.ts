import axios from "axios";

export const getData = async (urlTemplate: string, id: string) => {
  const url = urlTemplate + `${id}`;
  try {
    const response = await axios.get(url);
    const html = response.data;
    return html;
  } catch (error) {
    console.error(error);
  }
};
