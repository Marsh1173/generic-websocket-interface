/**
 * Represents a portion of the map
 */
export class Chunk {
  /**
   * Chunk side length in units
   */
  public static readonly size: number = 8;

  constructor(data: ChunkData) {}
}

export interface ChunkData {}
