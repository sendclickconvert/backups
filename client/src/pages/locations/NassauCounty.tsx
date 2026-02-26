import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ContactForm from "@/components/ContactForm";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import { BreadcrumbSchema } from "@/components/SchemaMarkup";
import { 
  MapPin, 
  CheckCircle, 
  Phone,
  ArrowRight,
  Building2,
  ChevronRight
} from "lucide-react";

const towns = [
  "Baldwin", "Bellmore", "Bethpage", "Carle Place", "East Meadow",
  "East Rockaway", "Elmont", "Farmingdale", "Floral Park", "Franklin Square",
  "Freeport", "Garden City", "Glen Cove", "Great Neck", "Hempstead",
  "Hicksville", "Inwood", "Island Park", "Jericho", "Lawrence",
  "Levittown", "Long Beach", "Lynbrook", "Malverne", "Manhasset",
  "Massapequa", "Merrick", "Mineola", "New Hyde Park", "Oceanside",
  "Old Bethpage", "Oyster Bay", "Plainview", "Port Washington", "Rockville Centre",
  "Roosevelt", "Roslyn", "Seaford", "Syosset", "Uniondale",
  "Valley Stream", "Wantagh", "Westbury", "Williston Park", "Woodmere"
];

const benefits = [
  "Deep expertise in Nassau County real estate",
  "Fair offers based on local market conditions",
  "We've purchased 200+ homes in Nassau County",
  "Close in as few as 7 days",
  "No repairs, cleaning, or staging needed",
  "Zero fees or commissions"
];

export default function NassauCounty() {
  return (
    <Layout>
      <SEO 
        title="We Buy Houses for Cash in Nassau County"
        description="Sell your Nassau County house fast for cash. The Property Father buys houses in any condition in Hempstead, Long Beach, Glen Cove and all Nassau County towns."
        canonicalPath="/locations/nassau-county"
      />
      <BreadcrumbSchema items={[{ label: "Nassau County" }]} />
      <section className="bg-charcoal text-white py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <nav className="flex items-center gap-1 text-sm text-white/60 mb-6" aria-label="Breadcrumb" data-testid="nav-breadcrumb">
            <Link href="/">
              <span className="hover:text-gold cursor-pointer">Home</span>
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-gold">Nassau County</span>
          </nav>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="h-5 w-5 text-gold" />
                <span className="text-gold font-medium">Nassau County, NY</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                We Buy Houses for Cash in Nassau County
              </h1>
              <p className="text-lg text-white/90 mb-8">
                Looking to sell your Nassau County home fast? Get a fair cash offer within 24 hours and close on your schedule. No agents, no fees, no complications.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/contact">
                  <Button size="lg" className="bg-gold text-navy " data-testid="button-nassau-offer">
                    Get Your Cash Offer
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <a href="tel:5165486558">
                  <Button size="lg" variant="outline" className="border-white text-white  bg-transparent">
                    <Phone className="mr-2 h-5 w-5" />
                    (516) 548-6558
                  </Button>
                </a>
              </div>
            </div>
            <div>
              <ContactForm 
                title="Sell Your Nassau County Home"
                description="Get a fair cash offer within 24 hours."
                source="nassau-county"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                Nassau County's Trusted Cash Home Buyers
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                We understand the unique Nassau County market and have been helping homeowners throughout the county for years. From Hempstead to Great Neck, Long Beach to Oyster Bay, we buy homes in every Nassau County community.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                Our local expertise means we can offer fair prices based on real market conditions, not lowball offers. We're not just investors - we're your neighbors.
              </p>
              <ul className="space-y-3">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <Card className="bg-muted border-0">
                <CardContent className="p-8">
                  <Building2 className="h-16 w-16 text-accent mb-4" />
                  <h3 className="text-2xl font-bold mb-2">200+</h3>
                  <p className="text-muted-foreground">Homes purchased in Nassau County</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-muted">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Towns We Serve in Nassau County
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We buy houses throughout Nassau County. If your town isn't listed, don't worry - we still want to hear from you!
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {towns.map((town, index) => {
              const slug = town.toLowerCase().replace(/\s+/g, "-");
              return (
                <Link key={index} href={`/locations/nassau-county/${slug}`}>
                  <div className="bg-white rounded-md p-3 text-center text-sm font-medium hover-elevate cursor-pointer" data-testid={`link-town-${slug}`}>
                    {town}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-12 bg-muted">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="text-2xl font-bold mb-6 text-center" data-testid="text-map-heading">
            We Buy Houses Throughout Nassau County, NY
          </h2>
          <div className="rounded-lg overflow-hidden shadow-md" data-testid="map-embed">
            <iframe
              src="https://www.google.com/maps?q=40.7282,-73.5594&z=11&output=embed"
              width="100%"
              height="350"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              title="Map of Nassau County, NY"
            />
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-charcoal text-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Sell Your Nassau County Home?
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
            Get your free, no-obligation cash offer today. Call us or fill out our quick form.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="tel:5165486558">
              <Button size="lg" className="bg-gold text-navy ">
                <Phone className="mr-2 h-5 w-5" />
                (516) 548-6558
              </Button>
            </a>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-white text-white  bg-transparent">
                Get Your Cash Offer
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
