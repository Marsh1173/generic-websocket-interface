import { Id } from "../../../../common/Id";
import { StaticPoint } from "../../../../common/math/geometry/Point";

export interface ChunkData {}

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
  constructor(data: ChunkData, public readonly pos: StaticPoint) {
    /**
     * Determine APIs
     *
     * Finding entities
     * Containing entities
     * Updating entities
     *
     * Or make map operators (searchers, offloaders, reinserters)
     *
     * Containing collision data
     * Containing doodads
     * Containing buildings
     */

    this.collidable_map = Chunk.make_empty_collidable_map();
  }

  //doodads
  //state
  public readonly collidable_map: Set<Id>[][];

  private static make_empty_collidable_map(): Set<Id>[][] {
    const outer: Set<Id>[][] = [];
    for (let i: number = 0; i < this.size; i++) {
      outer.push([]);
      for (let j: number = 0; j < this.size; j++) {
        outer[i].push(new Set());
      }
    }
    return outer;
  }
}
