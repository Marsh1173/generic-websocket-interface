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
  fps?: number;
  ping?: number;
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

    this.on_state_change = this.on_state_change.bind(this);
    this.state = { fps: undefined, ping: undefined };
    this.props.game_system.system_stats_manager.add_observer_and_get_state(
      this
    );
  }

  public render() {
    return (
      <div className="SystemStatsComponent" ref={this.component_ref}>
        {!!this.state.ping && (
          <div className="row">
            <span>PING (ms):&nbsp;</span>
            <span>{Math.round(this.state.ping)}</span>
          </div>
        )}
        {!!this.state.fps && (
          <div className="row">
            <span>FPS:&nbsp;</span>
            <span>{Math.round(this.state.fps)}</span>
          </div>
        )}
      </div>
    );
  }

  public on_state_change(new_state: SystemStatsManagerState): void {
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
