import { IServerConfig, ServerConfig } from "../../tools/server/server-config";
import { Application } from "express-ws";
import * as https from "https";
import * as http from "http";
import * as fs from "fs";
import { WebSocket, Server } from "ws";
import { ServerApp } from "../application/ServerApp";
import { ClientTalker, IClientTalker } from "./user/ClientTalker";

export class WebsocketListener {
  private server: http.Server | https.Server;
  private port: number;
  private url: string;
  private socket: Server;

  private readonly config: IServerConfig;

  /**
   * @param server_app Interface that gives access to an authenticator websocket handler for new connections.
   * @param app Express Application that the WebsocketServer will accept websocket connections from.
   */
  constructor(
    private readonly server_app: ServerApp,
    private readonly app: Application
  ) {
    this.config = new ServerConfig().get();
    this.port = this.config.port;

    [this.server, this.port, this.url] = this.get_server_args();
    this.socket = new WebSocket.Server({ server: this.server });
    this.start_listener();

    this.socket.on("connection", (ws) => this.on_connect(ws));
  }

  private start_listener() {
    this.server.listen(this.port, () => {
      console.log("Listening on " + this.url);
    });
  }

  public stop_listener(): void {
    this.server.close();
  }

  private on_connect(ws: WebSocket) {
    let client_talker: IClientTalker = new ClientTalker(ws);
    this.server_app.authentication_service.unauthenticated_user_map.attach_user(
      client_talker
    );
  }

  /* SERVER CREATION */
  private get_server_args(): [http.Server | https.Server, number, string] {
    let server: http.Server | https.Server;
    let url: string;
    let port: number = this.config.port;
    let is_development: boolean = this.config.is_development;

    if (is_development) {
      server = this.create_local_server();
      url = "localhost:" + port.toString();
    } else {
      server = this.create_remote_server();
      url = this.config.subdomain + ".natehroylance.com:" + port.toString();
    }

    return [server, port, url];
  }

  private create_local_server(): http.Server {
    return http.createServer(this.app);
  }

  private create_remote_server(): https.Server {
    return https.createServer(
      {
        cert: fs.readFileSync(
          "/etc/letsencrypt/live/server.natehroylance.com/cert.pem"
        ),
        key: fs.readFileSync(
          "/etc/letsencrypt/live/server.natehroylance.com/privkey.pem"
        ),
      },
      this.app
    );
  }
}
