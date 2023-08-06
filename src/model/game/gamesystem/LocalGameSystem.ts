import { Application, Assets, Sprite } from "pixi.js";
import { Entity } from "../entitymodel/entity/Entity";
import { IEntityContainer } from "../entitycontainer/EntityContainer";
import { EntityQuadTree } from "../entitycontainer/EntityQuadTree";
import { LocalEntityFactory } from "../entityfactory/LocalEntityFactory";
import { LocalGameStateManager } from "../gamestatemanager/LocalGameStateManager";
import { HumanInputManager } from "../humaninput/HumanInputManager";
import { ClientGameSystemData } from "./ClientGameSystem";
import { GameSystem } from "./GameSystem";
import { SystemStatsManager } from "../systemstatsmanager/SystemStatsManager";
import { GameCanvas } from "../display/gamecanvas/GameCanvas";
import { ClientStateManager } from "../clientstatemanager/clientstatemanager";

export class LocalGameSystem extends GameSystem {
  declare entity_container: IEntityContainer;
  declare entity_factory: LocalEntityFactory;
  declare game_state_manager: LocalGameStateManager;
  public readonly human_input_manager: HumanInputManager;
  public readonly client_state_manager: ClientStateManager;
  public readonly system_stats_manager: SystemStatsManager;
  public readonly game_canvas: GameCanvas;

  constructor(
    data: LocalGameSystemData,
    public readonly view_app: Application<HTMLCanvasElement>
  ) {
    super(data);

    this.entity_container = new EntityQuadTree(data.map_size);
    this.game_canvas = new GameCanvas(this.view_app);
    this.entity_factory = new LocalEntityFactory(this);
    this.game_state_manager = new LocalGameStateManager(this);
    this.human_input_manager = new HumanInputManager(data.human_input_config);
    this.system_stats_manager = new SystemStatsManager();

    this.entity_factory.insert_entities(data.entities);

    this.client_state_manager = new ClientStateManager(
      data.client_state_data,
      this
    );
  }

  public update(elapsed_seconds: number) {
    super.update(elapsed_seconds);
    this.system_stats_manager.update();
  }

  protected handle_inputs(elapsed_seconds: number): void {}

  protected update_all_entities(elapsed_seconds: number): void {
    this.entity_container.perform_all_behaviors(elapsed_seconds);
    this.entity_container.process_all_physics(elapsed_seconds);

    this.game_canvas.update_all_renderables(elapsed_seconds);
  }

  protected cleanup() {
    super.cleanup();
    this.human_input_manager.stop_listening();
  }
}

export interface LocalGameSystemData extends ClientGameSystemData {}
