import React from "react";
import { Component } from "react";
import { ConnectingView, ConnectingViewProps } from "../connecting/ConnectingView";
import { DisconnectionView } from "../disconnection/DisconnectionView";
import { AuthenticationView, AuthenticationViewProps } from "../authentication/AuthenticationView";

import "./Standards.less";
import "./MainStyles.less";
import { AuthMenuProps, AuthMenuView } from "../authmenu/AuthMenuView";
import { LocalGameComponent, LocalGameComponentProps } from "../game/local/LocalGameView";
import { LoadingComponent, LoadingComponentProps } from "../game/common/loading/LoadingComponent";

export interface MainViewProps {
  initial_state?: MainViewState;
}

type MainViewState =
  | { type: "connecting"; props: ConnectingViewProps }
  | { type: "disconnected"; msg: string }
  | { type: "authenticating"; props: AuthenticationViewProps }
  | { type: "authmenu"; props: AuthMenuProps }
  | { type: "loading-game"; props: LoadingComponentProps }
  | { type: "game"; props: LocalGameComponentProps };

export class MainView extends Component<MainViewProps, MainViewState> {
  constructor(props: MainViewProps) {
    super(props);

    this.state = this.props.initial_state ?? {
      type: "connecting",
      props: {},
    };
  }

  public render() {
    return (
      <div className="main">
        {/* <div className="background-image"></div> disabled while we develop*/}
        {this.get_view()}
      </div>
    );
  }

  private get_view(): JSX.Element {
    switch (this.state.type) {
      case "authenticating":
        return <AuthenticationView props={this.state.props} />;
      case "connecting":
        return <ConnectingView props={this.state.props} />;
      case "disconnected":
        return <DisconnectionView msg={this.state.msg} />;
      case "authmenu":
        return <AuthMenuView props={this.state.props} />;
      case "loading-game":
        return <LoadingComponent props={this.state.props} />;
      case "game":
        return <LocalGameComponent props={this.state.props} />;
    }
  }
}
