import { siteConfig } from "@/lib/config";

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII"];

const FULL_ORDER = [
  { key: "hero",       path: "/",            label: "The Arrival" },
  { key: "ranch",      path: "/the-ranch",   label: "The Ranch" },
  { key: "barn",       path: "/the-barn",    label: "The Barn" },
  { key: "cabins",     path: "/the-cabins",  label: "The Cabins" },
  { key: "gatherings", path: "/gatherings",  label: "Gatherings" },
  { key: "notes",      path: "/field-notes", label: "Field Notes" },
  { key: "inquire",    path: "/inquire",     label: "Inquire" },
] as const;

export type ChapterKey = typeof FULL_ORDER[number]["key"];

function activeOrder() {
  return FULL_ORDER.filter(c => c.key !== "cabins" || siteConfig.cabinsEnabled);
}

export function chapterNumeral(key: ChapterKey): string {
  const idx = activeOrder().findIndex(c => c.key === key);
  return idx >= 0 ? ROMAN[idx] : "";
}

export function totalChaptersNumeral(): string {
  return ROMAN[activeOrder().length - 1];
}

export function chapterList() {
  return activeOrder().map((c, i) => ({ ...c, numeral: ROMAN[i] }));
}

export function chapterCardNumeral(key: ChapterKey, sub: "i" | "ii" | "iii" | "iv" | "v"): string {
  return `${chapterNumeral(key)}·${sub}`;
}
