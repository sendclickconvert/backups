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

import { hempsteadVillages } from "./villages/nassau-hempstead";
import { northHempsteadVillages } from "./villages/nassau-north-hempstead";
import { oysterBayVillages } from "./villages/nassau-oyster-bay";

export const nassauVillages: VillageData[] = [
  ...hempsteadVillages,
  ...northHempsteadVillages,
  ...oysterBayVillages,
];

export function getNassauVillageBySlug(townSlug: string, villageSlug: string): VillageData | undefined {
  return nassauVillages.find(v => v.parentTownSlug === townSlug && v.slug === villageSlug);
}

export function getNassauVillagesForTown(townSlug: string): VillageData[] {
  return nassauVillages.filter(v => v.parentTownSlug === townSlug);
}
