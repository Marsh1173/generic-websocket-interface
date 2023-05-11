import { writeFileSync } from "fs";
import { ServerConfig } from "../../tools/server/server-config";
import { Time } from "../../model/utils/Time";

const BASE_PATH: string = "logs/";

export class Logger {
  public static readonly LOG_FILE_PATHS = {
    logs: BASE_PATH + "logs",
    errors: BASE_PATH + "errors",
    db: BASE_PATH + "database",
  };
  private static is_development: boolean = false;

  public static init_logs() {
    Logger.is_development = new ServerConfig().get().is_development;

    if (!Logger.is_development) {
      console.error = function (message) {
        Logger.log_error(message);
      };
      console.log = function (message) {
        Logger.log(message);
      };
    }
  }

  private static log_to_file = (msg: any, path: string) => {
    let date: Date = new Date();
    let dated_msg: string = Time.get_date_time_str(date) + " - " + msg + `\n`;
    path += Logger.get_month_year_str(date) + ".log";
    writeFileSync(path, dated_msg, { flag: "a" });
  };

  public static log = (msg: any) =>
    Logger.log_to_file(msg, Logger.LOG_FILE_PATHS.logs);
  public static log_error = (msg: any) =>
    Logger.log_to_file(msg, Logger.LOG_FILE_PATHS.errors);
  public static log_db = (msg: any) =>
    Logger.log_to_file(msg, Logger.LOG_FILE_PATHS.db);

  private static get_month_year_str(date: Date): string {
    return Logger.format_month_year_str(date.getFullYear(), date.getMonth());
  }

  public static format_month_year_str(year: number, month: number) {
    return year.toString() + "-" + month.toString();
  }
}
