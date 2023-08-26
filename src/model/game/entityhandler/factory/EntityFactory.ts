import { ArrowData, Arrow } from "../../entities/arrow/Arrow";
import { GoblinData, Goblin } from "../../entities/goblin/Goblin";
import { TreeData, Tree } from "../../entities/tree/Tree";
import { Entity } from "../../entitymodel/entity/Entity";
import { EntityData } from "../../entitymodel/entity/EntityData";
import { GameSystem } from "../../gamesystem/GameSystem";

export class EntityFactory {
  constructor(protected readonly game_system: GameSystem) {}

  public insert_entities(datas: EntityData[]) {
    datas.forEach((data) => {
      this.entity(data);
    });
  }

  private entity(data: EntityData): Entity {
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
    this.game_system.entity_container.insert(arrow);

    return arrow;
  }

  public tree(data: TreeData): Tree {
    const tree: Tree = new Tree(data, this.game_system);
    this.game_system.entity_container.insert(tree);

    // attach health observer
    return tree;
  }

  public goblin(data: GoblinData): Goblin {
    const goblin: Goblin = new Goblin(data, this.game_system);
    this.game_system.entity_container.insert(goblin);

    //renderable, health observer, input, states, ui, blegh
    return goblin;
  }
}
