import { StaticPoint } from "../../../../common/math/geometry/Point";

/**
 * Represents a portion of the map
 */
export class Chunk {
  /**
   * Chunk side length in units
   */
  public static readonly size: number = 8;

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
  }
}

export interface ChunkData {}
