import { EntityFactory } from "./factory/EntityFactory";

export abstract class EntityHandler {
  public abstract readonly make: EntityFactory;
  public abstract readonly get: {};
}
