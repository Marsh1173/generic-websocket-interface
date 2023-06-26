import React from "react";
import "./SystemStatsStyles.less";
import { Component } from "react";
import { IClientGameSystem } from "../../../../model/game/gamesystem/ClientGameSystem";
import { SystemStatsManagerObserver } from "../../../../model/game/systemstatsmanager/SystemStatsManager";
import { Id, uuid } from "../../../../model/utils/Id";

interface SystemStatsComponentProps {
  game_system: IClientGameSystem;
}

interface SystemStatsComponentState {
  fps: number;
}

export class SystemStatsComponent
  extends Component<SystemStatsComponentProps, SystemStatsComponentState>
  implements SystemStatsManagerObserver
{
  private readonly component_ref: React.RefObject<HTMLDivElement> =
    React.createRef();
  public readonly id: Id = uuid();

  constructor(props: any) {
    super(props);
    this.state = { fps: 0 };

    this.update_fps = this.update_fps.bind(this);
    this.props.game_system.system_stats_manager.add_observer(this);
  }

  public render() {
    return (
      <div className="SystemStatsComponent" ref={this.component_ref}>
        <div className="row">
          <span>FPS:&nbsp;</span>
          <span>{Math.round(this.state.fps)}</span>
        </div>
      </div>
    );
  }

  public update_fps(new_fps: number) {
    if (this.component_ref.current) {
      this.setState({ fps: new_fps });
    } else {
      this.state = { ...this.state, fps: new_fps };
    }
  }

  public componentWillUnmount(): void {
    this.props.game_system.system_stats_manager.remove_observer(this.id);
  }
}
