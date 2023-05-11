import { Config } from "../../model/utils/Config";
import { Singleton } from "../../model/utils/Singleton";

export interface IServerConfig {
  port: number;
  is_development: boolean;
  user_timeout_limit?: number;
  database_path: string;
  subdomain: string;
}

const PROD_SERVER_CONFIG: IServerConfig = {
  port: 3001,
  is_development: false,
  user_timeout_limit: 300, // 5 minutes
  database_path: "src/server/database/",
  subdomain: "server",
};

const DEV_SERVER_CONFIG: IServerConfig = {
  ...PROD_SERVER_CONFIG,
  port: 3000,
  user_timeout_limit: undefined, // no timeout limit
  is_development: true,
};

type ServerConfigMode = "production" | "development";

@Singleton
export class ServerConfig extends Config<ServerConfigMode, IServerConfig> {
  protected default_mode: ServerConfigMode = "production";
  protected config_record: Record<ServerConfigMode, IServerConfig> = {
    development: DEV_SERVER_CONFIG,
    production: PROD_SERVER_CONFIG,
  };
}
