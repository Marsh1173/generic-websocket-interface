export const NearlyEquals = (v1: number, v2: number): boolean => {
  return v2 < v1 + Number.EPSILON || v2 > v1 - Number.EPSILON;
};
