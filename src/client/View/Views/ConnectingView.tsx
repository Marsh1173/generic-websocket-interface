import React, { Component } from "react";

export class ConnectingView extends Component<{}, {}> {
  constructor(props: any) {
    super(props);
  }
  render() {
    return (
      <div className="ConnectingView">
        <span>Connecting...</span>
      </div>
    );
  }
}
