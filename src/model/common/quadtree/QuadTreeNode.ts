import { HasId, Id } from "../Id";
import { GTCollision } from "../math/collision/GTCollision";
import { StaticPoint } from "../math/geometry/Point";
import { GlobalRect } from "../math/geometry/Rect";

export type QuadTreeBranchNodeChildIndex = 0 | 1 | 2 | 3;

export abstract class QuadTreeNode<ItemType extends HasId> {
  /**
   * Top and right are not inclusive;
   */
  constructor(
    protected readonly dim: GlobalRect,
    protected readonly index: QuadTreeBranchNodeChildIndex
  ) {}

  public abstract insert(item: ItemType): void;
  public abstract remove(item: ItemType): void;
  public abstract get item_ids(): Set<Id>;

  public abstract item_falls_inside(item: ItemType): boolean;
  public point_falls_in_this_bounding_box(p: StaticPoint): boolean {
    return GTCollision.IsInBoundingBox(p, this.dim);
  }

  public bounding_box_intersects(box: GlobalRect): boolean {
    return GTCollision.BoundingBoxCollision(this.dim, box);
  }
}
