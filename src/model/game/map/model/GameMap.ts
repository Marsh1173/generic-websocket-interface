import { StaticPoint } from "../../../common/math/geometry/Point";
import { StaticRect } from "../../../common/math/geometry/Rect";
import { Chunk, ChunkData } from "./chunk/Chunk";
import { MapCollisionApi } from "./handlers/CollisionApi";

export interface MapData {
  chunk_data: ChunkData[][];
}

/**
 * Represents the entire playing area
 */
export class GameMap {
  /**
   * [X, Y]
   */
  public readonly chunks: Chunk[][];
  public readonly dimesions: StaticRect;

  public readonly collision_api: MapCollisionApi;

  constructor(data: MapData) {
    this.collision_api = new MapCollisionApi(this);

    this.chunks = data.chunk_data.map((chunk_data_column, i) => {
      return chunk_data_column.map(
        (single_chunk_data, j) => new Chunk(single_chunk_data, { x: i * Chunk.size, y: j * Chunk.size })
      );
    });

    this.dimesions = { w: data.chunk_data.length * Chunk.size, h: data.chunk_data[0].length * Chunk.size };
  }

  public chunk_by_pos(p: StaticPoint): Chunk | undefined {
    return this.chunks[Math.floor(p.x / Chunk.size)][Math.floor(p.y / Chunk.size)];
  }
}
