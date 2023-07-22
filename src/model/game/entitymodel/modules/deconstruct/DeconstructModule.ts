import { Observable, Observer } from "../../../../utils/observer/Observer";

export interface HasDeconstructModule {
  readonly deconstruct_module: DeconstructModule;
}

export interface DeconstructObserver extends Observer {
  on_deconstruct(): void;
}

export class DeconstructModule extends Observable<DeconstructObserver> {
  public on_deconstruct() {
    this.on_deconstruct_cleanup();
    super.on_deconstruct();
  }

  /**
   * Optionally overwritten.
   */
  protected on_deconstruct_cleanup() {}
}
