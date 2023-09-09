import { HasId } from "../../../../common/Id";
import { StaticPoint } from "../../../../common/physics/geometry/Point";
import {
  Shape,
  LocalShapeVertices,
} from "../../../../common/physics/geometry/Shape";

export interface StaticCollidableShapeWithId
  extends StaticCollidableShape,
    HasId {}

export interface StaticCollidableShape {
  readonly type: "StaticCollidableShape";
  readonly shape: Shape;
}

export class StaticCollidableShapeModule implements StaticCollidableShape {
  public readonly type = "StaticCollidableShape";
  public readonly shape: Shape;

  constructor(
    data: StaticCollidableShapeData,
    shape_vertices: LocalShapeVertices
  ) {
    this.shape = new Shape(shape_vertices, data.origin);
  }
}

export interface HasStaticCollidableShape {
  readonly game_space_data: StaticCollidableShape;
}

export interface StaticCollidableShapeData {
  origin: StaticPoint;
}
