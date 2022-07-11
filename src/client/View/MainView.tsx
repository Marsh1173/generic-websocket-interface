import React, { Component, createElement } from "react";
import "./Styles/MainStyles.less";
import { ConnectingViewInterface } from "./ViewInterfaces/ConnectingViewInterface";
import { MainInterface } from "./ViewInterfaces/MainInterface";
import { ViewMessageType } from "./ViewInterfaces/ViewInterface";
import { LoginView } from "./Views/LoginView";
export type ViewType = "login" | "browsing" | "lobby" | "loading_game" | "game" | "end_game";

export class MainView extends Component<{}, { view: ViewType }> implements MainInterface {
  constructor(props: any) {
    super(props);
    this.state = { view: "login" };
  }
  render() {
    return (
      <div className="MainView">
        {this.state.view === "login" && <LoginView on_render_callback={() => {}}></LoginView>}
      </div>
    );
  }

  public show_login(): LoginViewInterface {}
  public show_connecting(): ConnectingViewInterface {}
  public display_message(msg: string, type: ViewMessageType) {}
}
