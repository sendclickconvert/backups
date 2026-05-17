import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import node from '@astrojs/node';
import react from '@astrojs/react';

const redirectPaths = [
  '/direct-mail-new-paltz',
  '/direct-mail-kingston',
  '/direct-mail-poughkeepsie',
  '/direct-mail-services/',
  '/direct-mail-company/',
  '/order-online-direct-mail/',
  '/direct-mail-tools/',
  '/permits-page/',
  '/resources/non-profit-mailing/',
  '/how-to-get-a-refund-on-postage/',
  '/direct-mail-case-studies/',
  '/case-study/',
  '/case-study-category/',
  '/crst-daily/',
  '/direct-mail-vs-email',
  '/demystifying-direct-mail',
  '/chicken-shipping-101/',
  '/fun-fact-friday/',
  '/case-study-thursday/',
  '/category/',
  '/new-home-page-2/',
  '/website-terms-and-conditions/',
  // === ADDED FROM GSC EXPORT ===
  '/contact-us/',
  '/new-home/',
  '/cart',
  '/checkout',
  '/products-list',
  '/payments/',
  '/paypal-payment/',
  '/check-payment/',
  '/printing-partners/',
  '/tag/',
  '/crst-daily-post-tag/',
  '/crst-daily-post-category/',
  '/mailbox-monday/',
  '/wp-content/',
  '/a-november-2024-post-election-assessment',
];

