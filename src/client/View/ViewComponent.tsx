import { Component } from "react";

export interface ViewComponentProp {
  on_render_callback: () => void;
}

export abstract class ViewComponent extends Component<ViewComponentProp, {}> {
  componentDidMount() {
    this.props.on_render_callback();
  }
}
