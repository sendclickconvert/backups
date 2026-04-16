const INDEXNOW_KEY = process.env.INDEXNOW_KEY;

if (!INDEXNOW_KEY) {
  console.error('❌ INDEXNOW_KEY secret not found. Add it in Replit Secrets.');
  process.exit(1);
}

const urls = [
  'https://crst.net',
  'https://crst.net/services/direct-mail',
  'https://crst.net/services/eddm',
  'https://crst.net/services/printing',
  'https://crst.net/services/mailing-services',
  'https://crst.net/services/non-profit-mailing',
  'https://crst.net/services/graphic-design',
  'https://crst.net/services/web-design',
  'https://crst.net/services/school-district-direct-mail',
  'https://crst.net/services/union-printing',
  // Direct Mail cluster
  'https://crst.net/services/direct-mail/how-much-does-direct-mail-cost',
  'https://crst.net/services/direct-mail/eddm-every-door-direct-mail',
  'https://crst.net/services/direct-mail/postcard-marketing',
  'https://crst.net/services/direct-mail/direct-mail-vs-digital-marketing',
  'https://crst.net/services/direct-mail/direct-mail-roi',
  'https://crst.net/services/direct-mail/eddm-vs-targeted-direct-mail',
  'https://crst.net/services/direct-mail/direct-mail-response-rates',
  'https://crst.net/services/direct-mail/how-to-build-a-mailing-list-for-direct-mail',
  'https://crst.net/services/direct-mail/postcard-vs-letter-direct-mail',
  'https://crst.net/services/direct-mail/usps-informed-delivery-direct-mail-campaign',
  'https://crst.net/services/direct-mail/direct-mail-for-real-estate-agents-hudson-valley',
  'https://crst.net/services/direct-mail/how-long-does-direct-mail-take',
  // EDDM cluster
  'https://crst.net/services/eddm/what-is-every-door-direct-mail',
  'https://crst.net/services/eddm/how-to-set-up-an-eddm-campaign',
  'https://crst.net/services/eddm/how-much-does-eddm-cost',
  'https://crst.net/services/eddm/eddm-retail-vs-eddm-bmeu',
  'https://crst.net/services/eddm/eddm-postcard-sizes-and-specs',
  'https://crst.net/services/eddm/eddm-printing-requirements',
  // Printing cluster
  'https://crst.net/services/printing/postcard-printing-for-direct-mail',
  'https://crst.net/services/printing/brochure-printing-guide',
  'https://crst.net/services/printing/commercial-printing-vs-online-printing',
  'https://crst.net/services/printing/direct-mail-paper-stock-guide',
  'https://crst.net/services/printing/flyer-printing-for-small-business',
  'https://crst.net/services/printing/how-to-prepare-print-ready-files',
  // Mailing Services cluster
  'https://crst.net/services/mailing-services/what-is-a-lettershop',
  'https://crst.net/services/mailing-services/presort-mail-discount-guide',
  'https://crst.net/services/mailing-services/bulk-mailing-vs-first-class',
  'https://crst.net/services/mailing-services/inkjet-addressing-for-direct-mail',
  'https://crst.net/services/mailing-services/diy-vs-mail-house-direct-mail',
  // Non-Profit cluster
  'https://crst.net/services/non-profit-mailing/how-to-qualify-for-nonprofit-bulk-mail',
  'https://crst.net/services/non-profit-mailing/nonprofit-postage-rates',
  'https://crst.net/services/non-profit-mailing/writing-nonprofit-fundraising-letters',
  'https://crst.net/services/non-profit-mailing/annual-fund-direct-mail-strategy',
  'https://crst.net/services/non-profit-mailing/nonprofit-donor-acquisition-by-mail',
  'https://crst.net/services/non-profit-mailing/eddm-vs-targeted-mail-for-nonprofits',
  // Graphic Design cluster
  'https://crst.net/services/graphic-design/how-to-design-a-direct-mail-postcard',
  'https://crst.net/services/graphic-design/direct-mail-design-best-practices',
  'https://crst.net/services/graphic-design/brochure-design-for-direct-mail',
  'https://crst.net/services/graphic-design/direct-mail-call-to-action-guide',
  'https://crst.net/services/graphic-design/eddm-design-requirements-and-specs',
  // Web Design cluster
  'https://crst.net/services/web-design/website-design-for-hudson-valley-businesses',
  'https://crst.net/services/web-design/small-business-website-cost-guide',
  'https://crst.net/services/web-design/local-web-designer-vs-national-agency',
  'https://crst.net/services/web-design/what-to-expect-from-web-design-project',
  // School District cluster
  'https://crst.net/services/school-district-direct-mail/school-budget-vote-direct-mail-guide',
  'https://crst.net/services/school-district-direct-mail/how-to-reach-voters-for-school-elections',
  'https://crst.net/services/school-district-direct-mail/school-district-mailing-list-guide',
  // Union Printing cluster
  'https://crst.net/services/union-printing/union-printing-for-political-campaigns',
  'https://crst.net/services/union-printing/what-is-the-union-bug',
  'https://crst.net/services/union-printing/why-choose-a-union-print-shop',
  // County hubs
  'https://crst.net/service-areas/ulster-county',
  'https://crst.net/service-areas/dutchess-county',
  'https://crst.net/service-areas/orange-county',
  // Ulster County towns
  'https://crst.net/service-areas/ulster-county/clintondale',
  'https://crst.net/service-areas/ulster-county/connelly',
  'https://crst.net/service-areas/ulster-county/cottekill',
  'https://crst.net/service-areas/ulster-county/denning',
  'https://crst.net/service-areas/ulster-county/ellenville',
  'https://crst.net/service-areas/ulster-county/esopus',
  'https://crst.net/service-areas/ulster-county/gardiner',
  'https://crst.net/service-areas/ulster-county/hardenburgh',
  'https://crst.net/service-areas/ulster-county/high-falls',
  'https://crst.net/service-areas/ulster-county/highland',
  'https://crst.net/service-areas/ulster-county/hurley',
  'https://crst.net/service-areas/ulster-county/kerhonkson',
  'https://crst.net/service-areas/ulster-county/kingston',
  'https://crst.net/service-areas/ulster-county/lake-katrine',
  'https://crst.net/service-areas/ulster-county/lloyd',
  'https://crst.net/service-areas/ulster-county/marbletown',
  'https://crst.net/service-areas/ulster-county/marlboro',
  'https://crst.net/service-areas/ulster-county/napanoch',
  'https://crst.net/service-areas/ulster-county/new-paltz',
  'https://crst.net/service-areas/ulster-county/olive',
  'https://crst.net/service-areas/ulster-county/phoenicia',
  'https://crst.net/service-areas/ulster-county/plattekill',
  'https://crst.net/service-areas/ulster-county/port-ewen',
  'https://crst.net/service-areas/ulster-county/rochester',
  'https://crst.net/service-areas/ulster-county/rosendale',
  'https://crst.net/service-areas/ulster-county/saugerties',
  'https://crst.net/service-areas/ulster-county/shandaken',
  'https://crst.net/service-areas/ulster-county/shawangunk',
  'https://crst.net/service-areas/ulster-county/shokan',
  'https://crst.net/service-areas/ulster-county/stone-ridge',
  'https://crst.net/service-areas/ulster-county/tillson',
  'https://crst.net/service-areas/ulster-county/ulster-town',
  'https://crst.net/service-areas/ulster-county/wallkill',
  'https://crst.net/service-areas/ulster-county/wawarsing',
  'https://crst.net/service-areas/ulster-county/west-hurley',
  'https://crst.net/service-areas/ulster-county/woodstock',
  // Dutchess County towns
  'https://crst.net/service-areas/dutchess-county/amenia',
  'https://crst.net/service-areas/dutchess-county/beacon',
  'https://crst.net/service-areas/dutchess-county/clinton',
  'https://crst.net/service-areas/dutchess-county/dover',
  'https://crst.net/service-areas/dutchess-county/east-fishkill',
  'https://crst.net/service-areas/dutchess-county/fishkill',
  'https://crst.net/service-areas/dutchess-county/hopewell-junction',
  'https://crst.net/service-areas/dutchess-county/hyde-park',
  'https://crst.net/service-areas/dutchess-county/lagrange',
  'https://crst.net/service-areas/dutchess-county/milan',
  'https://crst.net/service-areas/dutchess-county/millbrook',
  'https://crst.net/service-areas/dutchess-county/millerton',
  'https://crst.net/service-areas/dutchess-county/north-east',
  'https://crst.net/service-areas/dutchess-county/pawling',
  'https://crst.net/service-areas/dutchess-county/pine-plains',
  'https://crst.net/service-areas/dutchess-county/pleasant-valley',
  'https://crst.net/service-areas/dutchess-county/poughkeepsie',
  'https://crst.net/service-areas/dutchess-county/red-hook',
  'https://crst.net/service-areas/dutchess-county/rhinebeck',
  'https://crst.net/service-areas/dutchess-county/rhinecliff',
  'https://crst.net/service-areas/dutchess-county/staatsburg',
  'https://crst.net/service-areas/dutchess-county/stanford',
  'https://crst.net/service-areas/dutchess-county/tivoli',
  'https://crst.net/service-areas/dutchess-county/union-vale',
  'https://crst.net/service-areas/dutchess-county/wappinger',
  'https://crst.net/service-areas/dutchess-county/wappingers-falls',
  'https://crst.net/service-areas/dutchess-county/washington',
  // Orange County towns
  'https://crst.net/service-areas/orange-county/blooming-grove',
  'https://crst.net/service-areas/orange-county/chester',
  'https://crst.net/service-areas/orange-county/cornwall',
  'https://crst.net/service-areas/orange-county/crawford',
  'https://crst.net/service-areas/orange-county/deerpark',
  'https://crst.net/service-areas/orange-county/florida',
  'https://crst.net/service-areas/orange-county/goshen',
  'https://crst.net/service-areas/orange-county/greenville',
  'https://crst.net/service-areas/orange-county/hamptonburgh',
  'https://crst.net/service-areas/orange-county/harriman',
  'https://crst.net/service-areas/orange-county/highland-falls',
  'https://crst.net/service-areas/orange-county/highlands',
  'https://crst.net/service-areas/orange-county/maybrook',
  'https://crst.net/service-areas/orange-county/middletown',
  'https://crst.net/service-areas/orange-county/minisink',
  'https://crst.net/service-areas/orange-county/monroe',
  'https://crst.net/service-areas/orange-county/montgomery',
  'https://crst.net/service-areas/orange-county/mount-hope',
  'https://crst.net/service-areas/orange-county/newburgh',
  'https://crst.net/service-areas/orange-county/new-windsor',
  'https://crst.net/service-areas/orange-county/pine-bush',
  'https://crst.net/service-areas/orange-county/port-jervis',
  'https://crst.net/service-areas/orange-county/tuxedo',
  'https://crst.net/service-areas/orange-county/walden',
  'https://crst.net/service-areas/orange-county/wallkill-orange',
  'https://crst.net/service-areas/orange-county/warwick',
  'https://crst.net/service-areas/orange-county/washingtonville',
  'https://crst.net/service-areas/orange-county/wawayanda',
  'https://crst.net/service-areas/orange-county/woodbury',
  // Landing pages & authority pages
  'https://crst.net/full-service-direct-mail-company-hudson-valley',
  'https://crst.net/why-crst-for-direct-mail-in-the-hudson-valley',
  'https://crst.net/crst-better-business-bureau-a-direct-mailer',
  'https://crst.net/about/memberships',
];

const payload = {
  host: 'crst.net',
  key: INDEXNOW_KEY,
  keyLocation: `https://crst.net/${INDEXNOW_KEY}.txt`,
  urlList: urls,
};

console.log(`Submitting ${urls.length} URLs to IndexNow...`);

fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify(payload),
})
  .then((response) => {
    console.log('Status:', response.status);
    if (response.status === 200) {
      console.log(`✅ Successfully submitted ${urls.length} URLs`);
    } else if (response.status === 202) {
      console.log(`✅ Accepted — URLs queued for processing (${urls.length} submitted)`);
    } else if (response.status === 400) {
      console.log('❌ Bad request — check URL list format');
    } else if (response.status === 403) {
      console.log('❌ Key not verified — deploy the .txt key file first');
    } else if (response.status === 422) {
      console.log('❌ URLs do not match host in payload');
    } else {
      console.log('⚠️ Unexpected status:', response.status);
    }
    return response.text();
  })
  .then((text) => { if (text) console.log('Response:', text); })
  .catch((error) => console.error('❌ Fetch error:', error));
