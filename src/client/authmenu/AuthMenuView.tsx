import "./AuthMenuStyles.less";
import { Component } from "react";
import React from "react";
import { UserData } from "../../model/user/UserData";
import { IServerTalker } from "../network/ServerTalker";

export type AuthMenuViewState = "main";

export interface AuthMenuProps {
  user_data: UserData;
  server_talker: IServerTalker;
}

export interface AuthMenuState {}

export class AuthMenuView extends Component<
  { props: AuthMenuProps },
  AuthMenuState
> {
  constructor(props: { props: AuthMenuProps }) {
    super(props);
  }

  public render() {
    return <div className="AuthMenuView">Auth Menu View</div>;
  }
}
