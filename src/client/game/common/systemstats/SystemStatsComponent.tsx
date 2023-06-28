import React from "react";
import "./SystemStatsStyles.less";
import { Component } from "react";
import { IClientGameSystem } from "../../../../model/game/gamesystem/ClientGameSystem";
import { SystemStatsManagerState } from "../../../../model/game/systemstatsmanager/SystemStatsManager";
import { Id, uuid } from "../../../../model/utils/Id";
import { StateObserver } from "../../../../model/utils/observer/StateObserver";

interface SystemStatsComponentProps {
  game_system: IClientGameSystem;
}

interface SystemStatsComponentState {
  fps: number;
}

export class SystemStatsComponent
  extends Component<SystemStatsComponentProps, SystemStatsComponentState>
  implements StateObserver<SystemStatsManagerState>
{
  private readonly component_ref: React.RefObject<HTMLDivElement> =
    React.createRef();
  public readonly id: Id = uuid();

  constructor(props: any) {
    super(props);

    this.update_entire_state = this.update_entire_state.bind(this);
    this.state = this.props.game_system.system_stats_manager.add_observer(this);
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

  public update_entire_state(new_state: SystemStatsManagerState): void {
    if (this.component_ref.current) {
      this.setState(new_state);
    } else {
      this.state = new_state;
    }
  }

  public componentWillUnmount(): void {
    this.props.game_system.system_stats_manager.remove_observer(this.id);
  }
}
