type MaybeArray<T> = T | T[];

export const deepClone = <T>(items: MaybeArray<T>[]): MaybeArray<T>[] =>
  items.map((item) =>
    Array.isArray(item) ? deepClone(item) : item
  ) as MaybeArray<T>[];

function randomIntFromInterval(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
