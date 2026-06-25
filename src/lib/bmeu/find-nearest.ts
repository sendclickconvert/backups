import type { Bmeu } from '../../data/bmeu/types';
import { getZipCoords, haversineMiles } from './zip-geo';

export type BmeuWithDistance = Bmeu & { distanceMiles?: number };

export function findBmeusForZip(zip: string, all: Bmeu[]): BmeuWithDistance[] {
  const normalized = zip.trim().replace(/\D/g, '').slice(0, 5).padStart(5, '0');
  if (normalized.length !== 5 || !/^\d{5}$/.test(normalized)) return [];

  const authoritative = all.filter(b => b.servingZips.includes(normalized));
  if (authoritative.length > 0) {
    return authoritative.map(b => ({ ...b }));
  }

  const origin = getZipCoords(normalized);
  if (!origin) return [];

  const withDistance: BmeuWithDistance[] = all
    .filter(b => b.coordinates)
    .map(b => ({
      ...b,
      distanceMiles: haversineMiles(origin, b.coordinates),
    }))
    .sort((a, b) => (a.distanceMiles ?? Infinity) - (b.distanceMiles ?? Infinity));

  return withDistance;
}
