import { StaticPoint } from "../../../../utils/physics/geometry/Point";
import {
  Shape,
  LocalShapeVertices,
} from "../../../../utils/physics/geometry/Shape";

export interface GameSpaceStaticCollidableShape {
  readonly type: "GameSpaceStaticCollidableShape";
  readonly origin: StaticPoint;
  readonly shape: Shape;
}

export class StaticCollidableShapeModule
  implements GameSpaceStaticCollidableShape
{
  public readonly type = "GameSpaceStaticCollidableShape";
  public readonly origin: StaticPoint;
  public readonly shape: Shape;

  constructor(
    data: GameSpaceStaticCollidableShapeData,
    shape_vertices: LocalShapeVertices
  ) {
    this.origin = data.origin;
    this.shape = new Shape(shape_vertices, this.origin);
  }
}

export interface HasGameSpaceStaticCollidableShape {
  readonly game_space_data: GameSpaceStaticCollidableShape;
}

export interface GameSpaceStaticCollidableShapeData {
  origin: StaticPoint;
}
