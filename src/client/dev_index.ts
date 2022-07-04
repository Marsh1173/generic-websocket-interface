import { ClientApp } from "./Presenter/App";
import { GLOBAL_INFO } from "./Model/Caches/GlobalInfo";

GLOBAL_INFO.url = `ws://${location.hostname}:3000`;

let client_app = ClientApp.get_instance();
