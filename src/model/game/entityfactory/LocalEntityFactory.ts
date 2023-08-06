import { Tree, TreeData } from "../entities/tree/Tree";
import { EntityFactory } from "./EntityFactory";
import { TreeRenderable } from "../entities/tree/TreeRenderable";
import { LocalGameSystem } from "../gamesystem/LocalGameSystem";
import { EntityData } from "../entitymodel/entity/EntityData";
import { Entity } from "../entitymodel/entity/Entity";
import { Goblin, GoblinData } from "../entities/goblin/Goblin";
import { GoblinRenderable } from "../entities/goblin/GoblinRenderable";
import { Arrow, ArrowData } from "../entities/arrow/Arrow";
import { ArrowRenderable } from "../entities/arrow/ArrowRenderable";

export class LocalEntityFactory extends EntityFactory {
  constructor(protected readonly game_system: LocalGameSystem) {
    super();
  }

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
    this.game_system.game_canvas.insert_renderable(
      new ArrowRenderable(arrow, this.game_system)
    );
    this.game_system.entity_container.insert(arrow);

    return arrow;
  }

  public tree(data: TreeData): Tree {
    const tree: Tree = new Tree(data, this.game_system);
    this.game_system.game_canvas.insert_renderable(
      new TreeRenderable(tree, this.game_system)
    );
    this.game_system.entity_container.insert(tree);
    // attach health observer
    return tree;
  }

  public goblin(data: GoblinData): Goblin {
    const goblin: Goblin = new Goblin(data, this.game_system);
    this.game_system.game_canvas.insert_renderable(
      new GoblinRenderable(goblin, this.game_system)
    );
    this.game_system.entity_container.insert(goblin);
    //renderable, health observer, input, states, ui, blegh
    return goblin;
  }
}
