import { Id } from "../../../utils/Id";
import { TreeData } from "../../entities/tree/Tree";

export interface BaseEntityData {
  readonly id?: Id;
}

export type EntityData = TreeData;
