import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ContactForm from "@/components/ContactForm";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import { BreadcrumbSchema, FAQSchema } from "@/components/SchemaMarkup";
import AuthorByline from "@/components/AuthorByline";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  MapPin,
  CheckCircle,
  Phone,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  Scale,
  DollarSign,
  Clock,
  Home,
  FileText,
  ExternalLink
} from "lucide-react";

const existingTowns = [
  { name: "Carle Place", slug: "carle-place", desc: "Small hamlet near Roosevelt Field with convenient Meadowbrook Parkway access" },
  { name: "Floral Park", slug: "floral-park", desc: "Tree-lined streets with pre-war colonials bordering Queens" },
  { name: "Great Neck", slug: "great-neck", desc: "Affluent peninsula community with top-rated schools and Gold Coast estates" },
  { name: "Manhasset", slug: "manhasset", desc: "Upscale North Shore community near Americana Manhasset shopping" },
  { name: "Mineola", slug: "mineola", desc: "Nassau County seat with LIRR hub and diverse housing stock" },
  { name: "New Hyde Park", slug: "new-hyde-park", desc: "Western Nassau community straddling the Queens border" },
  { name: "Port Washington", slug: "port-washington", desc: "Harbor peninsula with waterfront properties and vibrant downtown" },
  { name: "Roslyn", slug: "roslyn", desc: "Historic North Shore village with Gold Coast heritage and charm" },
  { name: "Westbury", slug: "westbury", desc: "Centrally located with diverse housing near the Westbury LIRR station" },
  { name: "Williston Park", slug: "williston-park", desc: "Compact walkable village with strong community identity" },
];

const villages = [
  { name: "Albertson", slug: "albertson", desc: "Residential hamlet near Roslyn and Mineola" },
  { name: "Baxter Estates", slug: "baxter-estates", desc: "Small waterfront village near Port Washington harbor" },
  { name: "East Hills", slug: "east-hills", desc: "Affluent Gold Coast village near Roslyn" },
  { name: "East Williston", slug: "east-williston", desc: "Small residential village near Williston Park" },
  { name: "Flower Hill", slug: "flower-hill", desc: "Residential village near Manhasset and Port Washington" },
  { name: "Great Neck Estates", slug: "great-neck-estates", desc: "Waterfront village on the Great Neck peninsula" },
  { name: "Great Neck Plaza", slug: "great-neck-plaza", desc: "Commercial center of the Great Neck area" },
  { name: "Greenvale", slug: "greenvale", desc: "Hamlet near Glen Cove and LIU Post campus" },
  { name: "Herricks", slug: "herricks", desc: "Residential community with highly rated Herricks school district" },
  { name: "Kings Point", slug: "kings-point", desc: "Exclusive Gold Coast village on Great Neck peninsula with USMMA" },
  { name: "Lake Success", slug: "lake-success", desc: "Small village near New Hyde Park with corporate presence" },
  { name: "Manorhaven", slug: "manorhaven", desc: "Waterfront village on Port Washington peninsula" },
  { name: "Munsey Park", slug: "munsey-park", desc: "Small residential village near Manhasset" },
  { name: "North Hills", slug: "north-hills", desc: "Residential village near Roslyn with newer developments" },
  { name: "Old Westbury", slug: "old-westbury", desc: "Gold Coast estate community with large lots" },
  { name: "Plandome", slug: "plandome", desc: "Waterfront village in the Manhasset area" },
  { name: "Plandome Heights", slug: "plandome-heights", desc: "Small residential village near Plandome" },
  { name: "Plandome Manor", slug: "plandome-manor", desc: "Quiet residential village in the Manhasset area" },
  { name: "Port Washington North", slug: "port-washington-north", desc: "Northern section of Port Washington peninsula" },
  { name: "Roslyn Estates", slug: "roslyn-estates", desc: "Residential village near historic Roslyn" },
  { name: "Roslyn Harbor", slug: "roslyn-harbor", desc: "Waterfront Gold Coast village near Roslyn" },
  { name: "Roslyn Heights", slug: "roslyn-heights", desc: "Residential hamlet south of Roslyn village" },
  { name: "Russell Gardens", slug: "russell-gardens", desc: "Small village in the Great Neck area" },
  { name: "Saddle Rock", slug: "saddle-rock", desc: "Small village on the Great Neck peninsula" },
  { name: "Sands Point", slug: "sands-point", desc: "Exclusive Gold Coast village at the tip of Port Washington peninsula" },
  { name: "Searingtown", slug: "searingtown", desc: "Hamlet near Albertson and Herricks" },
  { name: "Thomaston", slug: "thomaston", desc: "Small village in the Great Neck area" },
  { name: "University Gardens", slug: "university-gardens", desc: "Residential community near Great Neck" },
];

