import React, { Component } from "react";

export class InitializingView extends Component<{}, {}> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <div className="InitializingView">
        <span>Initializing...</span>
      </div>
    );
  }
}
