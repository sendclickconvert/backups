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
  Home,
  CheckCircle,
  Phone,
  ArrowRight,
  Shield,
  Clock,
  DollarSign,
  ChevronRight,
  Users,
  Gavel,
  ExternalLink,
} from "lucide-react";

const faqs = [
  {
    question: "Can I sell an inherited house before probate is complete?",
    answer:
      "In most cases, no — the estate needs to go through probate and the executor needs to be authorized to sell. However, if the property passed via a trust or joint tenancy with right of survivorship, it may transfer outside of probate.",
  },
  {
    question:
      "What if my siblings and I all inherited the property together?",
    answer:
      "All owners on the deed need to agree to sell and sign at closing. We work with multiple heirs regularly and can coordinate the process.",
  },
  {
    question: "Do I need to clean out the house before selling?",
    answer:
      "No. We buy inherited properties with all contents, as-is. You take what you want, leave the rest.",
  },
  {
    question: "How is the sale price determined?",
    answer:
      "We evaluate the property based on current condition, location, and comparable sales in the area. We provide a fair cash offer within 24 hours of submitting your property details.",
  },
];

export default function InheritedProperty() {
  return (
    <Layout>
      <SEO
        title="Sell an Inherited House on Long Island"
        description="Inherited a house in Suffolk or Nassau County that you don't want to keep? We buy inherited properties for cash, as-is, fast. No repairs, no estate sales. Call (516) 548-6558."
        canonicalPath="/situations/inherited-property"
      />
      <BreadcrumbSchema items={[{ label: "Inherited Property" }]} />
      <FAQSchema faqs={faqs} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Sell an Inherited House on Long Island",
        "serviceType": "We Buy Houses for Cash",
        "provider": {
          "@type": "LocalBusiness",
          "name": "The Property Father",
          "telephone": "(516) 548-6558",
          "url": "https://thepropertyfather.com",
          "address": { "@type": "PostalAddress", "streetAddress": "100 Washington Ave", "addressLocality": "Patchogue", "addressRegion": "NY", "postalCode": "11772" },
          "aggregateRating": { "@type": "AggregateRating", "ratingValue": "5.0", "reviewCount": "3", "bestRating": "5", "worstRating": "1" }
        },
        "areaServed": [
          { "@type": "County", "name": "Nassau County, NY" },
          { "@type": "County", "name": "Suffolk County, NY" }
        ],
        "description": "Inherited a house in Suffolk or Nassau County that you don't want to keep? We buy inherited properties for cash, as-is, fast. No repairs, no estate sales."
      }) }} />

      <section className="bg-charcoal text-white py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <nav
            className="flex items-center gap-1 text-sm text-white/60 mb-6"
            aria-label="Breadcrumb"
            data-testid="nav-breadcrumb"
          >
            <Link href="/">
              <span className="hover:text-gold cursor-pointer">Home</span>
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-gold">Inherited Property</span>
          </nav>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Home className="h-5 w-5 text-gold" />
                <span className="text-gold font-medium">Inherited Property</span>
              </div>
              <h1
                className="text-4xl lg:text-5xl font-bold mb-6"
                data-testid="text-hero-heading"
              >
                Inherited a House on Long Island? Here's the Simplest Way to Sell It
              </h1>
              <p
                className="text-lg text-white/90 mb-8"
                data-testid="text-hero-intro"
              >
                Inheriting a house can feel like a gift and a burden at the same time. On Long Island, inherited properties often come with deferred maintenance, complicated family agreements, and carrying costs — property taxes, insurance, utilities — that start adding up immediately. The Property Father helps heirs sell inherited houses quickly for cash, without the stress of repairs, showings, or a lengthy market listing.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/contact">
                  <Button
                    size="lg"
                    className="bg-gold text-navy"
                    data-testid="button-inherited-offer"
                  >
                    Get Your Cash Offer
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <a href="tel:5165486558">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white bg-transparent"
                    data-testid="button-call-hero"
                  >
                    <Phone className="mr-2 h-5 w-5" />
                    (516) 548-6558
                  </Button>
                </a>
              </div>
            </div>
            <div>
              <ContactForm
                title="Inherited Property Consultation"
                description="Get a cash offer for your inherited home."
                source="inherited-property"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20" data-testid="section-options">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
            Your Options When You Inherit a House
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-3xl">
            When a loved one passes and leaves you a property, you generally have four paths forward. Each comes with trade-offs worth understanding before you commit.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-3">
                  <Home className="h-6 w-6 text-accent" />
                  <h3 className="font-semibold text-lg">Keep It and Move In</h3>
                </div>
                <p className="text-muted-foreground">
                  If the home suits your lifestyle, moving in can make sense — but on Long Island, that means inheriting the property taxes, maintenance obligations, and potentially outdated systems that need immediate attention. You'll also need to factor in homeowners insurance and any outstanding liens.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-3">
                  <DollarSign className="h-6 w-6 text-accent" />
                  <h3 className="font-semibold text-lg">Rent It Out</h3>
                </div>
                <p className="text-muted-foreground">
                  Becoming a landlord generates income but requires significant time, capital for repairs and upgrades to meet code, and the patience to deal with tenants, vacancies, and ongoing maintenance — especially if the inherited property hasn't been updated in years.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-3">
                  <Clock className="h-6 w-6 text-accent" />
                  <h3 className="font-semibold text-lg">Sell on the Traditional Market</h3>
                </div>
                <p className="text-muted-foreground">
                  Listing with a real estate agent can yield top dollar, but the process often takes three to six months and requires cleanout, repairs, staging, open houses, and agent commissions of five to six percent. For heirs already managing grief and estate responsibilities, this timeline can be overwhelming.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-3">
                  <Shield className="h-6 w-6 text-accent" />
                  <h3 className="font-semibold text-lg">Sell for Cash, As-Is</h3>
                </div>
                <p className="text-muted-foreground">
                  A cash sale to The Property Father eliminates repairs, agent commissions, and months of carrying costs. You get a fair offer, choose your closing date, and walk away without the burden of managing a property you don't want. For most heirs, this is the fastest and least stressful option.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-muted" data-testid="section-holding-costs">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                The Real Cost of Holding an Inherited Property
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Long Island property taxes are among the highest in the entire country. In Suffolk County, the average homeowner pays over $10,000 per year in property taxes alone. Nassau County is even higher, with averages exceeding $13,000 annually. Those bills don't pause just because you inherited the home — they're due on schedule regardless of whether anyone is living there.
              </p>
              <p className="text-muted-foreground mb-6">
                Beyond taxes, an inherited home demands homeowners insurance (or a vacant-property policy, which costs more), utility payments to prevent pipe freezes and maintain basic upkeep, and lawn or snow maintenance to avoid code violations. If the home has deferred maintenance — a leaky roof, aging HVAC system, or outdated electrical — those costs escalate quickly.
              </p>
              <p className="text-muted-foreground">
                All told, the monthly carrying cost for an inherited Long Island home easily runs $3,000 to $4,000 or more. Every month you hold the property without a plan, you're spending money that could otherwise go toward your own financial goals. Selling quickly for cash stops the bleeding and puts equity back in your pocket.
              </p>
            </div>
            <Card className="bg-charcoal text-white border-0">
              <CardContent className="pt-8 pb-8">
                <h3 className="text-2xl font-bold mb-6">Typical Monthly Carrying Costs</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
                    <span className="text-white/90">Property taxes: $800–$1,200/month</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
                    <span className="text-white/90">Homeowners/vacant insurance: $200–$400/month</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
                    <span className="text-white/90">Utilities (electric, gas, water): $300–$500/month</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
                    <span className="text-white/90">Lawn care / snow removal: $150–$300/month</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
                    <span className="text-white/90">Deferred repairs and maintenance: $500+/month avg.</span>
                  </li>
                </ul>
                <div className="mt-6 pt-6 border-t border-white/20">
                  <p className="text-gold font-bold text-lg">Total: $3,000–$4,000+ per month</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20" data-testid="section-step-up-basis">
        <div className="mx-auto max-w-7xl px-4 lg:px-8 max-w-3xl">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
            Step-Up in Basis: The Tax Advantage of Inherited Property
          </h2>
          <p className="text-lg text-muted-foreground mb-6">
            One significant financial benefit of inheriting real estate is the "step-up in basis." When you inherit a property, the IRS resets the cost basis to the fair market value (FMV) at the date of the decedent's death — not the original purchase price. This means if your parents bought their Long Island home in 1985 for $120,000 and it's now worth $500,000, your cost basis is $500,000, not $120,000.
          </p>
          <p className="text-muted-foreground mb-6">
            The practical impact is enormous: if you sell the inherited property at or near its current fair market value, you'll owe little or no capital gains tax on the sale. This makes selling shortly after inheriting especially advantageous from a tax perspective, because the longer you hold the property, the more it may appreciate beyond the stepped-up basis — and any gain above that new basis becomes taxable.
          </p>
          <p className="text-muted-foreground mb-6">
            For heirs who don't plan to keep the home, selling quickly preserves this tax advantage and avoids the ongoing carrying costs described above. It's often the most financially sound decision.
          </p>
          <Card className="bg-muted">
            <CardContent className="pt-6 pb-6">
              <p className="text-sm text-muted-foreground italic" data-testid="text-tax-disclaimer">
                Tax laws are complex and vary by situation. We strongly recommend consulting a qualified tax advisor or CPA before making decisions about selling inherited property. The information above is for general educational purposes and does not constitute tax advice.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-muted" data-testid="section-as-is">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                Selling As-Is vs. Making Repairs
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Many inherited properties on Long Island haven't been updated in decades. It's common to find original kitchens and bathrooms from the 1960s or '70s, aging roofs, outdated electrical panels, and basements with moisture issues. Bringing these homes up to modern buyer expectations can easily cost $30,000 to $80,000 or more — money most heirs don't want to invest in a property they plan to sell.
              </p>
              <p className="text-muted-foreground mb-6">
                Even cosmetic updates like painting, flooring, and landscaping add up fast when you're paying contractors at Long Island rates. And there's no guarantee that the investment will return dollar-for-dollar at sale. In many cases, heirs spend months coordinating renovations only to discover the improved sale price barely covers the cost of the work plus the carrying costs incurred during the renovation period.
              </p>
              <p className="text-muted-foreground">
                A cash buyer like The Property Father purchases the property in its current condition — no repairs, no cleaning, no staging. You avoid the upfront expense, the project management headaches, and the risk that renovations won't pay off. We factor the property's condition into our offer so you know exactly what you'll receive, with no surprises at closing.
              </p>
            </div>
            <div className="space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                    <Clock className="h-5 w-5 text-accent" />
                    Traditional Sale with Repairs
                  </h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-muted-foreground/60">-</span>
                      <span>Weeks or months of renovation work</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-muted-foreground/60">-</span>
                      <span>$30,000–$80,000+ in contractor costs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-muted-foreground/60">-</span>
                      <span>Ongoing carrying costs during renovations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-muted-foreground/60">-</span>
                      <span>No guarantee of return on investment</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-accent/30">
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                    <Shield className="h-5 w-5 text-accent" />
                    Cash Sale, As-Is
                  </h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                      <span>No repairs or renovations needed</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                      <span>No cleanout required — leave what you don't want</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                      <span>Close in as little as 7–14 days</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                      <span>Zero agent commissions or hidden fees</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20" data-testid="section-our-process">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
            How We Handle Inherited Properties at The Property Father
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-3xl">
            We've worked with dozens of Long Island families navigating the complexities of inherited property sales. Our process is designed to minimize stress and maximize simplicity for heirs.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mb-10">
            <Card>
              <CardContent className="pt-6">
                <div className="mx-auto w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                  <Gavel className="h-7 w-7 text-accent" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-center">Work with Executors &amp; Attorneys</h3>
                <p className="text-muted-foreground text-center">
                  We coordinate directly with estate executors, administrators, and attorneys to ensure the sale complies with all probate and estate requirements under New York law.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="mx-auto w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-7 w-7 text-accent" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-center">Coordinate Multiple Heirs</h3>
                <p className="text-muted-foreground text-center">
                  When siblings or multiple family members inherit a property together, we handle the coordination — getting all parties aligned, answering questions, and managing the paperwork for each owner.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="mx-auto w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                  <DollarSign className="h-7 w-7 text-accent" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-center">Fair Cash Offer, Fast Closing</h3>
                <p className="text-muted-foreground text-center">
                  We provide a transparent cash offer based on the property's condition and local market data. Once accepted, we can close in as little as seven days — or on whatever timeline works best for the estate.
                </p>
              </CardContent>
            </Card>
          </div>
          <p className="text-muted-foreground max-w-3xl">
            Whether the property is in Babylon, Hempstead, Smithtown, or anywhere else on Long Island, we're familiar with local regulations, title requirements, and the inherited property process specific to Nassau and Suffolk County. We handle the heavy lifting so you can focus on your family.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-muted" data-testid="section-faq">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-8">
            Frequently Asked Questions About Selling Inherited Property
          </h2>
          <Accordion type="single" collapsible className="max-w-3xl">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`faq-${index}`}>
                <AccordionTrigger
                  className="text-left text-base font-medium"
                  data-testid={`accordion-trigger-faq-${index}`}
                >
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent
                  className="text-muted-foreground"
                  data-testid={`accordion-content-faq-${index}`}
                >
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="py-16 lg:py-20" data-testid="section-resources">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-6">
            Related Resources
          </h2>
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            <Card className="hover-elevate">
              <CardContent className="pt-6">
                <a
                  href="https://blog.thepropertyfather.com/sell-inherited-house-new-york/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-semibold text-foreground mb-2"
                  data-testid="link-blog-inherited"
                >
                  How to Sell an Inherited House in New York
                  <ExternalLink className="h-4 w-4 text-muted-foreground" />
                </a>
                <p className="text-sm text-muted-foreground">
                  In-depth guide covering the legal, financial, and practical steps to selling inherited real estate in New York State.
                </p>
              </CardContent>
            </Card>
            <Card className="hover-elevate">
              <CardContent className="pt-6">
                <Link href="/locations/nassau-county">
                  <span
                    className="flex items-center gap-2 font-semibold text-foreground mb-2 cursor-pointer"
                    data-testid="link-nassau-county"
                  >
                    We Buy Houses in Nassau County
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </span>
                </Link>
                <p className="text-sm text-muted-foreground">
                  Learn about our cash home buying process in Nassau County, including Hempstead, North Hempstead, and Oyster Bay.
                </p>
              </CardContent>
            </Card>
            <Card className="hover-elevate">
              <CardContent className="pt-6">
                <Link href="/locations/suffolk-county">
                  <span
                    className="flex items-center gap-2 font-semibold text-foreground mb-2 cursor-pointer"
                    data-testid="link-suffolk-county"
                  >
                    We Buy Houses in Suffolk County
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </span>
                </Link>
                <p className="text-sm text-muted-foreground">
                  Explore how we help homeowners in Suffolk County sell fast — from Babylon and Islip to Brookhaven and beyond.
                </p>
              </CardContent>
            </Card>
          </div>

          <AuthorByline className="mb-6" />

          <Card className="bg-muted border-0">
            <CardContent className="pt-6 pb-6">
              <p className="text-xs text-muted-foreground" data-testid="text-legal-disclaimer">
                The information provided on this page is for general informational purposes only and does not constitute legal, tax, or financial advice. Selling inherited real estate involves legal complexities that vary by situation. We recommend consulting with a qualified attorney, CPA, or financial advisor before making any decisions regarding inherited property. The Property Father is not a law firm, accounting firm, or licensed real estate brokerage. Results may vary.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-charcoal text-white" data-testid="section-bottom-cta">
        <div className="mx-auto max-w-7xl px-4 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Sell Your Inherited Property?
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
            Stop paying property taxes, insurance, and maintenance on a home you don't want. Get a fair cash offer today — no obligations, no pressure, no repairs needed.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="tel:5165486558">
              <Button
                size="lg"
                className="bg-gold text-navy"
                data-testid="button-call-bottom"
              >
                <Phone className="mr-2 h-5 w-5" />
                (516) 548-6558
              </Button>
            </a>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white bg-transparent"
                data-testid="button-offer-bottom"
              >
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
