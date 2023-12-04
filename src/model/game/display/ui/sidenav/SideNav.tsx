import React from "react";
import { Component } from "react";
import "./SideNavStyles.less";
import { SideNavButton } from "./SideNavButton";

interface SideNavProps {}
interface SideNavState {}

export class SideNav extends Component<SideNavProps, SideNavState> {
  constructor(props: SideNavProps) {
    super(props);

    this.state = {};
  }

  public render() {
    const buttons: [string, string][] = [
      ["./assets/images/icons/backpack.png", "Bag [B]"],
      ["./assets/images/icons/hammer.png", "Craft [C]"],
      ["./assets/images/icons/diagram.png", "Talents [T]"],
      ["./assets/images/icons/menu.png", "Menu [P]"],
    ];

    const button_elements: JSX.Element[] = buttons.map((buttonData) => {
      return <SideNavButton image={buttonData[0]} text={buttonData[1]}></SideNavButton>;
    });
    return <div className="SideNav">{button_elements}</div>;
  }
}
