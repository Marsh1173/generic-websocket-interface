import { ViewChanger } from "./main/ViewChanger";
import { ClientConfig } from "./utils/ClientConfig";

new ClientConfig().set("production");
new ViewChanger();
