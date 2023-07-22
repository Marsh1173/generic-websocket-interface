import { Id } from "../../../utils/Id";
import { Renderable } from "./Renderable";
import { Entity } from "../../entitymodel/entity/Entity";

export class Renderables {
  private readonly renderable_map: Map<Id, Renderable<Entity>> = new Map();
  constructor() {}

  public add_renderable(renderable: Renderable<Entity>) {
    this.renderable_map.set(renderable.id, renderable);
  }

  public remove_renderable(id: Id) {
    this.renderable_map.delete(id);
  }

  public apply_to_all_renderables(f: (r: Renderable<Entity>) => void) {
    this.renderable_map.forEach((r) => f(r));
  }
}
