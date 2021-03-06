import { PlayerInfo } from "../../model/api/PlayerInfo";
import { ServerTalker } from "../serverHandling/ServerTalker";

interface ServerInfo {
  url: string;
  serverTalker: ServerTalker | undefined;
}

function getRandColor(): string {
  let r: string = Math.floor(Math.random() * 2) == 0 ? "00" : "ff";
  let g: string = Math.floor(Math.random() * 2) == 0 ? "00" : "ff";
  let b: string = Math.floor(Math.random() * 2) == 0 ? "00" : "ff";

  return "#" + r + g + b;
}

function getRandName(): string {
  return "Player " + Math.ceil(Math.random() * 1000);
}

export class Global {
  public static serverInfo: ServerInfo = {
    url: `ws://${location.hostname}`,
    serverTalker: undefined,
  };
  public static playerInfo: PlayerInfo = {
    name: getRandName(),
    color: getRandColor(),
    id: -1,
  };
}
