import { Application } from "pixi.js";
import { LocalGameStateManager } from "../gamestatemanager/LocalGameStateManager";
import { ClientGameSystemData } from "./ClientGameSystem";
import { GameSystem } from "./GameSystem";
import { SystemStatsManager } from "../systemstatsmanager/SystemStatsManager";
import { LocalGameSystemIO } from "../gamesytemio/LocalGameSystemIO";
import { LocalUserStateManager } from "../userstatemanager/LocalUserStateManager";
import { LocalEntityHandler, LocalEntityHandlerApi } from "../entityhandler/LocalEntityHandler";
import { GameDisplay } from "../display/GameDisplay";
import { ChunkSceneObjectGroup } from "../map/model/chunk/ChunkSceneObject";

export class LocalGameSystem extends GameSystem {
  public declare entities: LocalEntityHandlerApi;
  declare game_state_manager: LocalGameStateManager;
  public readonly user_state_manager: LocalUserStateManager;
  public readonly system_stats_manager: SystemStatsManager;
  public readonly game_system_io: LocalGameSystemIO;
  public readonly display: GameDisplay;

  constructor(data: LocalGameSystemData, public readonly view_app: Application<HTMLCanvasElement>) {
    super(data);

    this.system_stats_manager = new SystemStatsManager();
    this.game_system_io = new LocalGameSystemIO(this);
    this.entities = new LocalEntityHandler(this, data.map_data);
    this.game_state_manager = new LocalGameStateManager(this);
    this.display = new GameDisplay(data.display_config, this);
    this.user_state_manager = new LocalUserStateManager(this, data.user_state_data);

    this.entities.make.from_data(data.entities);

    this.entities.game_map.chunks.forEach((row) =>
      row.forEach((chunk) => {
        new ChunkSceneObjectGroup(this.display, chunk).insert();
      })
    );
  }

  public update(elapsed_seconds: number) {
    super.update(elapsed_seconds);

    this.display.game_camera.update(elapsed_seconds);
    this.display._3d.camera.update();

    this.display.scene.update_all_scene_object_groups(elapsed_seconds);
    this.system_stats_manager.update();

    this.display._3d.render(elapsed_seconds);
  }

  protected update_all_entities(elapsed_seconds: number): void {
    this.entities.perform_all_behaviors(elapsed_seconds);
    this.entities.physics.execute(elapsed_seconds);
  }
}

export interface LocalGameSystemData extends ClientGameSystemData {}
