import { Component } from "react";
import "./LocalGameStyles.less";
import React from "react";
import { LocalGameSystem, LocalGameSystemData } from "../../../model/game/gamesystem/LocalGameSystem";
import { Application } from "pixi.js";
import { SystemStatsComponent } from "../common/systemstats/SystemStatsComponent";
import { ClientTicker } from "../../../model/ticker/ClientTicker";

export interface LocalGameComponentProps {
  local_game_data: LocalGameSystemData;
  view_app: Application<HTMLCanvasElement>;
}

export class LocalGameComponent extends Component<{ props: LocalGameComponentProps }, {}> {
  protected readonly game_system: LocalGameSystem;
  protected readonly view_app: Application<HTMLCanvasElement>;
  protected readonly view_ref: React.RefObject<HTMLDivElement> = React.createRef();

  constructor(props: { props: LocalGameComponentProps }) {
    super(props);

    this.view_app = this.props.props.view_app;

    this.game_system = new LocalGameSystem(this.props.props.local_game_data, this.view_app);
  }

  public render() {
    return (
      <div className="LocalGameComponent" ref={this.view_ref}>
        <SystemStatsComponent game_system={this.game_system}></SystemStatsComponent>
      </div>
    );
  }

  public componentDidMount() {
    this.view_ref.current!.prepend(this.view_app.view);
    this.view_ref.current!.prepend(this.game_system.display._3d.get_dom_elem());

    ClientTicker.add(this.game_system);
  }

  public componentWillUnmount(): void {
    ClientTicker.remove(this.game_system.id);
  }
}
