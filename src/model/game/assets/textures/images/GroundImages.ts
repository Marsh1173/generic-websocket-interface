import { StringPrefix, wrap_path_record } from "../../Utils";

type GroundTypeName = "ground";
const GroundTypeNameStr = "ground";

type GroundImageIncompleteType = "grass" | "snow";

const GroundImagePaths: Record<GroundImageIncompleteType, string> = {
  grass: "grass.png",
  snow: "snow.png",
};

export type GroundImageAsset = StringPrefix<GroundImageIncompleteType, GroundTypeName>;

export const GroundImagesCompletePaths = wrap_path_record<GroundTypeName, GroundImageIncompleteType>(
  GroundImagePaths,
  GroundTypeNameStr
);
