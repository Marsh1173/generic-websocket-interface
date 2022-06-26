import React, { Component } from "react";
import { ChangeEvent } from "react";

export interface TitledTextInputProps {
  name: string;
  default_value?: string;
  place_holder?: string;
  max_length?: number;
}

export class TitledTextInput extends Component<TitledTextInputProps, { value?: string }> {
  constructor(props: TitledTextInputProps) {
    super(props);
    if (this.props.default_value) {
      this.state = { value: this.props.default_value };
    } else {
      this.state = { value: "" };
    }
  }
  render() {
    return (
      <fieldset className="TitledTextInput">
        <legend className="text-input-title">{this.props.name}</legend>
        <input
          className="text-input-field"
          type={"text"}
          value={this.state.value}
          onChange={(e) => this.update_input_value(e.target.value)}
          placeholder={this.props.place_holder ? this.props.place_holder : ""}
          maxLength={this.props.max_length ? this.props.max_length : -1}
          autoComplete="off"
        ></input>
      </fieldset>
    );
  }

  private update_input_value(new_value: string) {
    this.setState({
      value: new_value,
    });
  }

  public get_value(): string {
    if (this.state.value) {
      return this.state.value;
    } else {
      return "";
    }
  }

  public clear_value() {
    this.update_input_value("");
  }

  public set_value(new_value: string) {
    this.update_input_value(new_value);
  }
}
