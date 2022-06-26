import React, { Component, createElement } from "react";
import "./Styles/MainStyles.less";
import { LoginView } from "./Views/LoginView";
export type ViewType = "login" | "browsing" | "lobby" | "loading_game" | "game" | "end_game";

export class MainView extends Component<{}, { view: ViewType }> {
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
}
