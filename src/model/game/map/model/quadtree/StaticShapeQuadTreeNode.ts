import { HasId, Id } from "../../../../utils/Id";
import { Shape } from "../../../physics/geometry/Shape";
import { IsInBoundingBox } from "../../../physics/math/IsInBoundingBox";

const MAX_NODE_SIZE: number = 10;

export interface IStaticShapeQuadTreeNode<ShapeType extends HasId & Shape> {}

export class StaticShapeQuadTreeNode<ShapeType extends HasId & Shape> {
  /**This node contains all shapes completely contained in this node
   * (unless this node has subnodes, then excluding shapes that completely fit into the subnodes)
   */
  protected readonly shapes: Map<Id, ShapeType> = new Map();

  /** If this node has been subdivided, this node will contain 4 subnodes.
   *  Nodes in order: top right, top left, bottom left, bottom right;
   */
  protected nodes?: [
    StaticShapeQuadTreeNode<ShapeType>,
    StaticShapeQuadTreeNode<ShapeType>,
    StaticShapeQuadTreeNode<ShapeType>,
    StaticShapeQuadTreeNode<ShapeType>
  ];

  /**
   * Top and right are not inclusive;
   */
  constructor(
    protected readonly top: number,
    protected readonly left: number,
    protected readonly bottom: number,
    protected readonly right: number,
    protected readonly parent_node?: StaticShapeQuadTreeNode<ShapeType>
  ) {}

  public recursive_insert(shape: ShapeType) {
    if (this.nodes) {
      for (const node of this.nodes) {
        if (node.is_completely_in_bounding_box(shape)) {
          node.recursive_insert(shape);
          return;
        }
      }
      // Only insert into this if the shape doesn't completely fit into any child nodes but fits in this node.
      if (!this.parent_node || this.is_completely_in_bounding_box(shape)) {
        this.shapes.set(shape.id, shape);
      } else {
        this.parent_node.recursive_insert(shape);
      }
    } else {
      this.shapes.set(shape.id, shape);

      if (this.shapes.size > MAX_NODE_SIZE) {
        // Subdivide and distribute shapes.
        this.set_nodes();
        for (const [id, shape] of this.shapes) {
          this.shapes.delete(id);
          this.recursive_insert(shape);
        }
      }
    }
  }

  public recursive_remove(shape: ShapeType) {
    if (this.nodes) {
      for (const node of this.nodes) {
        if (node.is_completely_in_bounding_box(shape)) {
          node.recursive_remove(shape);
          return;
        }
      }
    }
    this.shapes.delete(shape.id);
  }

  public is_completely_in_bounding_box(shape: ShapeType): boolean {
    for (const v of shape.vertices) {
      if (!IsInBoundingBox(v, this.top, this.left, this.bottom, this.right)) {
        return false;
      }
    }
    return true;
  }

  protected set_nodes() {
    const mid_x: number = Math.floor(this.right + this.left) / 2;
    const mid_y: number = Math.floor(this.top + this.bottom) / 2;
    this.nodes = [
      new StaticShapeQuadTreeNode<ShapeType>(
        this.top,
        mid_x,
        mid_y,
        this.right,
        this
      ),
      new StaticShapeQuadTreeNode<ShapeType>(
        this.top,
        this.left,
        mid_y,
        mid_x,
        this
      ),
      new StaticShapeQuadTreeNode<ShapeType>(
        mid_y,
        this.left,
        this.bottom,
        mid_x,
        this
      ),
      new StaticShapeQuadTreeNode<ShapeType>(
        mid_y,
        mid_x,
        this.bottom,
        this.right,
        this
      ),
    ];
  }
}
