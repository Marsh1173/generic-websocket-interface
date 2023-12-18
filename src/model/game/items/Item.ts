import { ItemMeat } from "./types/Meat";
import { ItemWood } from "./types/Wood";

export enum ItemEnum {
  Wood,
  Meat,
}

export type ItemData = ItemWood | ItemMeat;
