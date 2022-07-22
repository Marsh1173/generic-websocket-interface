import React, { Component, createElement } from "react";
import { LoggingInPresenter } from "../../Presenter/LoggingInAppState";
import { TitledTextInput } from "../Partials/TitledTextInput";
import { sleep } from "../../../model/Misc/Sleep";

export interface LoginViewProps {
  presenter: LoggingInPresenter
}

export class LoginView extends Component<LoginViewProps, {login_type: string, if_attempting: boolean}> {

  private readonly username_ref: React.RefObject<TitledTextInput> = React.createRef();
  private readonly password_ref: React.RefObject<TitledTextInput> = React.createRef();
  private readonly confirm_password_ref: React.RefObject<TitledTextInput> = React.createRef();
  
  constructor(props: LoginViewProps) {
    super(props);
    this.state = { login_type: "login", if_attempting: false };
  }
  render() {
    return (
      <div className="LoginView">
        {this.state.login_type === "login" && (
          <div className="LoggingInView">
            <TitledTextInput name="Username" max_length={16} ref={this.username_ref}></TitledTextInput>
            <TitledTextInput name="Password" max_length={16} type="password" ref={this.password_ref}></TitledTextInput>
            {this.state.if_attempting === true && (
              <button className="disabled-button">
                <span>Logging in...</span>
              </button>
            )}
            {this.state.if_attempting === false && (
              <button className="login-button" onClick={() => this.on_attempt_login()}>
                <span>Login</span>
              </button>
            )}
            <button className="text-button" onClick={() => {
              if(!this.state.if_attempting) {
                this.setState({ login_type: "register", if_attempting: false })
              }
            }}><span>Create an account</span></button>
          </div>
        )}
        {this.state.login_type === "register" && (
          <div className="RegisterView">
            <TitledTextInput name="Username" max_length={16} ref={this.username_ref}></TitledTextInput>
            <TitledTextInput name="Password" max_length={16} type="password" ref={this.password_ref}></TitledTextInput>
            <TitledTextInput name="Confirm Password" max_length={16} type="password" ref={this.confirm_password_ref}></TitledTextInput>
            {this.state.if_attempting === true && (
              <button className="disabled-button">
                <span>Registering...</span>
              </button>
            )}
            {this.state.if_attempting === false && (
              <button className="register-button" onClick={this.on_attempt_register}>
                <span>Create Account</span>
              </button>
            )}
            <span>DISCLAIMER: Do NOT use your favorite passwords as this is not a secure system.</span>
            <button className="text-button" onClick={() => {
              if(!this.state.if_attempting) {
                this.setState({ login_type: "login", if_attempting: false })
              }
            }}><span>Log In</span></button>
          </div>
        )}
      </div>
    );
  }

  componentDidMount() {

    this.props.presenter.request_local_account_info().then(async val => {

      while (!this.username_ref.current || !this.password_ref.current) {
        await sleep(200);
      }

      this.username_ref.current.set_value(val.name);
      this.password_ref.current.set_value(val.password);
    });
  }

  private on_attempt_login() {
    if(this.username_ref.current && this.password_ref.current) {
      this.setState({ login_type: "login", if_attempting: true });
      this.props.presenter.on_attempt_login(this.username_ref.current.get_value(), this.password_ref.current.get_value(), () => {
        this.setState({ login_type: "login", if_attempting: false });
      });
    }
  }
  private on_attempt_register() {
    if(this.username_ref.current && this.password_ref.current && this.confirm_password_ref.current) {
      this.setState({ login_type: "register", if_attempting: true });
      this.props.presenter.on_attempt_register(this.username_ref.current.get_value(), this.password_ref.current.get_value(), this.confirm_password_ref.current.get_value(), () => {
        this.setState({ login_type: "register", if_attempting: false });
      });
    }
  }
}
