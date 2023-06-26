import { Component } from "react";
import "./LocalGameStyles.less";
import React from "react";
import {
  LocalGameSystem,
  LocalGameSystemData,
} from "../../../model/game/gamesystem/LocalGameSystem";
import { Application } from "pixi.js";
import { ResolutionDimensions } from "../../../model/game/display/Resolution";
import { SystemStatsComponent } from "../common/systemstats/SystemStatsComponent";

export interface LocalGameComponentProps {
  local_game_data: LocalGameSystemData;
}

export class LocalGameComponent extends Component<
  { props: LocalGameComponentProps },
  {}
> {
  protected readonly game_system: LocalGameSystem;
  protected readonly view_app: Application<HTMLCanvasElement>;
  protected readonly view_ref: React.RefObject<HTMLDivElement> =
    React.createRef();

  constructor(props: { props: LocalGameComponentProps }) {
    super(props);

    const resolution =
      ResolutionDimensions[this.props.props.local_game_data.resolution];
    this.view_app = new Application<HTMLCanvasElement>({
      width: resolution.w,
      height: resolution.h,
      antialias: false,
      autoDensity: false,
    });

    this.game_system = new LocalGameSystem(
      this.props.props.local_game_data,
      this.view_app
    );

    this.update_game_system = this.update_game_system.bind(this);
  }

  public render() {
    return (
      <div className="LocalGameComponent" ref={this.view_ref}>
        <SystemStatsComponent
          game_system={this.game_system}
        ></SystemStatsComponent>
      </div>
    );
  }

  public componentDidMount() {
    this.view_ref.current!.appendChild(this.view_app.view);
    this.view_app.ticker.add(this.update_game_system);
  }

  public componentWillUnmount(): void {
    this.view_app.ticker.remove(this.update_game_system);
  }

  protected readonly update_game_system = (elapsed_time: number) => {
    this.game_system.update(elapsed_time);
  };
}
