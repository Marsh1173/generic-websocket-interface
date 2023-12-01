import React from "react";
import { Component } from "react";
import { ConnectingView, ConnectingViewProps } from "../connecting/ConnectingView";
import { DisconnectionView } from "../disconnection/DisconnectionView";
import { AuthenticationView, AuthenticationViewProps } from "../authentication/AuthenticationView";
import { AuthMenuProps, AuthMenuView } from "../authmenu/AuthMenuView";
import { LoadingApp, LoadingAppProps } from "../../model/game/display/ui/loadingapp/LoadingApp";
import "./Standards.less";
import "./MainStyles.less";
import { GameApp, GameAppProps } from "../../model/game/display/ui/gameapp/GameApp";

export interface MainViewProps {
  initial_state?: MainViewState;
}

type MainViewState =
  | { type: "connecting"; props: ConnectingViewProps }
  | { type: "disconnected"; msg: string }
  | { type: "authenticating"; props: AuthenticationViewProps }
  | { type: "authmenu"; props: AuthMenuProps }
  | { type: "loading-game"; props: LoadingAppProps }
  | { type: "game"; props: GameAppProps };

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
        return <LoadingApp props={this.state.props} />;
      case "game":
        return <GameApp props={this.state.props} />;
    }
  }
}
