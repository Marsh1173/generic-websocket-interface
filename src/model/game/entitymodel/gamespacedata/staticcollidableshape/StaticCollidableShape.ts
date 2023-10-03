import { HasId } from "../../../../common/Id";
import { StaticPoint } from "../../../../common/math/geometry/Point";
import { Shape, LocalShapeVertices } from "../../../../common/math/geometry/Shape";

export interface StaticCollidableShapeWithId extends StaticCollidableShape, HasId {}

export interface StaticCollidableShape {
  readonly type: "StaticCollidableShape";
  readonly shape: Shape;
  readonly pos: StaticPoint;
}

export class StaticCollidableShapeModule implements StaticCollidableShape {
  public readonly type = "StaticCollidableShape";
  public readonly shape: Shape;

  public get pos() {
    return this.shape.origin;
  }

  constructor(data: StaticCollidableShapeData, shape_vertices: LocalShapeVertices) {
    this.shape = new Shape(shape_vertices, data.origin);
  }
}

export interface HasStaticCollidableShape {
  readonly game_space_data: StaticCollidableShape;
}

export interface StaticCollidableShapeData {
  origin: StaticPoint;
}
