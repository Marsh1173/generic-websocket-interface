import { ClientApp } from "./app";
import { GLOBAL_INFO } from "./Model/Caches/GlobalInfo";

GLOBAL_INFO.url = `ws://${location.hostname}:3000`;

let client_app = new ClientApp();
client_app.start();
