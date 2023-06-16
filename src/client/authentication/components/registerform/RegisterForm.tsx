import React, { ChangeEvent, FormEvent } from "react";
import { Component } from "react";

import "./RegisterFormStyles.less";

export interface RegisterFormProps {
  on_register: (
    username: string,
    email: string,
    password: string,
    confirm_password: string
  ) => void;
  submitted: boolean;
}

export interface RegisterFormState {
  user_id: string;
  email: string;
  password: string;
  confirm_password: string;
  has_necessary_info: boolean;
}

export class RegisterForm extends Component<
  RegisterFormProps,
  RegisterFormState
> {
  constructor(props: RegisterFormProps) {
    super(props);
    this.state = {
      user_id: "",
      email: "",
      password: "",
      confirm_password: "",
      has_necessary_info: false,
    };

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
    } else if (name === "email") {
      this.setState({ email: value }, this.update_has_necessary_info);
    } else if (name === "password") {
      this.setState({ password: value }, this.update_has_necessary_info);
    } else if (name === "confirm_password") {
      this.setState(
        { confirm_password: value },
        this.update_has_necessary_info
      );
    }
  }

  public render() {
    return (
      <form
        className="RegisterForm"
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
          name="email"
          type={"text"}
          value={this.state.email}
          onChange={this.handleInputChange}
          placeholder={"Email"}
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
          name="confirm_password"
          type="password"
          value={this.state.confirm_password}
          onChange={this.handleInputChange}
          placeholder={"Confirm Password"}
        />
        <input
          type={"submit"}
          value={this.props.submitted ? "Registering..." : "Register"}
          disabled={this.props.submitted || !this.state.has_necessary_info}
        />
      </form>
    );
  }

  private on_submit(ev: FormEvent) {
    ev.preventDefault();
    this.props.on_register(
      this.state.user_id,
      this.state.email,
      this.state.password,
      this.state.confirm_password
    );
  }

  private update_has_necessary_info() {
    if (
      this.state.user_id !== "" &&
      this.state.email !== "" &&
      this.state.password !== "" &&
      this.state.confirm_password !== ""
    ) {
      this.setState({ has_necessary_info: true });
    } else {
      this.setState({ has_necessary_info: false });
    }
  }
}
