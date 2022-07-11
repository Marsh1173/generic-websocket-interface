export interface ServerGameReadyMessage {
    type: "ServerGameReadyMessage";
    time_stamp: number;
}
export interface ServerGameDataMessage {
    type: "ServerGameDataMessage";
}
export interface ClientGameReadyMessage {
    type: "ClientGameReadyMessage";
}

export interface ServerGameLoadingMessage {
    type: "ServerGameLoadingMessage";
    msg: ServerGameReadyMessage | ServerGameDataMessage;
}
export interface ClientGameLoadingMessage {
    type: "ClientGameLoadingMessage";
    msg: ClientGameReadyMessage;
}
