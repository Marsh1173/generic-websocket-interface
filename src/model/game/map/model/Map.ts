import { StaticRect } from "../../../common/math/geometry/Rect";
import { Chunk, ChunkData } from "./chunk/Chunk";

/**
 * Represents the entire playing area
 */
export class Map {
  /**
   * [X, Y]
   */
  public readonly chunks: Chunk[][];

  public readonly dimesions: StaticRect;

  constructor(data: MapData) {
    this.chunks = data.chunk_data.map((chunk_data_column, i) => {
      return chunk_data_column.map(
        (single_chunk_data, j) => new Chunk(single_chunk_data, { x: i * Chunk.size, y: j * Chunk.size })
      );
    });

    this.dimesions = { w: data.chunk_data.length * Chunk.size, h: data.chunk_data[0].length * Chunk.size };
  }
}

export interface MapData {
  chunk_data: ChunkData[][];
}
