import React, { Component, createElement } from "react";
import { TitledTextInput } from "../Partials/TitledTextInput";
import { ViewComponent, ViewComponentProp } from "./ViewComponent";

export interface LoginViewProp extends ViewComponentProp {}

export class LoginView extends ViewComponent<
  LoginViewProp,
  { login_type: "login" | "register"; if_attempting: boolean }
> {
  constructor(props: LoginViewProp) {
    super(props);
    this.state = { login_type: "login", if_attempting: false };
  }
  render() {
    return (
      <div className="LoginView">
        <TitledTextInput name="Username" max_length={13}></TitledTextInput>
        <TitledTextInput name="Password" max_length={13} type="password"></TitledTextInput>
        {this.state.login_type === "login" && (
          <div>
            <button className="login-button">
              <span>Login</span>
            </button>
            <span className="sub-link">Create an account</span>
          </div>
        )}
        {this.state.login_type === "register" && (
          <div>
            <TitledTextInput name="Confirm Password" max_length={13} type="password"></TitledTextInput>
            <button className="register-button">
              <span>Create Account</span>
            </button>
            <span className="sub-link">Login</span>
          </div>
        )}
      </div>
    );
  }
}
