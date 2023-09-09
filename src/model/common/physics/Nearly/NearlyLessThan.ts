import { NearlyThreshold } from "./config";

export const NearlyLessThan = (v1: number, v2: number): boolean => {
  return v1 < v2 + NearlyThreshold;
};
