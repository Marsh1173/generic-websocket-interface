import React from "react";
import { TitledTextInput } from "../Partials/TitledTextInput";
import { ViewComponent, ViewComponentProp } from "./ViewComponent";

export interface ConnectingViewViewProp extends ViewComponentProp {}

export class ConnectingView extends ViewComponent<ConnectingViewViewProp, {}> {
  constructor(props: ConnectingViewViewProp) {
    super(props);
  }
  render() {
    return (
      <div className="ConnectingView">
        <span>Connecting to server...</span>
      </div>
    );
  }
}
