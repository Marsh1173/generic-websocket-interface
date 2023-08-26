import { HasId } from "../../../../utils/Id";
import { StaticPoint } from "../../../../utils/physics/geometry/Point";
import { Shape, LocalShapeVertices } from "../../../../utils/physics/geometry/Shape";

export interface StaticCollidableShapeWithId extends StaticCollidableShape, HasId {}

export interface StaticCollidableShape {
  readonly type: "StaticCollidableShape";
  readonly origin: StaticPoint;
  readonly shape: Shape;
}

export class StaticCollidableShapeModule implements StaticCollidableShape {
  public readonly type = "StaticCollidableShape";
  public readonly origin: StaticPoint;
  public readonly shape: Shape;

  constructor(data: StaticCollidableShapeData, shape_vertices: LocalShapeVertices) {
    this.origin = data.origin;
    this.shape = new Shape(shape_vertices, this.origin);
  }
}

export interface HasStaticCollidableShape {
  readonly game_space_data: StaticCollidableShape;
}

export interface StaticCollidableShapeData {
  origin: StaticPoint;
}
