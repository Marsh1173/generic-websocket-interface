import { Entity } from "../entities/model/entity/Entity";
import { IEntityContainer } from "../entitycontainer/EntityContainer";
import { EntityQuadTree } from "../entitycontainer/EntityQuadTree";
import { LocalEntityFactory } from "../entityfactory/LocalEntityFactor";
import { LocalGameStateManager } from "../gamestatemanager/LocalGameStateManager";
import { HumanInputConfig } from "../humaninput/HumanInputConfig";
import { HumanInputManager } from "../humaninput/HumanInputManager";
import { GameSystem, GameSystemData } from "./GameSystem";

export class LocalGameSystem extends GameSystem {
  declare entity_container: IEntityContainer;
  declare entity_factory: LocalEntityFactory;
  declare game_state_manager: LocalGameStateManager;
  public human_input_manager: HumanInputManager;

  constructor(data: LocalGameSystemData) {
    super(data);

    this.entity_container = new EntityQuadTree(data.map_size);
    this.entity_factory = new LocalEntityFactory();
    this.game_state_manager = new LocalGameStateManager(this);
    this.human_input_manager = new HumanInputManager(data.human_input_config);
  }

  protected handle_inputs(elapsed_time: number): void {}

  protected update_all_entities(elapsed_time: number): void {
    this.entity_container.apply_to_all((entity: Entity) => {
      entity.movable_module?.update_position(elapsed_time);
    });
  }
}

export interface LocalGameSystemData extends GameSystemData {
  human_input_config: HumanInputConfig;
}
