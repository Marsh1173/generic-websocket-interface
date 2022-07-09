import { ClientAuthMessage, ServerAuthMessage } from "./AuthApi";
import { ClientBrowserMessage, ServerBrowserMessage } from "./BrowserApi";
import { ClientLobbyMessage, ServerLobbyMessage } from "./LobbyApi";

export type ServerMessage = ServerLobbyMessage | ServerAuthMessage | ServerBrowserMessage;
export type ClientMessage = ClientLobbyMessage | ClientAuthMessage | ClientBrowserMessage;
