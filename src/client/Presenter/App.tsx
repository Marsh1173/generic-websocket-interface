import { GLOBAL_INFO } from "../Model/Caches/GlobalInfo";
import { MainView } from "../View/Views/MainView";
import { createRoot } from "react-dom/client";
import React, { ReactElement } from "react";
import { AppState } from "./AppState";
import { InitializingAppState } from "./InitializingAppState";

export type AppStateType =
  | "initializing"
  | "connecting"
  | "logging-in"
  | "main-menu"
  | "browser"
  | "lobby"
  | "game"
  | "end-game";

export class ClientApp {
  private static instance: ClientApp | undefined = undefined;
  public static get_instance(): ClientApp {
    if (!ClientApp.instance) {
      ClientApp.instance = new ClientApp();
      return ClientApp.instance;
    }
    return ClientApp.instance;
  }

  public app_state: AppState;
  private main_view_ref: React.RefObject<MainView> = React.createRef();

  constructor() {
    if (ClientApp.instance) {
      throw new Error("App has already been constructed.");
    }
    this.app_state = new InitializingAppState(this);

    let main_view: ReactElement = (
      <MainView
        ref={this.main_view_ref}
        on_render_callback={() => {
          console.log("main view has rendered");
          if (this.app_state.state_type === "initializing") {
            (this.app_state as InitializingAppState).finish_main_rendering();
          }
        }}
        on_render_connecting_callback={() => {
          console.log("connecting view has rendered");
          this.change_state_to_logging_in();
        }}
        on_render_initializing_callback={() => {
          console.log("initializing view has rendered");
        }}
      />
    );

    const domContainer = document.querySelector("#reactDom");
    const root = createRoot(domContainer!);
    root.render(main_view);
  }

  public change_state_to_connecting() {
    let ws: WebSocket = new WebSocket(GLOBAL_INFO.url);
    ws.onmessage = (msg: MessageEvent) => {
      console.log(msg.data);
    };
    console.log(this.main_view_ref.current);
    if (this.main_view_ref.current) {
      this.main_view_ref.current.show_connecting_view();
    }
  }
  public change_state_to_logging_in() {
    if (this.main_view_ref.current) {
      this.main_view_ref.current.show_logging_in_view();
    }
  }
  public change_state_to_main_menu() {}
  public change_state_to_browser() {}
  public change_state_to_lobby() {}
  public change_state_to_game() {}
  public change_state_to_end_game() {}
}
