import { SERVER_CONFIG } from "./Config";
import { ServerApp } from "./Network/App";

if (process.argv.length >= 2 && process.argv[2] == "dev") {
  SERVER_CONFIG.is_development = true;
}

let app: ServerApp = new ServerApp();
app.init();
