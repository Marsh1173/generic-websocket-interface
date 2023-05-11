import { Logger } from "../logging/Logger";
import { ServerApp } from "./ServerApp";

export const ServerStarter = () => {
  try {
    Logger.init_logs();
    new ServerApp();
  } catch (err) {
    console.error("Could not initialize server app.");
    console.error(err);
    process.exitCode = 1;
  }
};
