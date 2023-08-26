import { EntityHandler } from "./EntityHandler";
import { LocalEntityFactory } from "./factory/LocalEntityFactory";

export interface LocalEntityHandler extends EntityHandler {
  readonly make: LocalEntityFactory;
  readonly get: {};
}
