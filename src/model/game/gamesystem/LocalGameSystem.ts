import { Application, Assets, Sprite } from "pixi.js";
import { Entity } from "../entities/model/entity/Entity";
import { IEntityContainer } from "../entitycontainer/EntityContainer";
import { EntityQuadTree } from "../entitycontainer/EntityQuadTree";
import { LocalEntityFactory } from "../entityfactory/LocalEntityFactor";
import { LocalGameStateManager } from "../gamestatemanager/LocalGameStateManager";
import { HumanInputManager } from "../humaninput/HumanInputManager";
import { ClientGameSystemData } from "./ClientGameSystem";
import { GameSystem, GameSystemData } from "./GameSystem";
import { SystemStatsManager } from "../systemstatsmanager/SystemStatsManager";

export class LocalGameSystem extends GameSystem {
  declare entity_container: IEntityContainer;
  declare entity_factory: LocalEntityFactory;
  declare game_state_manager: LocalGameStateManager;
  public readonly human_input_manager: HumanInputManager;
  public readonly system_stats_manager: SystemStatsManager;

  constructor(
    data: LocalGameSystemData,
    public readonly view_app: Application
  ) {
    super(data);

    this.entity_container = new EntityQuadTree(data.map_size);
    this.entity_factory = new LocalEntityFactory();
    this.game_state_manager = new LocalGameStateManager(this);
    this.human_input_manager = new HumanInputManager(data.human_input_config);
    this.system_stats_manager = new SystemStatsManager();

    this.test();
  }

  public update(elapsed_time: number) {
    super.update(elapsed_time);
    this.system_stats_manager.update();
  }

  protected handle_inputs(elapsed_time: number): void {}

  protected update_all_entities(elapsed_time: number): void {
    this.entity_container.apply_to_all((entity: Entity) => {
      entity.movable_module?.update_position(elapsed_time);
    });

    if (this.img1 && this.img2) {
      this.img1.rotation += elapsed_time / 200;
      this.img2.rotation -= elapsed_time / 200;
    }
  }

  protected cleanup() {
    super.cleanup();
    this.human_input_manager.stop_listening();
  }

  private img1: Sprite | undefined;
  private img2: Sprite | undefined;
  private async test() {
    const texture = await Assets.load("images/test.png");

    this.img1 = new Sprite(texture);
    this.img2 = new Sprite(texture);

    this.img1.x = this.view_app.renderer.width / 2;
    this.img1.y = this.view_app.renderer.height / 2;

    this.img1.anchor.x = 0.5;
    this.img1.anchor.y = 0.5;
    this.img2.anchor.x = 0.5;
    this.img2.anchor.y = 0.5;

    this.view_app.stage.addChild(this.img1);
    this.view_app.stage.addChild(this.img2);
  }
}

export interface LocalGameSystemData extends ClientGameSystemData {}
