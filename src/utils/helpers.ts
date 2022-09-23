export function removeUndefined<T>(data: (T | undefined)[]) {
  return data.filter((item: any): item is T => item !== undefined);
}
