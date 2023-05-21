import React, { ChangeEvent, FormEvent } from "react";
import { Component } from "react";
import { FetchStoredLogin } from "../../utils/FetchStoredLogin";

import "./LoginFormStyles.less";

export interface LoginFormProps {
  on_login: (username: string, password: string) => void;
  submitted: boolean;
}

export interface LoginFormState {
  user_id: string;
  password: string;
  has_necessary_info: boolean;
}

export class LoginForm extends Component<LoginFormProps, LoginFormState> {
  constructor(props: LoginFormProps) {
    super(props);
    this.state = { user_id: "", password: "", has_necessary_info: false };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.on_submit = this.on_submit.bind(this);
    this.update_has_necessary_info = this.update_has_necessary_info.bind(this);
  }

  private handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    if (name === "username") {
      this.setState({ user_id: value }, this.update_has_necessary_info);
    } else if (name === "password") {
      this.setState({ password: value }, this.update_has_necessary_info);
    }
  }

  public render() {
    return (
      <form
        className="LoginForm"
        onSubmit={(ev) => {
          this.on_submit(ev);
        }}
      >
        <input
          name="username"
          type={"text"}
          value={this.state.user_id}
          onChange={this.handleInputChange}
          placeholder={"Username"}
          autoComplete="off"
        />
        <input
          name="password"
          type="password"
          value={this.state.password}
          onChange={this.handleInputChange}
          placeholder={"Password"}
        />
        <input
          type={"submit"}
          value={this.props.submitted ? "Logging in..." : "Login"}
          disabled={this.props.submitted || !this.state.has_necessary_info}
        />
      </form>
    );
  }

  public componentDidMount(): void {
    FetchStoredLogin.fetch((last_used_username) => {
      this.setState({
        user_id: last_used_username,
      });
    });
  }

  private on_submit(ev: FormEvent) {
    ev.preventDefault();
    this.props.on_login(this.state.user_id, this.state.password);
  }

  private update_has_necessary_info() {
    if (this.state.user_id !== "" && this.state.password !== "") {
      this.setState({ has_necessary_info: true });
    } else {
      this.setState({ has_necessary_info: false });
    }
  }
}
