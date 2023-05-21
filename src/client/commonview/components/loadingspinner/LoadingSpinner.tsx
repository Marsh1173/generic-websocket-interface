import { Component } from "react";

import "./LoadingSpinnerStyles.less";
import React from "react";

type LoadingSpinnerSize = "small" | "medium" | "large";

export interface LoadingSpinnerProps {
  size?: LoadingSpinnerSize;
  track?: boolean;
}

export class LoadingSpinner extends Component<LoadingSpinnerProps, {}> {
  constructor(props: LoadingSpinnerProps) {
    super(props);
  }

  public render() {
    return (
      <div className={"loading-spinner " + (this.props.size ?? "medium")}>
        <svg viewBox="0 0 100 100">
          {this.props.track && <circle className="circle-track" cx="50" cy="50" r="45" />}
          <circle className="spinner-circle" cx="50" cy="50" r="45" />
        </svg>
      </div>
    );

    //stroke dasharray is dash - gap
    //stroke dashoffset is how far along it starts. percent or number
  }
}
