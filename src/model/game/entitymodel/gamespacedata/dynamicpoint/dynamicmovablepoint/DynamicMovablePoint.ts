import { DynamicPoint, HasDynamicPoint, DynamicPointModule } from "../DynamicPoint";

export interface DynamicMovablePoint extends DynamicPoint {
  readonly type: "DynamicMovablePoint";
}
export interface HasDynamicMovablePoint extends HasDynamicPoint {
  readonly game_space_data: DynamicMovablePoint;
}

export class DynamicMovablePointModule extends DynamicPointModule {
  public readonly type = "DynamicMovablePoint";
}
