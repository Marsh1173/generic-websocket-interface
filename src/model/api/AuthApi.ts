export interface ClientAuthHandshakeInformation {
  type: "ClientAuthHandshakeInformation";
  name: string;
  id: number;
}
export interface ServerAuthHandshakeInformation {
  type: "ServerAuthHandshakeInformation";
  id: number;
}

export interface ServerAuthMessage {
  type: "ServerAuthMessage";
  msg: ServerAuthHandshakeInformation;
}
export interface ClientAuthMessage {
  type: "ClientAuthMessage";
  msg: ClientAuthHandshakeInformation;
}
