// src/data/bmeu/bmeu-data.ts
// The single source of truth for the BMEU directory. Append new entries here.
//
// IMPORTANT: factual fields (street, phone, hours, acceptedMailClasses) stay null/empty until
// verified. Pages render those gracefully — never fabricate. Flip verification.verified to true
// only after Sean signs off (region) or a unit is phone-confirmed.

import type { Bmeu } from './types';

export const bmeus: Bmeu[] = [
  {
    // ENTRY #1 — Mid-Hudson. Confirmed by Sean as the correct unit for Kingston 12401
    // (NOT Albany, which is the district-routing error). Missing from Precision's table.
    slug: 'mid-hudson-ny',
    name: 'Mid-Hudson BMEU',
    address: {
      street: '', // TODO(Sean): exact street of the Mid-Hudson P&DC BMEU window — UNVERIFIED
      city: 'Newburgh',
      state: 'NY',
      zip: '', // TODO confirm facility ZIP
    },
    phone: null, // TODO(Sean/Danielle): confirm BMEU window phone
    hours: null, // TODO: confirm current acceptance hours
    acceptedMailClasses: [], // TODO: confirm
    servingZips: ['12401'], // Kingston — Sean-confirmed. Expand with full Ulster/Hudson Valley coverage after verification.
    servingCounties: ['Ulster', 'Orange', 'Dutchess'], // TODO verify full coverage
    coordinates: {
      // APPROXIMATE — Newburgh, NY center. Replace with exact geocoded facility location before launch.
      lat: 41.5034,
      lng: -74.0104,
    },
    callAheadNote:
      'PLACEHOLDER — Sean to finalize. Confirm current acceptance hours and which mail classes are being taken on your planned drop day; Hudson Valley units have consolidated in recent years and posted hours shift.',
    verification: {
      verified: false,
      verifiedBy: null,
      verifiedOn: null,
      source:
        'Sean Griffin — direct knowledge: correct unit for Kingston 12401 is Mid-Hudson, not Albany; likely the Newburgh facility',
      notes:
        'OPEN: confirm Mid-Hudson BMEU == Newburgh P&DC (same physical site?). All factual fields UNVERIFIED — do not publish or set verified:true until Sean signs off.',
    },
  },
];
