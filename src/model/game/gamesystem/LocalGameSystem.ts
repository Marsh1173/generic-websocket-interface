import { Application, Assets, Sprite } from "pixi.js";
import { Entity } from "../entitymodel/entity/Entity";
import { IEntityContainer } from "../entitycontainer/EntityContainer";
import { EntityQuadTree } from "../entitycontainer/EntityQuadTree";
import { LocalEntityFactory } from "../entityfactory/LocalEntityFactory";
import { LocalGameStateManager } from "../gamestatemanager/LocalGameStateManager";
import { HumanInputManager } from "../humaninput/HumanInputManager";
import { ClientGameSystemData } from "./ClientGameSystem";
import { GameSystem, GameSystemData } from "./GameSystem";
import { SystemStatsManager } from "../systemstatsmanager/SystemStatsManager";
import { Renderables } from "../display/renderables/Renderables";

export class LocalGameSystem extends GameSystem {
  declare entity_container: IEntityContainer;
  declare entity_factory: LocalEntityFactory;
  declare game_state_manager: LocalGameStateManager;
  public readonly human_input_manager: HumanInputManager;
  public readonly system_stats_manager: SystemStatsManager;
  public readonly renderables: Renderables;

  constructor(
    data: LocalGameSystemData,
    public readonly view_app: Application<HTMLCanvasElement>
  ) {
    super(data);

    this.entity_container = new EntityQuadTree(data.map_size);
    this.renderables = new Renderables();
    this.entity_factory = new LocalEntityFactory(this.view_app, this);
    this.game_state_manager = new LocalGameStateManager(this);
    this.human_input_manager = new HumanInputManager(data.human_input_config);
    this.system_stats_manager = new SystemStatsManager();

    this.entity_factory.tree({
      type: "TreeData",
      game_space_data: { origin: { x: 500, y: 500 } },
      health_module_data: { max_health: 100 },
    });
  }

  public update(elapsed_time: number) {
    super.update(elapsed_time);
    this.system_stats_manager.update();
  }

  protected handle_inputs(elapsed_time: number): void {}

  protected update_all_entities(elapsed_time: number): void {
    this.entity_container.apply_to_all((entity: Entity) => {
      // entity.movable_module?.update_position(elapsed_time);
    });

    this.renderables.apply_to_all_renderables((renderable) => {
      renderable.update(elapsed_time);
    });
  }

  protected cleanup() {
    super.cleanup();
    this.human_input_manager.stop_listening();
  }
}

export interface LocalGameSystemData extends ClientGameSystemData {}
