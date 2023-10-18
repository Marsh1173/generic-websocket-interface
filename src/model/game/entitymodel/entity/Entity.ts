import { Arrow } from "../../entities/arrow/Arrow";
import { Goblin } from "../../entities/goblin/Goblin";
import { ItemEntity } from "../../entities/itementity/ItemEntity";
import { Sheep } from "../../entities/sheep/Sheep";
import { Tree } from "../../entities/tree/Tree";

export type Entity = Tree | Goblin | Arrow | Sheep | ItemEntity;
