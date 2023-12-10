import React from "react";
import { Component } from "react";
import "./CompassStyles.less";

interface CompassProps {}
interface CompassState {}

export class Compass extends Component<CompassProps, CompassState> {
  constructor(props: CompassProps) {
    super(props);

    this.state = {};
  }

  public render() {
    return (
      <div className="Compass">
        <div className="ring outer">
          <div className="ring inner"></div>
        </div>
      </div>
    );
  }
}
