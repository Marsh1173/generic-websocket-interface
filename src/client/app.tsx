import { GLOBAL_INFO } from "./Model/Caches/GlobalInfo";
import { MainView } from "./View/MainView";
import { createRoot } from "react-dom/client";
import React from "react";

export class ClientApp {
  public start() {
    const domContainer = document.querySelector("#reactDom");
    const root = createRoot(domContainer!);
    root.render(<MainView />);

    let ws: WebSocket = new WebSocket(GLOBAL_INFO.url);
    ws.onmessage = (msg: MessageEvent) => {
      console.log(msg.data);
    };
  }
}
