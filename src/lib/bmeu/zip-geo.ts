import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const zipcodes = require('zipcodes');

export interface GeoPoint {
  lat: number;
  lng: number;
}

export function getZipCoords(zip: string): GeoPoint | null {
  const normalized = zip.trim().replace(/\D/g, '').slice(0, 5).padStart(5, '0');
  if (normalized.length !== 5) return null;
  const result = zipcodes.lookup(normalized);
  if (!result || result.latitude == null || result.longitude == null) return null;
  return { lat: result.latitude, lng: result.longitude };
}

export function haversineMiles(a: GeoPoint, b: GeoPoint): number {
  const R = 3959;
  const dLat = (b.lat - a.lat) * Math.PI / 180;
  const dLng = (b.lng - a.lng) * Math.PI / 180;
  const sin2 =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(a.lat * Math.PI / 180) *
      Math.cos(b.lat * Math.PI / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(sin2), Math.sqrt(1 - sin2));
}
