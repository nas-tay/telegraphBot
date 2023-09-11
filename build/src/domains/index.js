import { initDatabase } from "../db/index.js";
import { createDatabase } from "../data/houses/index.js";
import { ConfigMod } from "./config/index.js";
import { getData } from "../data/index.js";
const id = "681426253";
const html = await getData(ConfigMod.getKrishaUrl(), id);
initDatabase().then(() => createDatabase(html, id));
//# sourceMappingURL=index.js.map