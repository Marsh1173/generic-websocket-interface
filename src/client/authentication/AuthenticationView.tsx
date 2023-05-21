import React from "react";
import { Component } from "react";
import { AuthenticatorClient } from "./network/AuthenticatorClient";
import { FrontEndAuthenticationValidator } from "./utils/FrontEndAuthenticationValidator";
import { AuthenticationForm } from "./components/authenticationform/AuthenticationForm";
import { SaveSuccessfulLogin } from "./utils/SaveSuccessfulLogin";
import { UserData } from "../../model/user/UserData";
import { IServerTalker } from "../network/ServerTalker";
import { GrowlService } from "../growl/GrowlService";
import { ViewChanger } from "../main/ViewChanger";

import "./AuthenticationStyles.less";
import { TextButton } from "../commonview/components/textbutton/TextButton";

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
    this.on_successful_authentication = this.on_successful_authentication.bind(this);
  }

  public render() {
    return (
      <div className="AuthenticationView">
        <div className="AuthenticationContent">
          <h1 className="title">Generic Websocket Interface</h1>
          <AuthenticationForm on_submit={this.on_attempt_login} submitted={this.state.submitted}></AuthenticationForm>
          {this.get_switch_auth_type_button()}
        </div>
      </div>
    );
  }

  public get_switch_auth_type_button(): JSX.Element {
    const text = this.state.auth_type === "login" ? "Register" : "Login";
    return (
      <TextButton
        text={text}
        on_click={() => {
          new GrowlService().put_growl("Markaronin has come online.", "good");
        }}
        color="light"
      ></TextButton>
    );
  }

  public set_submitted(val: boolean) {
    this.setState({ submitted: val });
  }

  private last_attempted_username: string = "";
  private last_attempted_password: string = "";
  private on_attempt_login(user_id: string, password: string) {
    let frontend_errs: string[] = FrontEndAuthenticationValidator.front_end_validate_username_and_password(
      user_id,
      password
    );

    if (frontend_errs.length === 0) {
      this.set_submitted(true);
      this.last_attempted_username = user_id;
      this.last_attempted_password = password;
      this.auth_client.send_login(user_id, password);
    } else {
      for (const err of frontend_errs) {
        this.growler.put_growl(err, "bad");
      }
    }
  }

  public on_successful_authentication(user_data: UserData) {
    let server_talker: IServerTalker = this.auth_client.deconstruct();
    SaveSuccessfulLogin.save_successful_login(this.last_attempted_username, this.last_attempted_password);
    this.growler.put_growl("Welcome, " + user_data.user_id + "!", "good");

    new ViewChanger().change_state_to_authmenu({
      user_data,
      server_talker,
    });
  }
}
