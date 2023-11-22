import { Id } from "../../../../common/Id";
import { StaticPoint } from "../../../../common/math/geometry/Point";
import { GameMap } from "../GameMap";
import { Chunk } from "../chunk/Chunk";

export class MapCollisionApi {
  constructor(private readonly map: GameMap) {}

  public insert_collidables(id: Id, tiles: StaticPoint[]) {
    for (const tile of tiles) {
      const chunk = this.map.chunk_by_pos(tile);
      chunk?.collidable_map[tile.x % Chunk.size][tile.y % Chunk.size].add(id);
    }
  }

  public remove_collidables(id: Id, tiles: StaticPoint[]) {
    for (const tile of tiles) {
      const chunk = this.map.chunk_by_pos(tile);
      chunk?.collidable_map[tile.x % Chunk.size][tile.y % Chunk.size].delete(id);
    }
  }

  public tile_is_collidable(p: StaticPoint): boolean {
    const chunk = this.map.chunk_by_pos(p);
    return !chunk || chunk.collidable_map[Math.floor(p.x % Chunk.size)][Math.floor(p.y % Chunk.size)].size !== 0;
  }
}
