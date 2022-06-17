import { createElement } from "react";
import { GLOBAL_INFO } from "./Model/Caches/GlobalInfo";
import { Home } from "./View/main";
import { createRoot } from "react-dom/client";

export class ClientApp {
  public start() {
    const domContainer = document.querySelector("#reactDom");
    const root = createRoot(domContainer!);
    let home_elem = createElement(Home);
    root.render(home_elem);

    let ws: WebSocket = new WebSocket(GLOBAL_INFO.url);
    ws.onmessage = (msg: MessageEvent) => {
      console.log(msg.data);
    };
  }
}
