import { Observable, Observer } from "../../../../utils/observer/Observer";
import { BaseEntity } from "../../entity/BaseEntityClass";

export interface HasDeconstructModule {
  readonly deconstruct_module: DeconstructModule;
}

export interface DeconstructObserver extends Observer {
  on_observable_deconstruct(): void;
}

export class DeconstructModule extends Observable<DeconstructObserver> {
  constructor(protected readonly entity: BaseEntity) {
    super();
  }

  public on_deconstruct() {
    this.on_deconstruct_cleanup();
    super.on_deconstruct();
  }

  /**
   * This method should deconstruct all observable modules of the entity that are direct children.
   */
  protected on_deconstruct_cleanup() {
    this.entity.behavior_module?.on_entity_deconstruct?.();
    this.entity.health_module?.observable.on_deconstruct();
  }
}
