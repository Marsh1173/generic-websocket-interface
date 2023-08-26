import { ArrowData, Arrow } from "../../entities/arrow/Arrow";
import { GoblinData, Goblin } from "../../entities/goblin/Goblin";
import { TreeData, Tree } from "../../entities/tree/Tree";
import { Entity } from "../../entitymodel/entity/Entity";
import { EntityData } from "../../entitymodel/entity/EntityData";
import { GameSystem } from "../../gamesystem/GameSystem";
import { EntityHandler } from "../EntityHandler";

export class EntityFactory {
  constructor(protected readonly game_system: GameSystem, protected readonly entity_handler: EntityHandler) {}

  public from_data(datas: EntityData[]) {
    datas.forEach((data) => {
      this.make_entity(data);
    });
  }

  private make_entity(data: EntityData): Entity {
    switch (data.type) {
      case "ArrowData":
        return this.arrow(data);
      case "TreeData":
        return this.tree(data);
      case "GoblinData":
        return this.goblin(data);
    }
  }

  public arrow(data: ArrowData): Arrow {
    const arrow: Arrow = new Arrow(data, this.game_system);
    this.entity_handler.insert(arrow);

    return arrow;
  }

  public tree(data: TreeData): Tree {
    const tree: Tree = new Tree(data, this.game_system);
    this.entity_handler.insert(tree);

    return tree;
  }

  public goblin(data: GoblinData): Goblin {
    const goblin: Goblin = new Goblin(data, this.game_system);
    this.entity_handler.insert(goblin);

    return goblin;
  }
}
