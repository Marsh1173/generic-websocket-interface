import { ClientAuthMessage, ClientBrowserMessage, ServerAuthMessage, ServerBrowserMessage } from "./AuthApi";
import { ClientLobbyMessage, ServerLobbyMessage } from "./LobbyApi";

export type ServerMessage = ServerLobbyMessage | ServerAuthMessage | ServerBrowserMessage;
export type ClientMessage = ClientLobbyMessage | ClientAuthMessage | ClientBrowserMessage;
