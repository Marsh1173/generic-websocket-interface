import React from "react";
import { Component } from "react";

interface SideNavButtonProps {
  text: string;
  image: string;
  on_click: () => void;
  highlight: boolean;
}
interface SideNavButtonState {}

export class SideNavButton extends Component<SideNavButtonProps, SideNavButtonState> {
  constructor(props: SideNavButtonProps) {
    super(props);

    this.state = {};
  }

  public render() {
    return (
      <button className={"SideNavButton" + (this.props.highlight ? " highlight" : "")} onClick={this.props.on_click}>
        <div className="icon">
          <img src={this.props.image}></img>
        </div>
        <span className="label">{this.props.text}</span>
      </button>
    );
  }
}
