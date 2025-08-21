export const isEqual = (value1: unknown, value2: unknown): boolean => {
  if (value1 === value2) return true;
  if (value1 instanceof Date && value2 instanceof Date) {
    return value1.getTime() === value2.getTime();
  }
  if (Array.isArray(value1) && Array.isArray(value2)) {
    return (
      value1.length === value2.length &&
      value1.every((item, index) => isEqual(item, value2[index]))
    );
  }
  if (
    typeof value1 === "object" &&
    typeof value2 === "object" &&
    value1 !== null &&
    value2 !== null
  ) {
    return isEqual(Object.entries(value1), Object.entries(value2));
  }
  return false;
};
