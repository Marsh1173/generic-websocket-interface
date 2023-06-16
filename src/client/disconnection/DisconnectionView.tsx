import React from "react";
import { Component } from "react";
import { GrowlService } from "../growl/GrowlService";
import { CenteredWindow } from "../commonview/components/centeredwindow/CenteredWindow";

import "./DisconnectionStyles.less";

export class DisconnectionView extends Component<{ msg: string }, {}> {
  public render() {
    new GrowlService().put_growl("You have been disconnected.", "bad");
    return (
      <CenteredWindow>
        <span>{this.props.msg}</span>
        <button onClick={() => location.reload()} className="refresh-button">
          <span>Refresh</span>
        </button>
      </CenteredWindow>
    );
  }
}
