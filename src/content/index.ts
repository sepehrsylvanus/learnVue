import type { Level } from "./types";
import level01 from "./levels/level-01";
import level02 from "./levels/level-02";
import level03 from "./levels/level-03";
import level04 from "./levels/level-04";
import level05 from "./levels/level-05";
import level06 from "./levels/level-06";
import level07 from "./levels/level-07";
import level08 from "./levels/level-08";
import level09 from "./levels/level-09";
import level10 from "./levels/level-10";
import level11 from "./levels/level-11";

/** 👉 برای افزودن مرحله‌ی جدید، فقط فایلش را اینجا اضافه کن. */
export const levels: Level[] = [
  level01,
  level02,
  level03,
  level04,
  level05,
  level06,
  level07,
  level08,
  level09,
  level10,
  level11,
];

export const totalXp = levels.reduce((sum, l) => sum + l.xp, 0);

export function getLevel(slug: string): Level | undefined {
  return levels.find((l) => l.slug === slug);
}

export function getLevelById(id: number): Level | undefined {
  return levels.find((l) => l.id === id);
}

export type { Level };
