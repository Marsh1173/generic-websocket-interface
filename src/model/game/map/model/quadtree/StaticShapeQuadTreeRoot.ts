import { HasId, Id } from "../../../../utils/Id";
import { Rect } from "../../../physics/geometry/Rect";
import { Shape } from "../../../physics/geometry/Shape";
import { StaticShapeQuadTreeNode } from "./StaticShapeQuadTreeNode";

export class StaticShapeQuadTree<ShapeType extends HasId & Shape> {
  protected readonly shapes: Map<Id, ShapeType> = new Map();
  protected readonly root: StaticShapeQuadTreeNode<ShapeType>;

  public constructor(dimensions: Rect) {
    this.root = new StaticShapeQuadTreeNode(dimensions.h, 0, 0, dimensions.w);
  }

  public insert(shape: ShapeType) {
    if (this.shapes.has(shape.id)) {
      console.error("TRIED TO ADD OBJECT THAT WAS ALREADY IN TREE:");
      console.error(JSON.stringify(shape));
      return;
    }

    this.shapes.set(shape.id, shape);
    this.root.recursive_insert(shape);
  }

  public remove(shape: ShapeType) {
    this.shapes.delete(shape.id);
    this.root.recursive_remove(shape);
  }

  public get_by_id(id: Id): ShapeType | undefined {
    return this.shapes.get(id);
  }
}
