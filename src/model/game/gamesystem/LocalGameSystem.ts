import { Application } from "pixi.js";
import { IEntityContainer } from "../entitycontainer/EntityContainer";
import { EntityQuadTree } from "../entitycontainer/EntityQuadTree";
import { LocalEntityFactory } from "../entityhandler/factory/LocalEntityFactory";
import { LocalGameStateManager } from "../gamestatemanager/LocalGameStateManager";
import { ClientGameSystemData } from "./ClientGameSystem";
import { GameSystem } from "./GameSystem";
import { SystemStatsManager } from "../systemstatsmanager/SystemStatsManager";
import { GameCanvas } from "../display/gamecanvas/GameCanvas";
import { LocalGameSystemIO } from "../gamesytemio/LocalGameSystemIO";
import { LocalUserStateManager } from "../userstatemanager/LocalUserStateManager";
import { ShowCursor } from "../devtools/ShowCursor";
import { EntityHandler } from "../entityhandler/EntityHandler";
import { LocalEntityHandler } from "../entityhandler/LocalEntityHandler";

export class LocalGameSystem extends GameSystem {
  public declare entities: LocalEntityHandler;
  declare entity_container: IEntityContainer;
  declare entity_factory: LocalEntityFactory;
  declare game_state_manager: LocalGameStateManager;
  public readonly user_state_manager: LocalUserStateManager;
  public readonly system_stats_manager: SystemStatsManager;
  public readonly game_system_io: LocalGameSystemIO;
  public readonly game_canvas: GameCanvas;

  constructor(
    data: LocalGameSystemData,
    public readonly view_app: Application<HTMLCanvasElement>
  ) {
    super(data);

    this.game_system_io = new LocalGameSystemIO(data);
    this.entity_container = new EntityQuadTree(data.map_size);
    this.game_canvas = new GameCanvas(this.view_app);
    this.entity_factory = new LocalEntityFactory(this);
    this.game_state_manager = new LocalGameStateManager(this);
    this.system_stats_manager = new SystemStatsManager();
    this.user_state_manager = new LocalUserStateManager(
      this,
      data.user_state_data
    );

    this.entity_factory.insert_entities(data.entities);

    ShowCursor(this.view_app, this.game_system_io);
  }

  public update(elapsed_seconds: number) {
    super.update(elapsed_seconds);
    this.system_stats_manager.update();
  }

  protected update_all_entities(elapsed_seconds: number): void {
    this.entity_container.perform_all_behaviors(elapsed_seconds);
    this.entity_container.process_all_physics(elapsed_seconds);

    this.game_canvas.update_all_renderables(elapsed_seconds);
  }
}

export interface LocalGameSystemData extends ClientGameSystemData {}
