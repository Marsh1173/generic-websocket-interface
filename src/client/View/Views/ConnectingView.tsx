import React, { Component, createElement } from "react";
import { TitledTextInput } from "../Partials/TitledTextInput";
import { ViewComponent } from "../ViewComponent";

export class LoginView extends ViewComponent {
  constructor(props: any) {
    super(props);
    this.state = { view: "login" };
  }
  render() {
    return (
      <div className="LoginView">
        <TitledTextInput name="Username" place_holder="Enter your name" max_length={13}></TitledTextInput>
      </div>
    );
  }
}
