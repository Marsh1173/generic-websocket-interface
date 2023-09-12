import { Tree, TreeData } from "../../entities/tree/Tree";
import { EntityFactory } from "./EntityFactory";
import { LocalGameSystem } from "../../gamesystem/LocalGameSystem";
import { Goblin, GoblinData } from "../../entities/goblin/Goblin";
import { Arrow, ArrowData } from "../../entities/arrow/Arrow";
import { LocalEntityHandler } from "../LocalEntityHandler";
import { Sheep, SheepData } from "../../entities/sheep/Sheep";
import { SheepSpriteHandler } from "../../entities/sheep/sprite/SheepSpriteHandler";
import { ArrowSpriteHandler } from "../../entities/arrow/sprite/ArrowSpriteHandler";
import { TreeSpriteHandler } from "../../entities/tree/sprite/TreeSpriteHandler";
import { GoblinSpriteHandler } from "../../entities/goblin/sprite/GoblinSpriteHandler";

export class LocalEntityFactory extends EntityFactory {
  constructor(
    protected readonly game_system: LocalGameSystem,
    protected readonly entity_handler: LocalEntityHandler
  ) {
    super(game_system, entity_handler);
  }

  public arrow(data: ArrowData): Arrow {
    const arrow = super.arrow(data);
    this.game_system.display.canvas.insert_sprite_handler(
      new ArrowSpriteHandler(arrow, this.game_system)
    );

    return arrow;
  }

  public tree(data: TreeData): Tree {
    const tree = super.tree(data);
    this.game_system.display.canvas.insert_sprite_handler(
      new TreeSpriteHandler(tree, this.game_system)
    );

    return tree;
  }

  public goblin(data: GoblinData): Goblin {
    const goblin = super.goblin(data);
    this.game_system.display.canvas.insert_sprite_handler(
      new GoblinSpriteHandler(goblin, this.game_system)
    );

    return goblin;
  }

  public sheep(data: SheepData): Sheep {
    const sheep = super.sheep(data);
    this.game_system.display.canvas.insert_sprite_handler(
      new SheepSpriteHandler(sheep, this.game_system)
    );

    return sheep;
  }
}
