import { Config } from "../../model/common/Config";
import { Singleton } from "../../model/common/Singleton";

export interface IClientConfig {
  port: number;
  ws_url: () => string;
  is_development: boolean;
}

const PRODUCTION_CLIENT_CONFIG: IClientConfig = {
  port: 3001,
  ws_url: () => {
    const protocol = window.location.protocol.includes("https") ? "wss" : "ws";
    return `${protocol}://${location.host}:${PRODUCTION_CLIENT_CONFIG.port}`;
  },
  is_development: false,
};

const DEVELOPMENT_CLIENT_CONFIG: IClientConfig = {
  ...PRODUCTION_CLIENT_CONFIG,
  port: 3000,
  ws_url: () => {
    return `ws://${location.host}`;
  },
  is_development: true,
};

type ClientConfigMode = "production" | "development";

@Singleton
export class ClientConfig extends Config<ClientConfigMode, IClientConfig> {
  protected default_mode: ClientConfigMode = "production";
  protected config_record: Record<ClientConfigMode, IClientConfig> = {
    production: PRODUCTION_CLIENT_CONFIG,
    development: DEVELOPMENT_CLIENT_CONFIG,
  };
}
