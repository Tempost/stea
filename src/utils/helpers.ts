export function removeUndefined<T>(data: (T | undefined)[]) {
  return data.filter((item: any): item is T => item !== undefined);
}

export function readableDateTime(date: Date) {
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
}
