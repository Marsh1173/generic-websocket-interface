import { LocalGameSystem } from "../gamesystem/LocalGameSystem";
import { EntityHandler, EntityHandlerApi } from "./EntityHandler";
import { LocalEntityFactory } from "./factory/LocalEntityFactory";
import { LocalEntityFinder } from "./finder/LocalEntityFinder";

export interface LocalEntityHandlerApi extends EntityHandlerApi {
  readonly make: LocalEntityFactory;
  readonly find: LocalEntityFinder;
}

export class LocalEntityHandler extends EntityHandler {
  public readonly make: LocalEntityFactory;
  public readonly find: LocalEntityFinder;

  constructor(protected readonly game_system: LocalGameSystem) {
    super(game_system.map.dimesions);

    this.make = new LocalEntityFactory(this.game_system, this);
    this.find = new LocalEntityFinder(this);
  }
}
