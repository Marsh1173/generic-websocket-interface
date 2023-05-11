import React from "react";
import { Component } from "react";
import { GrowlService } from "../growl/GrowlService";

import "./DisconnectionStyles.less";

export class DisconnectionView extends Component<{ msg: string }, {}> {
  public render() {
    new GrowlService().put_growl("Disconnected", "bad");
    return (
      <div className="DisconnectionView">
        <span>{this.props.msg}</span>
        <button onClick={() => location.reload()} className="refresh-button">
          <span>Refresh</span>
        </button>
      </div>
    );
  }
}
