import { HasId } from "../../../../common/Id";
import { StaticPoint } from "../../../../common/math/geometry/Point";
import { Shape, LocalShapeVertices } from "../../../../common/math/geometry/Shape";

export interface StaticCollidableShapeWithId extends StaticCollidableShape, HasId {}

export interface StaticCollidableShape {
  readonly type: "StaticCollidableShape";
  readonly tiles: StaticPoint[];
  readonly pos: StaticPoint;
}

export class StaticCollidableShapeModule implements StaticCollidableShape {
  public readonly type = "StaticCollidableShape";
  public readonly tiles: StaticPoint[];
  public readonly pos: StaticPoint;

  constructor(data: StaticCollidableShapeData, local_tiles: StaticPoint[]) {
    this.pos = data.pos;
    this.tiles = StaticCollidableShapeModule.map_local_tiles_to_global_tiles(local_tiles, this.pos);
  }

  private static map_local_tiles_to_global_tiles(local_tiles: StaticPoint[], pos: StaticPoint): StaticPoint[] {
    return local_tiles.map((local_tile) => {
      return {
        x: local_tile.x + Math.floor(pos.x),
        y: local_tile.y + Math.floor(pos.y),
      };
    });
  }
}

export interface HasStaticCollidableShape {
  readonly game_space_data: StaticCollidableShape;
}

export interface StaticCollidableShapeData {
  pos: StaticPoint;
}
