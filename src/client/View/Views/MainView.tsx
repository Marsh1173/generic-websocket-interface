import React from "react";
import "../Styles/MainStyles.less";
import { ViewComponent, ViewComponentProp } from "./ViewComponent";
import { AppStateType } from "../../Presenter/App";
import { InitializingView } from "./InitializingView";
import { ConnectingView } from "./ConnectingView";
import { LoginView } from "./LoginView";
import { MainViewInterface } from "../ViewInterfaces/MainViewInterface";

export interface MainViewProp extends ViewComponentProp {
  on_render_initializing_callback: () => void;
  on_render_connecting_callback: () => void;
}

export class MainView extends ViewComponent<MainViewProp, { view: AppStateType }> implements MainViewInterface {
  constructor(props: MainViewProp) {
    super(props);
    this.state = { view: "initializing" };
  }

  render() {
    return (
      <div className="MainView">
        {this.state.view === "initializing" && (
          <InitializingView on_render_callback={this.props.on_render_initializing_callback}></InitializingView>
        )}
        {this.state.view === "connecting" && (
          <ConnectingView on_render_callback={this.props.on_render_connecting_callback}></ConnectingView>
        )}
        {this.state.view === "logging-in" && <LoginView on_render_callback={() => {}}></LoginView>}
      </div>
    );
  }

  public show_connecting_view() {
    this.setState({ view: "connecting" });
  }
  public show_logging_in_view() {
    this.setState({ view: "logging-in" });
  }
}
