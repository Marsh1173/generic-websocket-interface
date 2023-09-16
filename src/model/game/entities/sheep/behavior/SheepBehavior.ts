import {
  BehaviorWanderModule,
  BehaviorWanderModuleData,
} from "../../../entitymodel/modules/behavior/BehaviorWanderModule";
import { Sheep } from "../Sheep";

export class SheepBehaviorModule extends BehaviorWanderModule {
  constructor(sheep: Sheep, data?: BehaviorWanderModuleData) {
    super(sheep, {}, data);
  }
}
