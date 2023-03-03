import { MaybeArray } from "./types";

export const deepClone = <T>(items: MaybeArray<T>[]): MaybeArray<T>[] =>
  items.map((item) =>
    Array.isArray(item) ? deepClone(item) : item
  ) as MaybeArray<T>[];

export function randomIntFromInterval(min: number, max: number): number {
  return Math.abs(Math.floor(Math.random() * (max - min + 1) + min));
}

export function compareObj<T extends {}>(obj1: T, obj2: T) {
  return (
    Object.keys(obj1).length === Object.keys(obj2).length &&
    (Object.keys(obj1) as (keyof typeof obj1)[]).every((key) => {
      return (
        Object.prototype.hasOwnProperty.call(obj2, key) &&
        obj1[key] === obj2[key]
      );
    })
  );
} 