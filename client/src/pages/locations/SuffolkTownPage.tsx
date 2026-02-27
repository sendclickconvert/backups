import { Link, useParams, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import ContactForm from "@/components/ContactForm";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import { BreadcrumbSchema, FAQSchema } from "@/components/SchemaMarkup";
import AuthorByline from "@/components/AuthorByline";
import { getTownBySlug, suffolkTownCoordinates } from "@/data/suffolk-towns";
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

function TownSchemaMarkup({ townName, metaDescription }: { townName: string; metaDescription: string }) {
  const coords = suffolkTownCoordinates[townName];
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": `We Buy Houses for Cash in ${townName}, NY`,
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
    "areaServed": {
      "@type": "City",
      "name": townName,
      "containedInPlace": {
        "@type": "AdministrativeArea",
        "name": "Suffolk County, NY"
      },
      ...(coords ? {
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": coords.lat.toString(),
          "longitude": coords.lng.toString()
        }
      } : {})
    },
    "description": metaDescription
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function SuffolkTownPage() {
  const params = useParams<{ town: string }>();
  const [, setLocation] = useLocation();
  const town = getTownBySlug(params.town || "");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [params.town]);

  if (!town) {
    setLocation("/locations/suffolk-county");
    return null;
  }

  const introSection = town.sections.find(s => s.heading === "");
  const contentSections = town.sections.filter(s => s.heading !== "");
  const coords = suffolkTownCoordinates[town.townName];

  return (
    <Layout>
      <SEO
        title={town.titleTag.replace(" | The Property Father", "")}
        description={town.metaDescription}
        canonicalPath={`/locations/suffolk-county/${town.slug}`}
      />
      <TownSchemaMarkup townName={town.townName} metaDescription={town.metaDescription} />
      <BreadcrumbSchema items={[
        { label: "Suffolk County", href: "/locations/suffolk-county" },
        { label: town.townName }
      ]} />
      {town.faqs && town.faqs.length > 0 && <FAQSchema faqs={town.faqs} />}

      <section className="bg-charcoal text-white py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <nav className="flex items-center gap-1 text-sm text-white/60 mb-6" aria-label="Breadcrumb" data-testid="nav-breadcrumb">
            <Link href="/">
              <span className="hover:text-gold cursor-pointer">Home</span>
            </Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/locations/suffolk-county">
              <span className="hover:text-gold cursor-pointer">Suffolk County</span>
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-gold">{town.townName}</span>
          </nav>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Link href="/locations/suffolk-county">
                <span className="inline-flex items-center gap-1 text-gold text-sm mb-4 cursor-pointer" data-testid="link-back-suffolk">
                  <ArrowLeft className="h-4 w-4" />
                  Suffolk County
                </span>
              </Link>
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="h-5 w-5 text-gold" />
                <span className="text-gold font-medium">{town.townName}, Suffolk County, NY</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6" data-testid="text-town-h1">
                {town.h1}
              </h1>
              {introSection && introSection.paragraphs.length > 0 && (
                <p className="text-lg text-white/90 mb-8">
                  {introSection.paragraphs[0]}
                </p>
              )}
              <div className="flex flex-wrap gap-4">
                <Link href="/contact">
                  <Button size="lg" className="bg-gold text-navy" data-testid="button-town-offer">
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
                title={`Sell Your ${town.townName} Home`}
                description="Get a fair cash offer within 24 hours."
                source={`suffolk-county-${town.slug}`}
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

            {town.neighborhoods && town.neighborhoods.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl lg:text-3xl font-bold mb-4" data-testid="text-neighborhoods-heading">
                  Villages and Neighborhoods in {town.townName} We Serve
                </h2>
                {town.zipCodes && town.zipCodes.length > 0 && (
                  <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
                    ZIP codes served: {town.zipCodes.join(", ")}
                  </p>
                )}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {town.neighborhoods.map((n, i) => (
                    <div key={i} className="bg-muted rounded-md px-3 py-2 text-sm text-muted-foreground">
                      {n}
                    </div>
                  ))}
                </div>
                {town.schoolDistrict && (
                  <p className="text-sm text-muted-foreground mt-4">
                    School District: {town.schoolDistrict}
                  </p>
                )}
                {town.lirr && (
                  <p className="text-sm text-muted-foreground mt-1">
                    LIRR Station: {town.lirr}
                  </p>
                )}
              </div>
            )}

            {town.faqs && town.faqs.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl lg:text-3xl font-bold mb-6" data-testid="text-faq-heading">
                  Frequently Asked Questions
                </h2>
                <Accordion type="single" collapsible className="w-full">
                  {town.faqs.map((faq, index) => (
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

      {coords && (
        <section className="py-12 bg-muted">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <h2 className="text-2xl font-bold mb-6 text-center" data-testid="text-map-heading">
              We Buy Houses in {town.townName}, NY
            </h2>
            <div className="rounded-lg overflow-hidden shadow-md" data-testid="map-embed">
              <iframe
                src={`https://www.google.com/maps?q=${coords.lat},${coords.lng}&z=13&output=embed`}
                width="100%"
                height="350"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                title={`Map of ${town.townName}, NY`}
              />
            </div>
          </div>
        </section>
      )}

      <section className="py-16 lg:py-20 bg-charcoal text-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Sell Your {town.townName} Home?
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
            Get your free, no-obligation cash offer today. Call us at{" "}
            <a href="tel:5165486558" className="text-gold underline">(516) 548-6558</a>{" "}
            or fill out our quick form.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="tel:5165486558">
              <Button size="lg" className="bg-gold text-navy" data-testid="button-town-cta-phone">
                <Phone className="mr-2 h-5 w-5" />
                (516) 548-6558
              </Button>
            </a>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-white text-white bg-transparent" data-testid="button-town-cta-form">
                Get Your Cash Offer
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-white/60">
            <Link href="/locations/suffolk-county">
              <span className="underline cursor-pointer" data-testid="link-suffolk-county">Suffolk County</span>
            </Link>
            {town.relatedLinks.map((link, i) => {
              const label = link.split("/").pop()?.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase()) || link;
              return (
                <Link key={i} href={link}>
                  <span className="underline cursor-pointer" data-testid={`link-related-${i}`}>{label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
}