const faqs = [
  {
    question: "How fast can you close on a North Hempstead home?",
    answer: "We can close in as few as 7 days after you accept our offer. Most North Hempstead transactions close within 14 to 21 days. Because we pay cash, there are no mortgage approvals or bank appraisals to wait for. Under New York law (Judiciary Law § 484), an attorney handles the closing — we coordinate and cover that cost."
  },
  {
    question: "Do you buy houses in the Gold Coast communities of North Hempstead?",
    answer: "Yes. We buy properties throughout the North Shore Gold Coast — Kings Point, Sands Point, Old Westbury, Roslyn Harbor, and all the estate communities. Whether it's a large home that needs significant renovation or a property with complex estate/probate issues, we handle it. These properties often have unique challenges that make traditional sales difficult."
  },
  {
    question: "What's the price range for homes in the Town of North Hempstead?",
    answer: "North Hempstead has one of the widest price ranges in Nassau County, from around $400,000 in some areas to well over $5 million in Gold Coast communities like Kings Point and Sands Point. Our cash offers are based on comparable sales in your specific village or hamlet, not townwide averages. Per Redfin/Zillow estimates, the median sits around $850,000 to $1,100,000 depending on the community."
  },
  {
    question: "Are there any fees when selling to The Property Father?",
    answer: "Zero. We charge no commissions, no closing costs, and no hidden fees. The offer we present is the amount you walk away with at closing. We cover all costs including the attorney, title search, and Nassau County transfer taxes."
  },
  {
    question: "What types of properties do you buy in North Hempstead?",
    answer: "We buy single-family homes, multi-family properties, condos, co-ops, and vacant lots throughout the Town of North Hempstead. Condition doesn't matter — fire damage, foundation issues, outdated systems, hoarder situations, or simply a home that needs cosmetic updates. If it's in North Hempstead, we'll make an offer."
  }
];

