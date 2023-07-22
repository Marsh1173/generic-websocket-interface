import { Id } from "../../utils/Id";
import { Entity } from "../entitymodel/entity/Entity";

export interface IEntityContainer {
  get_by_id(id: Id): Entity | undefined;
  remove(item: Entity): void;
  insert(item: Entity): void;
  apply_to_all(f: (item: Entity) => void): void;
}
