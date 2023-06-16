import React, { Component, PropsWithChildren } from "react";
import "./CenteredWindowStyles.less";

interface CenteredWindowProps extends PropsWithChildren {
  className?: string;
}

export class CenteredWindow extends Component<CenteredWindowProps, {}> {
  public render() {
    const classes = "centered-window " + this.props.className;
    return (
      <div className={classes}>
        <div className="centered-window-content">{this.props.children}</div>
      </div>
    );
  }
}