export default function NorthHempstead() {
  return (
    <Layout>
      <SEO
        title="We Buy Houses for Cash in North Hempstead NY | The Property Father"
        description="Sell your North Hempstead home fast for cash. We buy houses in any condition throughout Great Neck, Port Washington, Manhasset, Roslyn, and all North Hempstead communities. No agents, no fees. Call (516) 548-6558."
        canonicalPath="/locations/nassau-county/north-hempstead"
      />
      <BreadcrumbSchema items={[
        { label: "Nassau County", href: "/locations/nassau-county" },
        { label: "North Hempstead" }
      ]} />
      <FAQSchema faqs={faqs} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "We Buy Houses for Cash in North Hempstead, NY",
        "provider": {
          "@type": "LocalBusiness",
          "name": "The Property Father",
          "telephone": "(516) 548-6558",
          "url": "https://thepropertyfather.com",
          "address": { "@type": "PostalAddress", "streetAddress": "100 Washington Ave", "addressLocality": "Patchogue", "addressRegion": "NY", "postalCode": "11772" },
          "aggregateRating": { "@type": "AggregateRating", "ratingValue": "5.0", "reviewCount": "3", "bestRating": "5", "worstRating": "1" }
        },
        "areaServed": [
          { "@type": "AdministrativeArea", "name": "Town of North Hempstead, Nassau County, NY" },
          ...existingTowns.map(t => ({ "@type": "City", "name": t.name + ", NY" })),
          ...villages.map(v => ({ "@type": "City", "name": v.name + ", NY" }))
        ],
        "serviceType": "We Buy Houses for Cash",
        "description": "The Property Father buys houses for cash in any condition throughout the Town of North Hempstead, Nassau County, NY."
      }) }} />

      <section className="bg-charcoal text-white py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <nav className="flex items-center gap-1 text-sm text-white/60 mb-6" aria-label="Breadcrumb" data-testid="nav-breadcrumb">
            <Link href="/">
              <span className="hover:text-gold cursor-pointer">Home</span>
            </Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/locations/nassau-county">
              <span className="hover:text-gold cursor-pointer">Nassau County</span>
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-gold">North Hempstead</span>
          </nav>
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
                <span className="text-gold font-medium">Town of North Hempstead, Nassau County, NY</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6" data-testid="text-north-hempstead-h1">
                We Buy Houses for Cash in North Hempstead, NY
              </h1>
              <p className="text-lg text-white/90 mb-4">
                The Town of North Hempstead spans Nassau County's prestigious North Shore — from the Gold Coast estates of Kings Point and Sands Point to the commuter-friendly villages along the LIRR's Port Washington and Oyster Bay branches. With median home values exceeding $850,000 in many communities (per Redfin estimates), the stakes are high when you need to sell quickly.
              </p>
              <p className="text-lg text-white/90 mb-8">
                The Property Father buys houses for cash in any condition throughout the Town of North Hempstead. No agents, no repairs, no fees. We close on your schedule — as fast as 7 days.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/contact">
                  <Button size="lg" className="bg-gold text-navy" data-testid="button-north-hempstead-offer">
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
                title="Sell Your North Hempstead Home"
                description="Get a fair cash offer within 24 hours."
                source="nassau-north-hempstead"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6" data-testid="text-why-cash">
              Why North Hempstead Homeowners Choose Cash Buyers
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              North Hempstead is home to some of Long Island's most desirable communities — Great Neck, Manhasset, Port Washington, and Roslyn draw buyers willing to pay premium prices for move-in ready homes. But that premium market creates a challenging dynamic for homeowners whose properties don't meet today's buyer expectations.
            </p>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Many of the homes in North Hempstead were built between the 1920s and 1960s. The charming colonials and Tudors along tree-lined streets in Floral Park, the sprawling estates in Old Westbury, and the waterfront properties in Port Washington and Manhasset all share one thing in common: they're aging. Roofs, HVAC systems, plumbing, and electrical all have a lifespan, and when multiple major systems need attention, the cost of getting a property market-ready can exceed $100,000 — especially in the Gold Coast communities where buyer expectations are highest.
            </p>
            <ul className="space-y-3 mb-6 text-lg text-muted-foreground">
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-1" />
                <span><strong>High property taxes</strong> — North Hempstead property taxes often exceed $15,000 to $30,000 per year depending on the village, making holding costs prohibitive.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-1" />
                <span><strong>Gold Coast estate properties</strong> — Large homes in Kings Point, Sands Point, and Old Westbury can sit on the market for months or years when they need work.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-1" />
                <span><strong>Inherited properties</strong> — Many families inherit homes from parents who lived in North Hempstead for decades. These properties often need significant updates.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-1" />
                <span><strong>Co-ops and condos</strong> — Some North Hempstead communities have co-op and condo inventory where board restrictions complicate traditional sales.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-muted">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6" data-testid="text-process">
              How Our Cash Home Buying Process Works in North Hempstead
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              We keep it simple. Here's what happens when you contact The Property Father about your North Hempstead property:
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {[
                { step: "1", title: "Contact Us", desc: "Call (516) 548-6558 or fill out our online form. Tell us about your property — condition doesn't matter." },
                { step: "2", title: "Property Walkthrough", desc: "We visit your North Hempstead home, usually within 48 hours. No need to clean, repair, or stage." },
                { step: "3", title: "Receive Your Offer", desc: "We present a fair cash offer based on current market conditions in your specific village — typically within 24 hours." },
                { step: "4", title: "Review with Your Attorney", desc: "Under NY Judiciary Law § 484, only an attorney may draft real estate contracts. We recommend your own attorney review everything." },
                { step: "5", title: "Choose Your Closing Date", desc: "As fast as 7 days or up to 60 days — whatever timeline works for your situation." },
                { step: "6", title: "Get Paid", desc: "At closing, you receive your cash. No commissions, no closing costs deducted. We cover all costs." },
              ].map((item, idx) => (
                <Card key={idx} className="border-0 shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-full bg-gold text-navy flex items-center justify-center font-bold text-sm">{item.step}</div>
                      <h3 className="font-bold">{item.title}</h3>
                    </div>
                    <p className="text-muted-foreground text-sm">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Under NY Real Property Law § 240, all real estate contracts must be in writing. We handle the paperwork through a licensed title company and ensure the entire process follows New York state requirements.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6" data-testid="text-pricing">
              What Cash Buyers Pay for North Hempstead Homes
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Our offers typically range from 70% to 85% of the after-repair value (ARV). For a North Hempstead property worth $900,000 in move-in condition, you might receive an offer in the $630,000 to $765,000 range, depending on the repairs needed and specific location.
            </p>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              While that's below full retail value, consider the costs you avoid: 5% to 6% in agent commissions ($45,000–$54,000 on a $900K home), 2% to 4% in closing costs, plus renovation expenses and months of property taxes, insurance, and carrying costs. For many homeowners, the net proceeds from a cash sale end up comparable — or better — than a traditional listing.
            </p>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <h3 className="font-bold mb-3 flex items-center gap-2"><DollarSign className="h-5 w-5 text-gold" /> Traditional Sale</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>Sale price: $900,000</li>
                    <li>Agent commissions: -$49,500</li>
                    <li>Closing costs: -$27,000</li>
                    <li>Repairs/staging: -$40,000</li>
                    <li>Carrying costs (4 months): -$12,000</li>
                    <li className="font-bold text-foreground pt-2 border-t">Net: ~$771,500</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm bg-gold/5">
                <CardContent className="p-6">
                  <h3 className="font-bold mb-3 flex items-center gap-2"><DollarSign className="h-5 w-5 text-gold" /> Cash Sale to Us</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>Cash offer: $720,000</li>
                    <li>Agent commissions: $0</li>
                    <li>Closing costs: $0</li>
                    <li>Repairs: $0</li>
                    <li>Carrying costs: $0</li>
                    <li className="font-bold text-foreground pt-2 border-t">Net: $720,000</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-muted">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold mb-8 text-center" data-testid="text-towns-heading">
            Communities We Serve in the Town of North Hempstead
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {existingTowns.map((town) => (
              <Link key={town.slug} href={`/locations/nassau-county/${town.slug}`}>
                <Card className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer h-full">
                  <CardContent className="p-4">
                    <h3 className="font-bold text-gold mb-1" data-testid={`link-town-${town.slug}`}>{town.name}</h3>
                    <p className="text-sm text-muted-foreground">{town.desc}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <h3 className="text-2xl font-bold mb-6 text-center">Villages & Neighborhoods</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {villages.map((village) => (
              <Link key={village.slug} href={`/locations/nassau-county/north-hempstead/${village.slug}`}>
                <Card className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer h-full">
                  <CardContent className="p-4">
                    <h3 className="font-bold text-gold mb-1" data-testid={`link-village-${village.slug}`}>{village.name}</h3>
                    <p className="text-sm text-muted-foreground">{village.desc}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6" data-testid="text-situations">
              Situations We Help With
            </h2>
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {[
                { label: "Divorce", href: "/situations/divorce" },
                { label: "Foreclosure", href: "https://blog.thepropertyfather.com/facing-foreclosure-long-island/" },
                { label: "Inherited Property", href: "/situations/inherited-property" },
                { label: "Probate Sales", href: "/situations/probate" },
                { label: "Selling As-Is", href: "https://blog.thepropertyfather.com/sell-house-as-is-long-island/" },
                { label: "Selling with Liens", href: "https://blog.thepropertyfather.com/sell-house-with-liens-long-island/" },
              ].map((item, idx) => {
                const isExternal = item.href.startsWith("http");
                return isExternal ? (
                  <a key={idx} href={item.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gold hover:underline" data-testid={`link-situation-${idx}`}>
                    <ExternalLink className="h-4 w-4" />
                    {item.label}
                  </a>
                ) : (
                  <Link key={idx} href={item.href}>
                    <span className="flex items-center gap-2 text-gold hover:underline cursor-pointer" data-testid={`link-situation-${idx}`}>
                      <ArrowRight className="h-4 w-4" />
                      {item.label}
                    </span>
                  </Link>
                );
              })}
            </div>

            <h2 className="text-3xl lg:text-4xl font-bold mb-6" data-testid="text-market-data">
              North Hempstead Market Data
            </h2>
            <div className="grid sm:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <p className="text-3xl font-bold text-gold">$850K–$1.1M</p>
                <p className="text-sm text-muted-foreground">Median Home Price Range</p>
                <p className="text-xs text-muted-foreground italic">per Redfin/Zillow estimates</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-gold">45–75</p>
                <p className="text-sm text-muted-foreground">Avg. Days on Market</p>
                <p className="text-xs text-muted-foreground italic">for traditional sales</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-gold">~2.1%</p>
                <p className="text-sm text-muted-foreground">Avg. Property Tax Rate</p>
                <p className="text-xs text-muted-foreground italic">Nassau County Dept. of Assessment</p>
              </div>
            </div>

            <h2 className="text-2xl lg:text-3xl font-bold mb-6" data-testid="text-faq-heading">
              Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="w-full mb-8">
              {faqs.map((faq, index) => (
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

            <AuthorByline className="mt-8 mb-8" />

            <p className="text-xs text-muted-foreground italic">
              This content is for informational purposes only and does not constitute legal or financial advice. Consult with a licensed attorney and/or financial advisor before making real estate decisions.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-muted">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="text-2xl font-bold mb-6 text-center" data-testid="text-map-heading">
            We Buy Houses in North Hempstead, NY
          </h2>
          <div className="rounded-lg overflow-hidden shadow-md" data-testid="map-embed">
            <iframe
              src="https://www.google.com/maps?q=40.7862,-73.6868&z=12&output=embed"
              width="100%"
              height="350"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              title="Map of North Hempstead, NY"
            />
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-charcoal text-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Sell Your North Hempstead Home?
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
            Get your free, no-obligation cash offer today. Call us at{" "}
            <a href="tel:5165486558" className="text-gold underline">(516) 548-6558</a>{" "}
            or fill out our quick form.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="tel:5165486558">
              <Button size="lg" className="bg-gold text-navy" data-testid="button-cta-phone">
                <Phone className="mr-2 h-5 w-5" />
                (516) 548-6558
              </Button>
            </a>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-white text-white bg-transparent" data-testid="button-cta-form">
                Get Your Cash Offer
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-white/60">
            <Link href="/locations/nassau-county">
              <span className="underline cursor-pointer">Nassau County</span>
            </Link>
            <Link href="/locations/suffolk-county">
              <span className="underline cursor-pointer">Suffolk County</span>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
