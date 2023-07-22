import { ViewChanger } from "./main/ViewChanger";
import { ClientConfig } from "./utils/ClientConfig";

new ClientConfig().set("development");
new ViewChanger().initialize();
