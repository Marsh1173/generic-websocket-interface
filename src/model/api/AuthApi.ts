import { UserModel } from "../../server/Database/UserModel";

export interface ClientLoginMessage {
  type: "ClientLoginMessage";
  name: string;
  password: string;
}

export interface ClientRegisterMessage {
  type: "ClientRegisterMessage";
  name: string;
  password: string;
}

export interface ServerSuccessfulLogin {
  type: "ServerSuccessfulLogin";
  user_data: UserModel;
  msg: string;
}
export interface ServerBadLogin {
  type: "ServerBadLogin";
  msg: string;
}
export interface ServerBadRegister {
  type: "ServerBadRegister";
  msg: string;
}

export interface ServerAuthMessage {
  type: "ServerAuthMessage";
  msg: ServerSuccessfulLogin | ServerBadLogin | ServerBadRegister;
}
export interface ClientAuthMessage {
  type: "ClientAuthMessage";
  msg: ClientLoginMessage | ClientRegisterMessage;
}