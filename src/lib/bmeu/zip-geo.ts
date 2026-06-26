import zipLatLong from '../../data/zip-latlong.json';

const ZIP_DATA = zipLatLong as Record<string, [number, number]>;

export interface GeoPoint {
  lat: number;
  lng: number;
}

export function getZipCoords(zip: string): GeoPoint | null {
  const normalized = zip.trim().replace(/\D/g, '').slice(0, 5).padStart(5, '0');
  if (normalized.length !== 5) return null;
  const entry = ZIP_DATA[normalized];
  if (!entry) return null;
  return { lat: entry[0], lng: entry[1] };
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
