import React from "react";
import { Component } from "react";
import { ConnectingView, ConnectingViewProps } from "../connecting/ConnectingView";
import { DisconnectionView } from "../disconnection/DisconnectionView";
import { AuthenticationView, AuthenticationViewProps } from "../authentication/AuthenticationView";

import "./Standards.less";
import "./MainStyles.less";

type MainViewState =
  | { type: "connecting"; props: ConnectingViewProps }
  | { type: "disconnected"; msg: string }
  | { type: "authenticating"; props: AuthenticationViewProps };

export class MainView extends Component<{}, MainViewState> {
  constructor(props: any) {
    super(props);

    this.state = {
      type: "connecting",
      props: {},
    };
  }

  public render() {
    return (
      <div className="main">
        <div className="background-image"></div>
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
    }
  }
}
