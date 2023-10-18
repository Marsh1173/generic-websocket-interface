import { Id } from "../../../common/Id";
import { ArrowData } from "../../entities/arrow/Arrow";
import { GoblinData } from "../../entities/goblin/Goblin";
import { ItemEntityData } from "../../entities/itementity/ItemEntity";
import { SheepData } from "../../entities/sheep/Sheep";
import { TreeData } from "../../entities/tree/Tree";

export interface BaseEntityData {
  readonly id: Id;
}

export type EntityData = TreeData | GoblinData | ArrowData | SheepData | ItemEntityData;
