import { Board } from "../Board/board";
export enum Entities {
  Empty = 0,
  User = 1,
  PB = 2,
  GPgp = 3,
}

export interface Location {
  Column: number;
  Row: number;
}

