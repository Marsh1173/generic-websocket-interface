import { ClientAuthMessage, ServerAuthMessage } from "./AuthApi";
import { ClientBrowserMessage, ServerBrowserMessage } from "./BrowserApi";
import { ClientGameLoadingMessage, ServerGameLoadingMessage } from "./GameApi";
import { ClientLobbyMessage, ServerLobbyMessage } from "./LobbyApi";

export type ServerMessage = ServerLobbyMessage | ServerAuthMessage | ServerBrowserMessage | ServerGameLoadingMessage;
export type ClientMessage = ClientLobbyMessage | ClientAuthMessage | ClientBrowserMessage | ClientGameLoadingMessage;
