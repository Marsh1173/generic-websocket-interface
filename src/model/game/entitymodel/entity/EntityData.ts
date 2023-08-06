import { Id } from "../../../utils/Id";
import { ArrowData } from "../../entities/arrow/Arrow";
import { GoblinData } from "../../entities/goblin/Goblin";
import { TreeData } from "../../entities/tree/Tree";

export interface BaseEntityData {
  readonly id?: Id;
}

export type EntityData = TreeData | GoblinData | ArrowData;
