import { createServer } from "./connectors/epxress-api/server";
import { CONFIG } from "./config";
import { errorLog, info } from "./helpers/log";
require('dotenv').config()

try {
  // validateConfig([], ["PORT"]);
  info("Config is valid, starting Express server");

  const listener = createServer().listen(CONFIG.PORT());
  info(`Listening on : ${listener.address()["port"]}`);
} catch (e) {
  errorLog("", e);
  process.exit(1);
}
