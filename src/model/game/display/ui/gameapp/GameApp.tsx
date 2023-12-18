import { Component } from "react";
import React from "react";
import { Application } from "pixi.js";
import "./GameAppStyles.less";
import { SystemStatsComponent } from "../systemstats/SystemStatsComponent";
import { ClientTicker } from "../../../../ticker/ClientTicker";
import { LocalGameSystemData, LocalGameSystem } from "../../../gamesystem/LocalGameSystem";
import { SideNav } from "../sidenav/SideNav";
import { Compass } from "../compass/Compass";
import { InventoryComponent } from "../inventory/InventoryComponent";

export interface GameAppProps {
  local_game_data: LocalGameSystemData;
  view_app: Application<HTMLCanvasElement>;
}

export interface GameAppState {
  open_inventory: boolean;
  open_menu: boolean;
}

export class GameApp extends Component<{ props: GameAppProps }, GameAppState> {
  protected readonly game_system: LocalGameSystem;
  protected readonly view_app: Application<HTMLCanvasElement>;
  protected readonly click_through_div_ref: React.RefObject<HTMLDivElement> = React.createRef();

  constructor(props: { props: GameAppProps }) {
    super(props);

    this.view_app = this.props.props.view_app;
    this.game_system = new LocalGameSystem(this.props.props.local_game_data, this.view_app);

    this.state = {
      open_inventory: false,
      open_menu: false,
    };
  }

  public render() {
    return (
      <div className="GameApp">
        <div className="click-through" ref={this.click_through_div_ref}>
          <SystemStatsComponent game_system={this.game_system}></SystemStatsComponent>
          <Compass></Compass>
        </div>
        <div className="click-stop">
          {this.state.open_inventory &&
            this.game_system.user_state_manager.state.type === "PlayerState" && ( // eventually observe the user state
              <InventoryComponent
                inventory={this.game_system.user_state_manager.state.goblin.inventory_module}
              ></InventoryComponent>
            )}
          <SideNav
            props={{
              ...this.state,
              on_open_inventory: () => {
                this.setState({ open_inventory: !this.state.open_inventory });
              },
            }}
          ></SideNav>
        </div>
      </div>
    );
  }

  public componentDidMount() {
    this.click_through_div_ref.current!.prepend(this.view_app.view);
    this.click_through_div_ref.current!.prepend(this.game_system.display._3d.get_dom_elem());

    ClientTicker.add(this.game_system);
  }

  public componentWillUnmount(): void {
    ClientTicker.remove(this.game_system.id);
  }
}
