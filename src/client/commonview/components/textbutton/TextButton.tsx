import { Component } from "react";

import "./TextButtonStyles.less";
import React from "react";

export interface TextButtonProps {
  text: string;
  on_click(): void;
  disabled?: boolean;
  color?: "dark" | "light";
  size?: "small" | "medium";
}

export class TextButton extends Component<TextButtonProps, {}> {
  public render() {
    return (
      <button
        className={"TextButton " + this.props.color ?? "light" + " " + this.props.size ?? "small"}
        disabled={this.props.disabled}
        onClick={this.props.on_click}
      >
        {this.props.text}
      </button>
    );
  }
}
