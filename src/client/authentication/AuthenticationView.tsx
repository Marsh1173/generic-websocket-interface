import React from "react";
import { Component } from "react";
import { AuthenticatorClient } from "./network/AuthenticatorClient";
import { FrontEndAuthenticationValidator } from "./utils/FrontEndAuthenticationValidator";
import { AuthenticationForm } from "./components/AuthenticationForm";
import { SaveSuccessfulLogin } from "./utils/SaveSuccessfulLogin";
import { SafeUserData } from "../../model/user/UserData";
import { IServerTalker } from "../network/ServerTalker";
import { GrowlService } from "../growl/GrowlService";
import { ViewChanger } from "../main/ViewChanger";

import "./AuthenticationStyles.less";

export interface AuthenticationViewProps {
  server_talker: IServerTalker;
}

export interface AuthenticationViewState {
  submitted: boolean;
}

export class AuthenticationView extends Component<
  { props: AuthenticationViewProps },
  AuthenticationViewState
> {
  private readonly auth_stw: AuthenticatorClient;
  private readonly growler: GrowlService = new GrowlService();

  constructor(props: { props: AuthenticationViewProps }) {
    super(props);

    this.state = {
      submitted: false,
    };

    this.auth_stw = new AuthenticatorClient(
      this.props.props.server_talker,
      this
    );

    this.set_submitted = this.set_submitted.bind(this);
    this.on_attempt_login = this.on_attempt_login.bind(this);
    this.on_successful_authentication =
      this.on_successful_authentication.bind(this);
  }

  public render() {
    return (
      <div className="AuthenticationView">
        <AuthenticationForm
          on_submit={this.on_attempt_login}
          submitted={this.state.submitted}
        ></AuthenticationForm>
      </div>
    );
  }

  public set_submitted(val: boolean) {
    this.setState({ submitted: val });
  }

  private last_attempted_username: string = "";
  private last_attempted_password: string = "";
  private on_attempt_login(user_id: string, password: string) {
    let frontend_errs: string[] =
      FrontEndAuthenticationValidator.front_end_validate_username_and_password(
        user_id,
        password
      );

    if (frontend_errs.length === 0) {
      this.set_submitted(true);
      this.last_attempted_username = user_id;
      this.last_attempted_password = password;
      this.auth_stw.send_login(user_id, password);
    } else {
      for (const err of frontend_errs) {
        this.growler.put_growl(err, "bad");
      }
    }
  }

  public on_successful_authentication(user_data: SafeUserData) {
    let server_talker: IServerTalker = this.auth_stw.deconstruct();
    SaveSuccessfulLogin.save_successful_login(
      this.last_attempted_username,
      this.last_attempted_password
    );
    this.growler.put_growl("Welcome, " + user_data.user_id + "!", "good");

    new ViewChanger().change_state_to_user({
      user_data,
      server_talker,
    });
  }
}
