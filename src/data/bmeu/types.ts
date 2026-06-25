// src/data/bmeu/types.ts
// Schema for the crst.net BMEU directory.
// Static, data-driven directory — every page is generated from `bmeus` (see bmeu-data.ts).
// Source data is only ~50% reliable (Sean's note), so every record carries provenance and
// nothing factual gets published until verification.verified === true.

/** USPS mail classes a unit may accept. Extend as we encounter more. */
export type MailClass =
  | 'First-Class Mail'
  | 'USPS Marketing Mail'
  | 'Periodicals'
  | 'Bound Printed Matter'
  | 'Media Mail'
  | 'Every Door Direct Mail (EDDM)'
  | 'Parcel Select';

export interface GeoPoint {
  lat: number;
  lng: number;
}

export interface BmeuAddress {
  street: string; // leave '' if unconfirmed — page hides the address block when empty
  city: string;
  state: string; // two-letter, e.g. 'NY'
  zip: string; // 5-digit facility ZIP
}

/**
 * Provenance + trust. The data is unreliable at the source, so we track exactly how we know
 * each record. Only `verified: true` records render a "Verified" badge and publish facts.
 */
export interface VerificationMeta {
  verified: boolean;
  verifiedBy: string | null; // 'Sean Griffin' | 'Danielle' | 'Phone (Bryan)' | ...
  verifiedOn: string | null; // ISO date 'YYYY-MM-DD'
  source: string; // 'USPS district locator' | 'Precision (cross-ref)' | 'Sean — direct knowledge' | 'Phone confirmation'
  notes?: string; // caveats, open questions
}

export interface Bmeu {
  /** Stable kebab-case URL slug, '{city}-{state}' e.g. 'mid-hudson-ny'. Never change once live. */
  slug: string;

  /** Display name of the unit, e.g. 'Mid-Hudson BMEU'. */
  name: string;

  address: BmeuAddress;

  /** One canonical phone format. null until confirmed. */
  phone: string | null;

  /** Hours as posted, e.g. 'Mon–Fri 8:00 AM – 4:30 PM'. null until confirmed. */
  hours: string | null;

  /** Mail classes this unit accepts. Empty array = unconfirmed. */
  acceptedMailClasses: MailClass[];

  /**
   * 5-digit ZIPs this unit is the CORRECT entry point for (Sean-confirmed where possible).
   * Drives the authoritative match in the lookup — an exact servingZips hit beats distance.
   */
  servingZips: string[];

  /** Counties served — display + regional grouping. */
  servingCounties: string[];

  /** Exact geocoded facility location. REQUIRED — powers the distance-based lookup. */
  coordinates: GeoPoint;

  /**
   * Our differentiator: the "confirm X in a 5-minute call before you submit" guidance.
   * Unique per facility — never templated, never filler.
   */
  callAheadNote: string;

  verification: VerificationMeta;
}
