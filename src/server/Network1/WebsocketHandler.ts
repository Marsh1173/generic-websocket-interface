import { ServerApp } from "./App";

export abstract class WebsocketHandler<WebsocketServer> {
  protected readonly server_map: Map<number, WebsocketServer> = new Map<number, WebsocketServer>();
  constructor(protected readonly server_app: ServerApp) {}

  public if_port_in_use(port: number): boolean {
    return this.server_map.has(port);
  }
}
