import { Application } from "pixi.js";
import { Tree, TreeData } from "../entities/tree/Tree";
import { EntityFactory } from "./EntityFactory";
import { TreeRenderable } from "../entities/tree/TreeRenderable";
import { LocalGameSystem } from "../gamesystem/LocalGameSystem";

export class LocalEntityFactory extends EntityFactory {
  constructor(
    protected readonly view_app: Application<HTMLCanvasElement>,
    protected readonly game_system: LocalGameSystem
  ) {
    super();
  }

  public tree(data: TreeData): Tree {
    const tree: Tree = new Tree(data, this.game_system);
    const renderable: TreeRenderable = new TreeRenderable(
      this.view_app,
      tree,
      this.game_system
    );
    // attach health observer
    return tree;
  }
}
