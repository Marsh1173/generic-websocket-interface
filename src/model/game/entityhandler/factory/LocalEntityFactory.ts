import { Tree, TreeData } from "../../entities/tree/Tree";
import { EntityFactory } from "./EntityFactory";
import { TreeRenderable } from "../../entities/tree/TreeRenderable";
import { LocalGameSystem } from "../../gamesystem/LocalGameSystem";
import { Goblin, GoblinData } from "../../entities/goblin/Goblin";
import { GoblinRenderable } from "../../entities/goblin/GoblinRenderable";
import { Arrow, ArrowData } from "../../entities/arrow/Arrow";
import { ArrowRenderable } from "../../entities/arrow/ArrowRenderable";
import { LocalEntityHandler } from "../LocalEntityHandler";

export class LocalEntityFactory extends EntityFactory {
  constructor(protected readonly game_system: LocalGameSystem, protected readonly entity_handler: LocalEntityHandler) {
    super(game_system, entity_handler);
  }

  public arrow(data: ArrowData): Arrow {
    const arrow = super.arrow(data);
    this.game_system.display.canvas.insert_renderable(new ArrowRenderable(arrow, this.game_system));

    return arrow;
  }

  public tree(data: TreeData): Tree {
    const tree = super.tree(data);
    this.game_system.display.canvas.insert_renderable(new TreeRenderable(tree, this.game_system));

    return tree;
  }

  public goblin(data: GoblinData): Goblin {
    const goblin = super.goblin(data);
    this.game_system.display.canvas.insert_renderable(new GoblinRenderable(goblin, this.game_system));

    return goblin;
  }
}
