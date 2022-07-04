import { Component } from "react";

export interface ViewComponentProp {
  on_render_callback: () => void;
}

export abstract class ViewComponent<Props extends ViewComponentProp, State> extends Component<Props, State> {
  componentDidMount() {
    this.props.on_render_callback();
  }
}
