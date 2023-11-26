import { GridDict } from "../../../../common/GridDict";
import { Id } from "../../../../common/Id";
import { StaticPoint } from "../../../../common/math/geometry/Point";

export interface ChunkData {
  collidable_data?: [string, Id[]][] | undefined;
}

/**
 * Represents a portion of the map
 */
export class Chunk {
  /**
   * Chunk side length in units
   */
  public static readonly size: number = 8;

  /**
   *
   * @param pos corner closest to origin
   */

  public readonly collidable_map: GridDict<Id[]>;

  constructor(data: ChunkData, public readonly pos: StaticPoint) {
    //doodads
    //state
    this.collidable_map = new GridDict<Id[]>(data.collidable_data);
  }
}
