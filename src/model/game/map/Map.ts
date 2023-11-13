import { Chunk, ChunkData } from "./chunk/Chunk";

/**
 * Represents the entire playing area
 */
export class Map {
  /**
   * [X, Y]
   */
  protected readonly chunks: Chunk[][];

  constructor(data: MapData) {
    this.chunks = data.chunk_data.map((chunk_data_column) => {
      return chunk_data_column.map((single_chunk_data) => new Chunk(single_chunk_data));
    });
  }
}

export interface MapData {
  chunk_data: ChunkData[][];
}
