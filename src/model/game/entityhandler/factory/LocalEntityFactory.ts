import { Tree, TreeData } from "../../entities/tree/Tree";
import { EntityFactory } from "./EntityFactory";
import { LocalGameSystem } from "../../gamesystem/LocalGameSystem";
import { Goblin, GoblinData } from "../../entities/goblin/Goblin";
import { Arrow, ArrowData } from "../../entities/arrow/Arrow";
import { LocalEntityHandler } from "../LocalEntityHandler";
import { Sheep, SheepData } from "../../entities/sheep/Sheep";
import { ItemEntityData, ItemEntity } from "../../entities/itementity/ItemEntity";
import { ArrowSceneObjectGroup } from "../../entities/arrow/sceneobject/ArrowSceneObject";
import { ItemEntitySceneObjectGroup } from "../../entities/itementity/sceneobject/ItemEntitySceneObject";
import { GoblinSceneObjectGroup } from "../../entities/goblin/sceneobject/GoblinSceneObject";
import { TreeSceneObjectGroup } from "../../entities/tree/sceneobject/TreeSceneObject";
import { SheepSceneObjectGroup } from "../../entities/sheep/sceneobject/SheepSceneObject";

export class LocalEntityFactory extends EntityFactory {
  constructor(protected readonly game_system: LocalGameSystem, protected readonly entity_handler: LocalEntityHandler) {
    super(game_system, entity_handler);
  }

  public arrow(data: ArrowData): Arrow {
    const arrow = super.arrow(data);
    new ArrowSceneObjectGroup(this.game_system.display, arrow).insert();

    return arrow;
  }

  public tree(data: TreeData): Tree {
    const tree = super.tree(data);
    new TreeSceneObjectGroup(this.game_system.display, tree).insert();

    return tree;
  }

  public goblin(data: GoblinData): Goblin {
    const goblin = super.goblin(data);
    new GoblinSceneObjectGroup(this.game_system.display, goblin).insert();

    return goblin;
  }

  public sheep(data: SheepData): Sheep {
    const sheep = super.sheep(data);
    new SheepSceneObjectGroup(this.game_system.display, sheep).insert();

    return sheep;
  }

  public item_entity(data: ItemEntityData): ItemEntity {
    const item_entity = super.item_entity(data);
    new ItemEntitySceneObjectGroup(this.game_system.display, item_entity).insert();

    return item_entity;
  }
}
