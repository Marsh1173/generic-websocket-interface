import React from "react";
import { Component } from "react";

export interface AuthMenuMainViewProps {}

export class AuthMenuMainView extends Component<
  { props: AuthMenuMainViewProps },
  {}
> {
  constructor(props: { props: AuthMenuMainViewProps }) {
    super(props);
  }

  public render() {
    return <div className="AuthMenuMainView"></div>;
  }
}
