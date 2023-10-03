import { Application } from "pixi.js";
import { LocalGameStateManager } from "../gamestatemanager/LocalGameStateManager";
import { ClientGameSystemData } from "./ClientGameSystem";
import { GameSystem } from "./GameSystem";
import { SystemStatsManager } from "../systemstatsmanager/SystemStatsManager";
import { LocalGameSystemIO } from "../gamesytemio/LocalGameSystemIO";
import { LocalUserStateManager } from "../userstatemanager/LocalUserStateManager";
import { LocalEntityHandler, LocalEntityHandlerApi } from "../entityhandler/LocalEntityHandler";
import { GameDisplay } from "../display/GameDisplay";
import { ShowTilingGround } from "../devtools/TilingGround";
import { ShowCursor } from "../devtools/ShowCursor";
import { ShowEntityOrigin } from "../devtools/EntityOriginSprite";

export class LocalGameSystem extends GameSystem {
  public declare entities: LocalEntityHandlerApi;
  declare game_state_manager: LocalGameStateManager;
  public readonly user_state_manager: LocalUserStateManager;
  public readonly system_stats_manager: SystemStatsManager;
  public readonly game_system_io: LocalGameSystemIO;
  public readonly display: GameDisplay;

  constructor(data: LocalGameSystemData, public readonly view_app: Application<HTMLCanvasElement>) {
    super(data);

    this.game_system_io = new LocalGameSystemIO(data, this);
    this.entities = new LocalEntityHandler(this, data.map_size);
    this.display = new GameDisplay(data.display_config, this.view_app);
    this.game_state_manager = new LocalGameStateManager(this);
    this.system_stats_manager = new SystemStatsManager();
    this.user_state_manager = new LocalUserStateManager(this, data.user_state_data);

    this.entities.make.from_data(data.entities);

    ShowTilingGround(this, view_app);
  }

  public update(elapsed_seconds: number) {
    this.display.camera.update(elapsed_seconds);

    super.update(elapsed_seconds);

    this.display.canvas.update_all_renderables(elapsed_seconds);
    this.system_stats_manager.update();
  }

  protected update_all_entities(elapsed_seconds: number): void {
    this.entities.perform_all_behaviors(elapsed_seconds);
    this.entities.physics.execute(elapsed_seconds);
  }
}

export interface LocalGameSystemData extends ClientGameSystemData {}
