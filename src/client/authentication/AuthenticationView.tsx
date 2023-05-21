import React from "react";
import { Component } from "react";
import { AuthenticatorClient } from "./network/AuthenticatorClient";
import { FrontEndAuthenticationValidator } from "./utils/FrontEndAuthenticationValidator";
import { LoginForm } from "./components/loginform/LoginForm";
import { SaveSuccessfulLogin } from "./utils/SaveSuccessfulLogin";
import { UserData } from "../../model/user/UserData";
import { IServerTalker } from "../network/ServerTalker";
import { GrowlService } from "../growl/GrowlService";
import { ViewChanger } from "../main/ViewChanger";

import "./AuthenticationStyles.less";
import { TextButton } from "../commonview/components/textbutton/TextButton";
import { RegisterForm } from "./components/registerform/RegisterForm";
import { CenteredWindow } from "../commonview/components/centeredwindow/CenteredWindow";

export interface AuthenticationViewProps {
  server_talker: IServerTalker;
}

export interface AuthenticationViewState {
  auth_type: "login" | "register";
  submitted: boolean;
}

export class AuthenticationView extends Component<{ props: AuthenticationViewProps }, AuthenticationViewState> {
  private readonly auth_client: AuthenticatorClient;
  private readonly growler: GrowlService = new GrowlService();

  constructor(props: { props: AuthenticationViewProps }) {
    super(props);

    this.state = {
      auth_type: "login",
      submitted: false,
    };

    this.auth_client = new AuthenticatorClient(this.props.props.server_talker, this);

    this.get_switch_auth_type_button = this.get_switch_auth_type_button.bind(this);
    this.set_submitted = this.set_submitted.bind(this);
    this.on_attempt_login = this.on_attempt_login.bind(this);
    this.on_attempt_register = this.on_attempt_register.bind(this);
    this.on_successful_authentication = this.on_successful_authentication.bind(this);
  }

  public render() {
    return (
      <CenteredWindow className={"AuthenticationView"}>
        <h1 className="title">Generic Websocket Interface</h1>
        {this.state.auth_type === "login" && (
          <LoginForm on_login={this.on_attempt_login} submitted={this.state.submitted}></LoginForm>
        )}
        {this.state.auth_type === "register" && (
          <RegisterForm on_register={this.on_attempt_register} submitted={this.state.submitted}></RegisterForm>
        )}
        {this.get_switch_auth_type_button()}
      </CenteredWindow>
    );
  }

  public get_switch_auth_type_button(): JSX.Element {
    const text = this.state.auth_type === "login" ? "Register" : "Login";
    return (
      <TextButton
        text={text}
        on_click={() => {
          if (this.state.submitted) return;
          const new_auth_type = this.state.auth_type === "login" ? "register" : "login";
          this.setState({ auth_type: new_auth_type });
        }}
        color="light"
      ></TextButton>
    );
  }

  public set_submitted(val: boolean) {
    this.setState({ submitted: val });
  }

  private last_attempted_username: string = "";
  private on_attempt_login(user_id: string, password: string) {
    this.set_submitted(true);
    this.last_attempted_username = user_id;
    this.auth_client.send_login(user_id, password);
  }

  private on_attempt_register(user_id: string, email: string, password: string, confirm_password: string) {
    let frontend_errs: string[] = FrontEndAuthenticationValidator.validate_registration(
      user_id,
      email,
      password,
      confirm_password
    );

    if (frontend_errs.length === 0) {
      this.set_submitted(true);
      this.last_attempted_username = user_id;
      this.auth_client.send_registration(user_id, email, password);
    } else {
      for (const err of frontend_errs) {
        this.growler.put_growl(err, "bad");
      }
    }
  }

  public on_successful_authentication(user_data: UserData) {
    let server_talker: IServerTalker = this.auth_client.deconstruct();
    SaveSuccessfulLogin.save_successful_login(this.last_attempted_username);
    this.growler.put_growl("Welcome, " + user_data.user_id + "!", "good");

    new ViewChanger().change_state_to_authmenu({
      user_data,
      server_talker,
    });
  }
}
