import { StringPrefix, wrap_path_record } from "../../Utils";

type EntityTypeName = "entity";
const EntityTypeNameStr = "entity";

type EntityImageIncompleteType =
  | "goblin"
  | "arrow"
  | "tree-1"
  | "tree-2"
  | "tree-3"
  | "rock-1"
  | "rock-2"
  | "small-rock"
  | "plank"
  | "campfire"
  | "sheep";

const EntityImagePaths: Record<EntityImageIncompleteType, string> = {
  arrow: "arrow.png",
  goblin: "goblin.png",
  "tree-1": "tree_1.png",
  "tree-2": "tree_2.png",
  "tree-3": "tree_3.png",
  "rock-1": "rock_1.png",
  "rock-2": "rock_2.png",
  "small-rock": "small_rock.png",
  plank: "plank.png",
  campfire: "campfire.png",
  sheep: "sheep.png",
};

export type EntityImageAsset = StringPrefix<EntityImageIncompleteType, EntityTypeName>;

export const EntityImagesCompletePaths = wrap_path_record<EntityTypeName, EntityImageIncompleteType>(
  EntityImagePaths,
  EntityTypeNameStr
);