export default defineConfig({
  site: 'https://crst.net',
  output: 'hybrid',
  trailingSlash: 'never',
  adapter: node({ mode: 'middleware' }),
  vite: { server: { allowedHosts: true } },
  integrations: [
    tailwind(),
    react(),
    sitemap({
      filter: (page) => !page.includes('/thank-you') && !page.includes('/training') && !page.endsWith('/terms') && !page.includes('/resources/payments'),
    }),
  ],
  redirects: {
    '/training/conversations-tab': '/training/portal',
    '/training/conversations-tab/': '/training/portal',
    '/direct-mail-tools': '/resources',
    '/direct-mail-tools/': '/resources',
    // === EXISTING (already in your config) ===
    '/direct-mail-new-paltz': '/service-areas/ulster-county/new-paltz',
    '/direct-mail-kingston': '/service-areas/ulster-county/kingston',
    '/direct-mail-poughkeepsie': '/service-areas/dutchess-county/poughkeepsie',
    '/direct-mail-services/union-printing-for-direct-mail-materials/': '/services/union-printing',
    '/direct-mail-services/crst-web-design-and-development/': '/services/web-design',
    '/direct-mail-marketing': '/services/direct-mail',
    '/direct-mail-marketing/': '/services/direct-mail',
    '/direct-mail-company/': '/about',
    '/order-online-direct-mail/': '/contact',
    '/resources/envelope-sizes/': '/guides/envelope-sizes',
    '/direct-mail-tools/envelope-sizes': '/guides/envelope-sizes',
    '/direct-mail-tools/envelope-sizes/': '/guides/envelope-sizes',
    '/resources/postal-dictionary/': '/direct-mail-tools/postal-dictionary',
    '/resources/mailing-permits': '/direct-mail-tools/cornerstone-mailing-permits',
    '/resources/mailing-permits/': '/direct-mail-tools/cornerstone-mailing-permits',
    '/permits-page/': '/direct-mail-tools/cornerstone-mailing-permits',
    '/resources/postage-rates': '/direct-mail-tools/postage-rates',
    '/resources/postage-rates/': '/direct-mail-tools/postage-rates',
    '/resources/non-profit-mailing': '/non-profit-mailing-application',
    '/resources/non-profit-mailing/': '/non-profit-mailing-application',
    '/how-to-get-a-refund-on-postage': '/how-to-get-a-refund-on-postage-a-guide-to-post-office-application-to-refund-postage',
    '/how-to-get-a-refund-on-postage/': '/how-to-get-a-refund-on-postage-a-guide-to-post-office-application-to-refund-postage',
    '/direct-mail-case-studies/': '/case-studies',
    '/case-study/niche-insurance-general-insurance-direct-mail-marketing/': '/case-studies/niche-insurance',
    '/case-study/republican-town-committee-caucus-electoral-cards/': '/case-studies/republican-town-committee',
    '/case-study/chinese-menu-misprint-fix/': '/case-studies/chinese-menu-misprint',
    '/case-study/national-magazine-at-periodical-mailing-rate-class/': '/case-studies/national-magazine-periodical',
    '/case-study/direct-mail-strategy-for-hearing-aid-firm-lawrence-hearing/': '/case-studies/lawrence-hearing',
    '/case-study/waste-management/': '/case-studies/waste-management',
    '/case-study/daughters-of-the-american-revolution/': '/case-studies/daughters-american-revolution',
    '/case-study/national-industrial-product-recall/': '/case-studies/national-product-recall',
    '/case-study/british-american-collegiate-association/': '/case-studies/british-american-collegiate',
    '/case-study/retail-furniture-store/': '/case-studies/retail-furniture-store',
    '/case-study-category/direct-mail/case-studies/': '/case-studies',
    '/crst-daily/lessons-from-marketing-failure/': 'https://blog.crst.net/',
    '/crst-daily/direct-mail-vs-email-marketing-comparison-and-roi-return-on-investment/': 'https://blog.crst.net/direct-mail-vs-email/',
    '/crst-daily/global-parcel-delivery-to-us-halted-august-2025/': 'https://blog.crst.net/',
    '/direct-mail-vs-email-comparison-and-roi-return-on-investment/': 'https://blog.crst.net/direct-mail-vs-email/',
    '/demystifying-direct-mail-common-misconceptions-and-practical-solutions/': 'https://blog.crst.net/',
    '/chicken-shipping-101/': '/resources/chicken-shipping-101',
    '/fun-fact-friday/': 'https://blog.crst.net/',
    '/case-study-thursday/': '/case-studies',
    '/crst-daily-post-category/case-study-thursday/': '/case-studies',
    '/category/review/': 'https://blog.crst.net/',
    '/new-home-page-2/': '/',
    '/website-terms-and-conditions/': '/terms',

    // ==========================================================
    // NEW - Added from GSC indexed URL export Feb 19, 2026
    // ==========================================================

    // --- Core pages missing ---
    '/contact-us/': '/contact',
    '/new-home/': '/',

    // --- GHL e-commerce pages (indexed, no Replit equivalent) ---
    '/cart': '/services',
    '/checkout': '/contact',
    '/products-list': '/services',

    // --- Payment pages ---
    '/payments/': '/resources/payments',
    '/paypal-payment/': '/resources/payments',
    '/check-payment/': '/resources/payments',

    // --- Case studies indexed in GSC but missing from config ---
    '/case-study/autism-awareness-newsletter-nonprofit/': '/case-studies',
    '/case-study/creative-eyeglasses/': '/case-studies',
    '/case-study/horse-academy/': '/case-studies',
    '/case-study/financial-investment-firm/': '/case-studies',
    '/case-study/coarc-revamped-data-strategy-for-unsolicited-arc-new-member-donor-appeal/': '/case-studies',
    '/case-study/new-subscribers-for-a-nys-regional-newspaper/': '/case-studies',
    '/case-study/evergreen-contracting-services/': '/case-studies',
    '/case-study/sourcing-sensitive-nyc-households-with-children-data/': '/case-studies',
    '/case-study/lions-club-community-appeal/': '/case-studies',
    '/case-study/classics-on-hudson/': '/case-studies',
    '/case-study/large-painting-contracting-firm-homeowner-via-eddm-cards/': '/case-studies',
    '/case-study/case-study-thursday-institute-for-family-health-september-26-2024/': '/case-studies',
    '/case-study/simple-handyman-carpenter-direct-mailpiece/': '/case-studies',
    '/direct-mail-case-studies/school-district-direct-mail-strategy/': '/case-studies',
    '/case-study-category/graphic-design/': '/case-studies',
    '/case-study-category/printing/': '/case-studies',
    '/case-study-category/direct-mail/page/2/': '/case-studies',

    // --- Printing partners (6 indexed, no Replit equivalent) ---
    '/printing-partners/sherburne-news-press/': '/about',
    '/printing-partners/copy-hut-printing/': '/about',
    '/printing-partners/the-shipping-place-more/': '/about',
    '/printing-partners/p-p-quickcopy-center/': '/about',
    '/printing-partners/chatham-printing-copy-center/': '/about',
    '/printing-partners/pro-printers/': '/about',

    // --- WP-content PDFs (2 indexed) ---
    '/wp-content/uploads/2023/10/4.25-x-11-EDDM-Flat-Card-Template.pdf': '/usps-direct-mailer-templates',
    '/resources/usps-templates/': '/usps-direct-mailer-templates',
    '/wp-content/uploads/2023/11/11-Envelope-Template.pdf': '/direct-mail-tools/envelope-sizes',

    // --- Former WordPress resource pages ---
    '/resources/cornerstone-mailing-permits/': '/direct-mail-tools/cornerstone-mailing-permits',
    '/resources/mail-forwarding/': '/direct-mail-tools/address-change',
    '/ancillary-service-endorsements/': '/resources/ancillary-service-endorsements',
    '/periodicals-complete-overview/': '/resources/periodicals',
    '/understanding-periodicals/': '/resources/understanding-periodicals',

    // --- Root-level blog post ---
    '/a-november-2024-post-election-assessment-from-a-hudson-valley-political-consultant/': 'https://blog.crst.net/',

    // --- WP taxonomy pages (indexed) ---
    '/tag/mail-design/': 'https://blog.crst.net/',
    '/tag/overview/': 'https://blog.crst.net/',
    '/tag/shipping/': 'https://blog.crst.net/',
    '/category/periodicals/': 'https://blog.crst.net/',
    '/category/business-to-business/': 'https://blog.crst.net/',
    '/category/how-to/': 'https://blog.crst.net/',
    '/crst-daily-post-tag/fun-fact-friday/': 'https://blog.crst.net/',
    '/crst-daily-post-tag/mailboxmonday/': 'https://blog.crst.net/',
    '/crst-daily-post-tag/hudsonvalleyny/page/2/': 'https://blog.crst.net/',
    '/crst-daily-post-tag/mailboxmonday/page/2/': 'https://blog.crst.net/',
    '/crst-daily-post-category/mailbag-wednesday/page/2/': 'https://blog.crst.net/',
    '/mailbox-monday/page/2/': 'https://blog.crst.net/',
    '/mailbox-monday/page/4/': 'https://blog.crst.net/',
  },
});