import React from "react";
import { ViewComponent, ViewComponentProp } from "./ViewComponent";

export interface InitializingViewProp extends ViewComponentProp {}

export class InitializingView extends ViewComponent<InitializingViewProp, {}> {
  constructor(props: InitializingViewProp) {
    super(props);
  }

  render() {
    return (
      <div className="InitializingView">
        <span>Loading...</span>
      </div>
    );
  }
}
