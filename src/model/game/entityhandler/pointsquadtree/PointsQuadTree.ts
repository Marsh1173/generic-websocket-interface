import { Id } from "../../../common/Id";
import { StaticPoint } from "../../../common/math/geometry/Point";
import { Rect } from "../../../common/math/geometry/Rect";
import { QuadTree } from "../../../common/quadtree2/QuadTree";
import { Entity } from "../../entitymodel/entity/Entity";
import { PointsQuadTreeBranchNode } from "./PointsQuadTreeBranchNode";
import { PointsQuadTreeLeafNode } from "./PointsQuadTreeLeafNode";
import { PointsQuadTreeSearcher } from "./PointsQuadTreeSearcher";

export class PointsQuadTree<EntityType extends Entity> extends QuadTree<
  EntityType,
  PointsQuadTreeLeafNode<EntityType>,
  PointsQuadTreeBranchNode<EntityType>,
  PointsQuadTreeSearcher<EntityType>
> {
  protected readonly root: PointsQuadTreeBranchNode<EntityType>;
  public readonly search: PointsQuadTreeSearcher<EntityType>;

  constructor(size: Rect) {
    super(size);

    this.root = new PointsQuadTreeBranchNode<EntityType>(
      this.dim,
      0,
      0,
      this.max_depth,
      this.items,
      new Set()
    );

    this.search = new PointsQuadTreeSearcher(this.items, this.root);
  }

  public re_insert_point(id: Id, prev_pos: StaticPoint) {
    const item = this.items.get(id);
    if (item) {
      this.root.re_insert_point(id, prev_pos, item);
    }
  }
}
