import { Id } from "../../../../common/Id";
import { StaticPoint } from "../../../../common/math/geometry/Point";
import { GameMap } from "../GameMap";
import { Chunk } from "../chunk/Chunk";

export class MapCollisionApi {
  constructor(private readonly map: GameMap) {}

  public insert_collidables(id: Id, collidable_tiles: StaticPoint[]) {
    for (const tile of collidable_tiles) {
      const chunk = this.map.chunk_by_pos(tile);
      const key = this.get_tile_key(tile);
      const id_list = chunk?.collidable_map.get(key);
      if (id_list) {
        id_list.push(id);
      } else {
        chunk?.collidable_map.set(key, [id]);
      }
    }
  }

  public remove_collidables(id: Id, collidable_tiles: StaticPoint[]) {
    for (const tile of collidable_tiles) {
      const chunk = this.map.chunk_by_pos(tile);
      const key = this.get_tile_key(tile);
      const id_list = chunk?.collidable_map.get(key);
      id_list?.forEach((unknown_id, index) => {
        if (unknown_id === id) id_list.splice(index, 1);
      });
    }
  }

  public tile_is_collidable(p: StaticPoint): boolean {
    const key = this.get_tile_key(p);
    const chunk = this.map.chunk_by_pos(p);
    const id_list = chunk?.collidable_map.get(key);
    return !chunk || (!!id_list && id_list.length !== 0);
  }

  private get_tile_key(p: StaticPoint): [number, number] {
    return [Math.floor(p.x % Chunk.size), Math.floor(p.y % Chunk.size)];
  }
}
