export interface VillageSection {
  heading: string;
  paragraphs: string[];
}

export interface VillageFAQ {
  question: string;
  answer: string;
}

export interface VillageData {
  slug: string;
  villageName: string;
  parentTownSlug: string;
  parentTownName: string;
  titleTag: string;
  metaDescription: string;
  h1: string;
  sections: VillageSection[];
  relatedLinks: string[];
  faqs: VillageFAQ[];
  zipCodes: string[];
  schoolDistrict?: string;
  lirr?: string;
  medianPrice: string;
  medianPriceSource: string;
  coordinates: { lat: number; lng: number };
}

import { babylonVillages } from "./villages/suffolk-babylon";
import { brookhavenVillages } from "./villages/suffolk-brookhaven";
import { eastHamptonVillages } from "./villages/suffolk-east-hampton";
import { huntingtonVillages } from "./villages/suffolk-huntington";
import { islipVillages } from "./villages/suffolk-islip";
import { riverheadVillages } from "./villages/suffolk-riverhead";
import { shelterIslandVillages } from "./villages/suffolk-shelter-island";
import { smithtownVillages } from "./villages/suffolk-smithtown";
import { southamptonVillages } from "./villages/suffolk-southampton";
import { southoldVillages } from "./villages/suffolk-southold";

export const suffolkVillages: VillageData[] = [
  ...babylonVillages,
  ...brookhavenVillages,
  ...eastHamptonVillages,
  ...huntingtonVillages,
  ...islipVillages,
  ...riverheadVillages,
  ...shelterIslandVillages,
  ...smithtownVillages,
  ...southamptonVillages,
  ...southoldVillages,
];

export function getSuffolkVillageBySlug(townSlug: string, villageSlug: string): VillageData | undefined {
  return suffolkVillages.find(v => v.parentTownSlug === townSlug && v.slug === villageSlug);
}

export function getSuffolkVillagesForTown(townSlug: string): VillageData[] {
  return suffolkVillages.filter(v => v.parentTownSlug === townSlug);
}
