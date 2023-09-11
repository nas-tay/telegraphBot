import axios from "axios";
export const getData = async (urlTemplate, id) => {
    const url = urlTemplate + `${id}`;
    try {
        const response = await axios.get(url);
        const html = response.data;
        return html;
    }
    catch (error) {
        console.error(error);
    }
};
//# sourceMappingURL=index.js.map