import { ServerStarter } from "../../server/application/ServerStarter";
import { ServerConfig } from "./server-config";

new ServerConfig().set("production");
ServerStarter();
