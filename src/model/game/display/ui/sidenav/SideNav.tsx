import React from "react";
import { Component } from "react";
import "./SideNavStyles.less";
import { SideNavButton } from "./SideNavButton";

export interface SideNavProps {
  open_inventory: boolean;
  open_menu: boolean;
  on_open_inventory: () => void;
}
interface SideNavState {}

export class SideNav extends Component<{ props: SideNavProps }, SideNavState> {
  constructor(props: { props: SideNavProps }) {
    super(props);

    this.state = {};
  }

  public render() {
    const buttons: [string, string, () => void, boolean][] = [
      [
        "./assets/images/icons/backpack.png",
        "Bag [B]",
        this.props.props.on_open_inventory,
        this.props.props.open_inventory,
      ],
      ["./assets/images/icons/hammer.png", "Craft [C]", () => {}, false],
      ["./assets/images/icons/diagram.png", "Talents [T]", () => {}, false],
      ["./assets/images/icons/menu.png", "Menu [P]", () => {}, false],
    ];

    const button_elements: JSX.Element[] = buttons.map((buttonData, index) => {
      return (
        <SideNavButton
          image={buttonData[0]}
          text={buttonData[1]}
          key={index}
          on_click={buttonData[2]}
          highlight={buttonData[3]}
        ></SideNavButton>
      );
    });
    return <div className="SideNav">{button_elements}</div>;
  }
}
