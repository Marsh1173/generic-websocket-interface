import { NearlyThreshold } from "./config";

export const NearlyEquals = (v1: number, v2: number): boolean => {
  return Math.abs(v1 - v2) < NearlyThreshold;
};
