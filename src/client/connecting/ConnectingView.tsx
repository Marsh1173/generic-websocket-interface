import React from "react";
import { Component } from "react";
import { IServerTalker, ServerTalker } from "../network/ServerTalker";
import { ViewChanger } from "../main/ViewChanger";

export interface ConnectingViewProps {}

export class ConnectingView extends Component<
  { props: ConnectingViewProps },
  {}
> {
  constructor(props: { props: ConnectingViewProps }) {
    super(props);

    new ServerTalker((server_talker: IServerTalker) => {
      new ViewChanger().change_state_to_authenticating({
        server_talker,
      });
    });
  }

  public render() {
    return (
      <div>
        <span>Connecting...</span>
      </div>
    );
  }
}
