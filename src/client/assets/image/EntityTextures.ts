export type EntityName = "entity";
export const EntityNameStr = "entity";

export type EntityTexture = "tree" | "goblin" | "arrow";

export const EntityTextures: Record<EntityTexture, string> = {
  arrow: "arrow.png",
  tree: "tree.png",
  goblin: "goblin.png",
};
