import { Link, useParams, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import ContactForm from "@/components/ContactForm";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import { BreadcrumbSchema, FAQSchema } from "@/components/SchemaMarkup";
import AuthorByline from "@/components/AuthorByline";
import { getNassauVillageBySlug } from "@/data/nassau-villages";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  MapPin,
  Phone,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { useEffect } from "react";

const blogLinks = [
  { label: "How We Buy Houses", href: "https://blog.thepropertyfather.com/how-do-we-buy-houses-companies-work/" },
  { label: "Cash Buyer vs. Realtor", href: "https://blog.thepropertyfather.com/cash-buyer-vs-realtor/" },
  { label: "Why Cash Offers Are Lower", href: "https://blog.thepropertyfather.com/why-cash-offers-are-lower/" },
  { label: "Are Cash Buyers Legit?", href: "https://blog.thepropertyfather.com/are-we-buy-houses-companies-legit/" },
  { label: "Selling During Divorce", href: "https://blog.thepropertyfather.com/sell-house-during-divorce-long-island/" },
  { label: "Facing Foreclosure", href: "https://blog.thepropertyfather.com/facing-foreclosure-long-island/" },
  { label: "Selling an Inherited House", href: "https://blog.thepropertyfather.com/sell-inherited-house-new-york/" },
  { label: "Sell As-Is on Long Island", href: "https://blog.thepropertyfather.com/sell-house-as-is-long-island/" },
];

function VillageSchemaMarkup({ villageName, parentTownName, metaDescription, coordinates }: { villageName: string; parentTownName: string; metaDescription: string; coordinates: { lat: number; lng: number } }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": `We Buy Houses for Cash in ${villageName}, NY`,
    "provider": {
      "@type": "LocalBusiness",
      "name": "The Property Father",
      "telephone": "(516) 548-6558",
      "url": "https://thepropertyfather.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "100 Washington Ave",
        "addressLocality": "Patchogue",
        "addressRegion": "NY",
        "postalCode": "11772"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "5.0",
        "reviewCount": "3",
        "bestRating": "5",
        "worstRating": "1"
      }
    },
    "areaServed": [
      {
        "@type": "City",
        "name": villageName,
        "containedInPlace": {
          "@type": "AdministrativeArea",
          "name": `${parentTownName}, Nassau County, NY`
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": coordinates.lat.toString(),
          "longitude": coordinates.lng.toString()
        }
      },
      {
        "@type": "City",
        "name": parentTownName
      },
      {
        "@type": "County",
        "name": "Nassau County, NY"
      }
    ],
    "serviceType": "We Buy Houses for Cash",
    "description": metaDescription
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function NassauVillagePage() {
  const params = useParams<{ town: string; village: string }>();
  const [, setLocation] = useLocation();
  const village = getNassauVillageBySlug(params.town || "", params.village || "");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [params.village]);

  if (!village) {
    setLocation(`/locations/nassau-county/${params.town || ""}`);
    return null;
  }

  const introSection = village.sections.find(s => s.heading === "");
  const contentSections = village.sections.filter(s => s.heading !== "");
  const parentTownPath = `/locations/nassau-county/${village.parentTownSlug}`;

  return (
    <Layout>
      <SEO
        title={village.titleTag.replace(" | The Property Father", "")}
        description={village.metaDescription}
        canonicalPath={`/locations/nassau-county/${village.parentTownSlug}/${village.slug}`}
      />
      <VillageSchemaMarkup
        villageName={village.villageName}
        parentTownName={village.parentTownName}
        metaDescription={village.metaDescription}
        coordinates={village.coordinates}
      />
      <BreadcrumbSchema items={[
        { label: "Nassau County", href: "/locations/nassau-county" },
        { label: village.parentTownName, href: parentTownPath },
        { label: village.villageName }
      ]} />
      {village.faqs && village.faqs.length > 0 && <FAQSchema faqs={village.faqs} />}

      <section className="bg-charcoal text-white py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <nav className="flex items-center gap-1 text-sm text-white/60 mb-6 flex-wrap" aria-label="Breadcrumb" data-testid="nav-breadcrumb">
            <Link href="/">
              <span className="hover:text-gold cursor-pointer">Home</span>
            </Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/locations/nassau-county">
              <span className="hover:text-gold cursor-pointer">Nassau County</span>
            </Link>
            <ChevronRight className="h-3 w-3" />
            <Link href={parentTownPath}>
              <span className="hover:text-gold cursor-pointer">{village.parentTownName}</span>
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-gold">{village.villageName}</span>
          </nav>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Link href={parentTownPath}>
                <span className="inline-flex items-center gap-1 text-gold text-sm mb-4 cursor-pointer" data-testid="link-back-parent">
                  <ArrowLeft className="h-4 w-4" />
                  {village.parentTownName}
                </span>
              </Link>
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="h-5 w-5 text-gold" />
                <span className="text-gold font-medium">{village.villageName}, Nassau County, NY</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6" data-testid="text-village-h1">
                {village.h1}
              </h1>
              {introSection && introSection.paragraphs.length > 0 && (
                <p className="text-lg text-white/90 mb-8">
                  {introSection.paragraphs[0]}
                </p>
              )}
              <div className="flex flex-wrap gap-4">
                <Link href="/contact">
                  <Button size="lg" className="bg-gold text-navy" data-testid="button-village-offer">
                    Get Your Cash Offer
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <a href="tel:5165486558">
                  <Button size="lg" variant="outline" className="border-white text-white bg-transparent">
                    <Phone className="mr-2 h-5 w-5" />
                    (516) 548-6558
                  </Button>
                </a>
              </div>
            </div>
            <div>
              <ContactForm
                title={`Sell Your ${village.villageName} Home`}
                description="Get a fair cash offer within 24 hours."
                source={`nassau-${village.parentTownSlug}-${village.slug}`}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {introSection && introSection.paragraphs.length > 1 && (
              <div className="mb-12">
                {introSection.paragraphs.slice(1).map((p, i) => (
                  <p key={i} className="text-lg text-muted-foreground mb-6 leading-relaxed">
                    {p}
                  </p>
                ))}
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  To understand how the broader market affects your home's value, read our <a href="https://blog.thepropertyfather.com/nassau-county-housing-market-2026/" className="text-accent underline">Nassau County housing market outlook for 2026</a>.
                </p>
              </div>
            )}

            {contentSections.map((section, idx) => (
              <div key={idx} className="mb-12">
                <h2 className="text-2xl lg:text-3xl font-bold mb-4" data-testid={`text-section-heading-${idx}`}>
                  {section.heading}
                </h2>
                {section.paragraphs.map((p, pIdx) => (
                  <p key={pIdx} className="text-lg text-muted-foreground mb-4 leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>
            ))}

            <div className="mb-12 bg-gold/10 border border-gold/30 rounded-lg p-8 text-center">
              <h2 className="text-2xl lg:text-3xl font-bold mb-3" data-testid="text-village-cta">
                Ready to Get a Cash Offer in {village.villageName}?
              </h2>
              <p className="text-muted-foreground mb-6">No repairs. No agents. Close on your schedule.</p>
              <Link href="/contact">
                <Button size="lg" className="bg-gold text-navy" data-testid="button-village-mid-cta">
                  Get My Cash Offer
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>

            {village.zipCodes && village.zipCodes.length > 0 && (
              <div className="mb-8">
                <p className="text-sm text-muted-foreground">
                  <strong>ZIP {village.zipCodes.length > 1 ? "Codes" : "Code"}:</strong> {village.zipCodes.join(", ")}
                  {village.schoolDistrict && <> · <strong>School District:</strong> {village.schoolDistrict}</>}
                  {village.lirr && <> · <strong>LIRR:</strong> {village.lirr}</>}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  <strong>Price Range:</strong> {village.medianPrice} <span className="italic">({village.medianPriceSource})</span>
                </p>
              </div>
            )}

            {village.faqs && village.faqs.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl lg:text-3xl font-bold mb-6" data-testid="text-faq-heading">
                  Frequently Asked Questions
                </h2>
                <Accordion type="single" collapsible className="w-full">
                  {village.faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`faq-${index}`}>
                      <AccordionTrigger className="text-left" data-testid={`faq-trigger-${index}`}>
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground leading-relaxed" data-testid={`faq-content-${index}`}>
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            )}

            <div className="mb-12">
              <h2 className="text-xl font-bold mb-4" data-testid="text-situations-heading">
                Selling in {village.villageName}? We Can Help With These Situations
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <Link href="/situations/sell-as-is">
                  <span className="flex items-center gap-2 p-2 rounded border border-border hover:border-gold transition-all cursor-pointer" data-testid="link-situation-sell-as-is">
                    <ArrowRight className="h-3 w-3 text-gold flex-shrink-0" />
                    <span className="text-sm">Sell as-is — no repairs</span>
                  </span>
                </Link>
                <Link href="/situations/inherited-property">
                  <span className="flex items-center gap-2 p-2 rounded border border-border hover:border-gold transition-all cursor-pointer" data-testid="link-situation-inherited">
                    <ArrowRight className="h-3 w-3 text-gold flex-shrink-0" />
                    <span className="text-sm">Inherited property</span>
                  </span>
                </Link>
                <Link href="/situations/probate">
                  <span className="flex items-center gap-2 p-2 rounded border border-border hover:border-gold transition-all cursor-pointer" data-testid="link-situation-probate">
                    <ArrowRight className="h-3 w-3 text-gold flex-shrink-0" />
                    <span className="text-sm">Probate sales</span>
                  </span>
                </Link>
                <Link href="/situations/divorce">
                  <span className="flex items-center gap-2 p-2 rounded border border-border hover:border-gold transition-all cursor-pointer" data-testid="link-situation-divorce">
                    <ArrowRight className="h-3 w-3 text-gold flex-shrink-0" />
                    <span className="text-sm">Selling during divorce</span>
                  </span>
                </Link>
                <Link href="/situations/pre-foreclosure">
                  <span className="flex items-center gap-2 p-2 rounded border border-border hover:border-gold transition-all cursor-pointer" data-testid="link-situation-pre-foreclosure">
                    <ArrowRight className="h-3 w-3 text-gold flex-shrink-0" />
                    <span className="text-sm">Pre-foreclosure help</span>
                  </span>
                </Link>
                <Link href="/contact">
                  <span className="flex items-center gap-2 p-2 rounded border border-gold bg-gold/5 hover:bg-gold/10 transition-all cursor-pointer" data-testid="link-situation-get-offer">
                    <ArrowRight className="h-3 w-3 text-gold flex-shrink-0" />
                    <span className="text-sm font-bold text-gold">Get your cash offer</span>
                  </span>
                </Link>
              </div>
            </div>

            <div className="mb-12 p-6 bg-muted rounded-lg">
              <h3 className="font-bold mb-3 text-sm uppercase tracking-wide text-muted-foreground">Helpful Resources</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {blogLinks.map((link, i) => (
                  <a key={i} href={link.href} target="_blank" rel="noopener noreferrer" className="text-sm text-gold hover:underline flex items-center gap-1" data-testid={`link-blog-${i}`}>
                    <ExternalLink className="h-3 w-3" />
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            <AuthorByline className="mt-8 mb-12" />

            <p className="text-xs text-muted-foreground italic">
              This content is for informational purposes only and does not constitute legal or financial advice. Consult with a licensed attorney and/or financial advisor before making real estate decisions.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-muted">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="text-2xl font-bold mb-6 text-center" data-testid="text-map-heading">
            We Buy Houses in {village.villageName}, NY
          </h2>
          <div className="rounded-lg overflow-hidden shadow-md" data-testid="map-embed">
            <iframe
              src={`https://www.google.com/maps?q=${village.coordinates.lat},${village.coordinates.lng}&z=14&output=embed`}
              width="100%"
              height="350"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              title={`Map of ${village.villageName}, NY`}
            />
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-charcoal text-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Sell Your {village.villageName} Home?
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
            Get your free, no-obligation cash offer today. Call us at{" "}
            <a href="tel:5165486558" className="text-gold underline">(516) 548-6558</a>{" "}
            or fill out our quick form.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="tel:5165486558">
              <Button size="lg" className="bg-gold text-navy" data-testid="button-village-cta-phone">
                <Phone className="mr-2 h-5 w-5" />
                (516) 548-6558
              </Button>
            </a>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-white text-white bg-transparent" data-testid="button-village-cta-form">
                Get Your Cash Offer
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-white/60">
            <Link href={parentTownPath}>
              <span className="underline cursor-pointer" data-testid="link-parent-town">{village.parentTownName}</span>
            </Link>
            <Link href="/locations/nassau-county">
              <span className="underline cursor-pointer" data-testid="link-nassau-county">Nassau County</span>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
