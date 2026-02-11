import { Link, useParams, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import ContactForm from "@/components/ContactForm";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import { getTownBySlug } from "@/data/nassau-towns";
import {
  MapPin,
  Phone,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { useEffect } from "react";

function TownSchemaMarkup({ townName, metaDescription }: { townName: string; metaDescription: string }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": `We Buy Houses for Cash in ${townName}, NY`,
    "provider": {
      "@type": "LocalBusiness",
      "name": "The Property Father",
      "telephone": "(516) 548-6558",
      "url": "https://thepropertyfather.com"
    },
    "areaServed": {
      "@type": "City",
      "name": townName,
      "containedInPlace": {
        "@type": "AdministrativeArea",
        "name": "Nassau County, NY"
      }
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

export default function NassauTownPage() {
  const params = useParams<{ town: string }>();
  const [, setLocation] = useLocation();
  const town = getTownBySlug(params.town || "");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [params.town]);

  if (!town) {
    setLocation("/locations/nassau-county");
    return null;
  }

  const introSection = town.sections.find(s => s.heading === "");
  const contentSections = town.sections.filter(s => s.heading !== "");

  return (
    <Layout>
      <SEO
        title={town.titleTag.replace(" | The Property Father", "")}
        description={town.metaDescription}
        canonicalPath={`/locations/nassau-county/${town.slug}`}
      />
      <TownSchemaMarkup townName={town.townName} metaDescription={town.metaDescription} />

      <section className="bg-charcoal text-white py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Link href="/locations/nassau-county">
                <span className="inline-flex items-center gap-1 text-gold text-sm mb-4 cursor-pointer" data-testid="link-back-nassau">
                  <ArrowLeft className="h-4 w-4" />
                  Nassau County
                </span>
              </Link>
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="h-5 w-5 text-gold" />
                <span className="text-gold font-medium">{town.townName}, Nassau County, NY</span>
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
                source={`nassau-county-${town.slug}`}
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
          </div>
        </div>
      </section>

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
            <Link href="/locations/nassau-county">
              <span className="underline cursor-pointer" data-testid="link-nassau-county">Nassau County</span>
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
