import React from "react";
import { PropsWithChildren, ReactNode } from "react";
import { Component } from "react";
import "./BackdropStyles.less";

export interface BackdropProps extends PropsWithChildren {
  top_left?: ReactNode | undefined;
}

export class Backdrop extends Component<{ props: BackdropProps }, {}> {
  constructor(props: { props: BackdropProps }) {
    super(props);
  }

  public render() {
    return <div className="Backdrop"></div>;
  }
}
