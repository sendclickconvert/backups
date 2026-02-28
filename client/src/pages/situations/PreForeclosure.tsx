import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ContactForm from "@/components/ContactForm";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import { BreadcrumbSchema, FAQSchema } from "@/components/SchemaMarkup";
import AuthorByline from "@/components/AuthorByline";
import {
  AlertTriangle,
  CheckCircle,
  Phone,
  ArrowRight,
  Shield,
  Clock,
  DollarSign,
  ChevronRight,
} from "lucide-react";

const benefits = [
  {
    icon: Clock,
    title: "Stop the Clock",
    description:
      "We can close before your foreclosure date, helping you avoid the process entirely.",
  },
  {
    icon: Shield,
    title: "Protect Your Credit",
    description:
      "Avoid the credit damage that comes with foreclosure on your record.",
  },
  {
    icon: DollarSign,
    title: "Walk Away with Cash",
    description:
      "Instead of losing everything, you may be able to walk away with money in your pocket.",
  },
];

const faqs = [
  {
    question:
      "Can I sell my house if I've already received a lis pendens in New York?",
    answer:
      "Yes. A lis pendens is a public notice that a lawsuit has been filed — it does not transfer ownership. You can still sell the property as long as you own it. The proceeds from the sale pay off the mortgage and any lis pendens is removed at closing.",
  },
  {
    question: "What if I owe more than the house is worth?",
    answer:
      "If you're underwater on the mortgage, we can discuss a short sale where the bank agrees to accept less than the full balance owed. This requires bank approval but is still far better than foreclosure on your credit report.",
  },
  {
    question: "How quickly do you need to move?",
    answer:
      "We can close in as few as 7 days. If you have a foreclosure auction date, tell us immediately and we'll prioritize your timeline.",
  },
  {
    question: "Do I need to be current on payments to sell?",
    answer:
      "No. We buy houses from homeowners in all stages of the pre-foreclosure process — whether you're 30 days behind or received a foreclosure filing.",
  },
];

export default function PreForeclosure() {
  return (
    <Layout>
      <SEO
        title="Facing Pre-Foreclosure on Long Island? Sell Fast for Cash"
        description="Behind on mortgage payments in Suffolk or Nassau County? The Property Father buys houses in pre-foreclosure fast. Stop the process, protect your credit, close in 7 days. Call (516) 548-6558."
        canonicalPath="/situations/pre-foreclosure"
      />
      <BreadcrumbSchema items={[{ label: "Pre-Foreclosure" }]} />
      <FAQSchema faqs={faqs} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Sell Your House in Pre-Foreclosure on Long Island",
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
        "description": "Behind on mortgage payments in Suffolk or Nassau County? The Property Father buys houses in pre-foreclosure fast. Stop the process, protect your credit, close in 7 days."
      }) }} />

      <section className="bg-charcoal text-white py-16 lg:py-20" data-testid="section-hero">
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
            <span className="text-gold">Pre-Foreclosure</span>
          </nav>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="h-5 w-5 text-gold" />
                <span className="text-gold font-medium">
                  Pre-Foreclosure Help
                </span>
              </div>
              <h1
                className="text-4xl lg:text-5xl font-bold mb-6"
                data-testid="text-hero-heading"
              >
                Facing Pre-Foreclosure on Long Island? Here Are Your Options
              </h1>
              <p
                className="text-lg text-white/90 mb-8"
                data-testid="text-hero-intro"
              >
                Falling behind on mortgage payments is terrifying — but
                pre-foreclosure is not the end of the road. New York's
                foreclosure process moves slowly, which means Long Island
                homeowners in distress often have more time to act than they
                realize. The Property Father helps homeowners facing
                pre-foreclosure sell fast for cash, pay off the mortgage, and
                walk away with their dignity and their credit score intact.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/contact">
                  <Button
                    size="lg"
                    className="bg-gold text-navy"
                    data-testid="button-foreclosure-offer"
                  >
                    Get Immediate Help
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
                title="Get Help Now"
                description="Time is critical. Contact us immediately."
                source="pre-foreclosure"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20" data-testid="section-benefits">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Why Sell Before Foreclosure?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Selling your home before foreclosure has significant advantages
              over letting the bank take your property.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center" data-testid={`card-benefit-${index}`}>
                <CardContent className="pt-8">
                  <div className="mx-auto w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                    <benefit.icon className="h-7 w-7 text-accent" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-muted" data-testid="section-content">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <article className="prose prose-lg max-w-none">
            <h2
              className="text-3xl font-bold text-foreground mb-4"
              data-testid="text-h2-what-is"
            >
              What Is Pre-Foreclosure?
            </h2>
            <p className="text-muted-foreground mb-4">
              Pre-foreclosure is the period after a homeowner has fallen behind
              on mortgage payments and the lender has issued a formal notice —
              typically a notice of default or, in New York, a lis pendens —
              but before the bank has actually taken ownership of the property.
              During this stage, the homeowner still holds title to the home and
              retains every legal right to sell it.
            </p>
            <p className="text-muted-foreground mb-4">
              Many Long Island homeowners don't realize that pre-foreclosure is
              not the same as foreclosure itself. It is a warning phase, a
              window of opportunity. The bank has signaled its intent to pursue
              legal action, but the property has not been seized, auctioned, or
              transferred. You are still the owner. You can still list the home,
              accept offers, and close a sale — and in most cases, that is
              exactly what you should do.
            </p>
            <p className="text-muted-foreground mb-8">
              The key is acting quickly. Once you receive a default notice or
              lis pendens filing, you should immediately explore your options
              rather than waiting for the situation to escalate. Selling your
              home during pre-foreclosure allows you to pay off the outstanding
              mortgage, avoid the worst consequences of foreclosure, and
              potentially walk away with remaining equity.
            </p>

            <h2
              className="text-3xl font-bold text-foreground mb-4"
              data-testid="text-h2-timeline"
            >
              New York's Foreclosure Timeline
            </h2>
            <p className="text-muted-foreground mb-4">
              New York is a judicial foreclosure state, which means the lender
              cannot simply seize your property. The bank must file a lawsuit in
              state court and obtain a judge's order before any foreclosure sale
              can take place. This legal requirement adds significant time to
              the process — and that time works in your favor.
            </p>
            <p className="text-muted-foreground mb-4">
              From the first missed mortgage payment to a foreclosure auction,
              the typical timeline in New York ranges from 18 to 36 months. The
              process involves multiple steps: the lender must send required
              pre-foreclosure notices, file a lis pendens with the county clerk,
              serve you with a summons and complaint, and then navigate the
              court system before obtaining a judgment of foreclosure and sale.
              At each stage, there are mandatory waiting periods and
              opportunities for the homeowner to respond.
            </p>
            <p className="text-muted-foreground mb-4">
              For Long Island homeowners in Suffolk County and Nassau County,
              this extended timeline means you likely have months — sometimes
              more than a year — to find a solution. However, acting early
              gives you the most options and the best outcome. Waiting until
              the auction date is imminent limits your choices and increases
              your stress significantly.
            </p>
            <p className="text-muted-foreground mb-8">
              New York also has a mandatory settlement conference process for
              residential properties. The court will schedule conferences to
              explore whether the homeowner and lender can reach a workout
              agreement or loan modification. While these conferences can be
              helpful, they are not a guaranteed solution, and many homeowners
              find that selling the property for cash is a faster and more
              reliable path forward.
            </p>

            <h2
              className="text-3xl font-bold text-foreground mb-4"
              data-testid="text-h2-selling"
            >
              How Selling in Pre-Foreclosure Works
            </h2>
            <p className="text-muted-foreground mb-4">
              When you sell your home during pre-foreclosure, the sale proceeds
              are used to pay off the remaining mortgage balance at closing.
              Your title company or attorney handles this process, ensuring the
              lender receives what is owed and any liens or judgments attached to
              the property are satisfied. Once the mortgage is paid in full, the
              foreclosure action is dismissed.
            </p>
            <p className="text-muted-foreground mb-4">
              If the sale price exceeds what you owe — including any late fees,
              penalties, and legal costs the lender has incurred — the remaining
              equity belongs to you. This is one of the most important reasons
              to sell before foreclosure reaches its conclusion: at a
              foreclosure auction, properties often sell below market value, and
              any equity you might have had can be wiped out by accumulated fees
              and a low winning bid.
            </p>
            <p className="text-muted-foreground mb-8">
              The Property Father makes this process as straightforward as
              possible for Long Island homeowners. We provide a fair cash offer
              based on the property's current condition — no repairs needed, no
              staging, no open houses. We work directly with your lender and
              attorney to coordinate the payoff and close the sale quickly,
              often within 7 to 14 days. The foreclosure stops, your mortgage
              is satisfied, and you can move forward.
            </p>

            <h2
              className="text-3xl font-bold text-foreground mb-4"
              data-testid="text-h2-credit"
            >
              The Effect on Your Credit
            </h2>
            <p className="text-muted-foreground mb-4">
              A completed foreclosure is one of the most damaging events that
              can appear on your credit report. It remains on your record for
              seven years, significantly reducing your credit score and making
              it extremely difficult to obtain new mortgage financing, rent an
              apartment, or even pass certain employment background checks
              during that period.
            </p>
            <p className="text-muted-foreground mb-4">
              Selling your home before foreclosure is completed changes how the
              transaction is reported to credit bureaus. If you sell for enough
              to pay off the full mortgage balance, it is reported as a standard
              sale — no foreclosure notation, no deficiency. Even in a short
              sale situation where the bank agrees to accept less than the full
              amount owed, the credit impact is far less severe than a completed
              foreclosure.
            </p>
            <p className="text-muted-foreground mb-8">
              For many Long Island homeowners facing pre-foreclosure, protecting
              their credit score is the single most important reason to sell
              quickly. A standard sale or short sale allows you to rebuild your
              financial life far sooner than a foreclosure would. You can
              qualify for a new mortgage in as little as two to three years
              after a short sale, compared to seven years or more after a
              foreclosure.
            </p>

            <h2
              className="text-3xl font-bold text-foreground mb-4"
              data-testid="text-h2-cash-buyers"
            >
              Why Cash Buyers Are the Fastest Solution in Pre-Foreclosure
            </h2>
            <p className="text-muted-foreground mb-4">
              When time is limited — and in pre-foreclosure, it always is — a
              cash buyer offers the fastest and most reliable path to closing.
              Traditional buyers who rely on mortgage financing introduce
              uncertainty and delay into the process. Their lender must approve
              the loan, order an appraisal, and complete underwriting, which
              typically takes 30 to 60 days. If you have a foreclosure auction
              date approaching, you may not have that kind of time.
            </p>
            <p className="text-muted-foreground mb-4">
              Cash buyers like The Property Father eliminate these obstacles
              entirely. There is no bank approval required on our end, no
              financing contingencies that could cause the deal to fall through,
              and no appraisal delays. We can evaluate your property, make a
              fair offer, and close the transaction in as little as 7 days.
            </p>
            <p className="text-muted-foreground mb-4">
              Additionally, cash buyers purchase homes in as-is condition. If
              your property needs repairs or updates — which is common when
              homeowners have been under financial stress — you don't need to
              invest money you don't have into fixing up the home before
              selling. We buy houses in any condition, in any situation, on
              any timeline.
            </p>
            <p className="text-muted-foreground mb-8">
              For Long Island homeowners in pre-foreclosure, selling to a cash
              buyer is often the difference between walking away with equity
              and dignity, or losing the property at auction with nothing to
              show for it. The sooner you reach out, the more options you have.
            </p>
          </article>
        </div>
      </section>

      <section className="py-16 lg:py-20" data-testid="section-faq">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6" data-testid="faq-list-preforeclosure">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-border pb-6" data-testid={`faq-item-${index}`}>
                <h3 className="text-lg font-semibold text-foreground mb-2" data-testid={`faq-question-${index}`}>{faq.question}</h3>
                <p className="text-muted-foreground text-base" data-testid={`faq-answer-${index}`}>{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-muted" data-testid="section-resources">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-6">
            Related Resources
          </h2>
          <ul className="space-y-3 mb-8">
            <li>
              <a
                href="https://blog.thepropertyfather.com/facing-foreclosure-long-island/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent underline inline-flex items-center gap-1"
                data-testid="link-blog-foreclosure"
              >
                Facing Foreclosure on Long Island? What You Need to Know
                <ArrowRight className="h-4 w-4" />
              </a>
            </li>
            <li>
              <Link href="/locations/nassau-county">
                <span
                  className="text-accent underline inline-flex items-center gap-1 cursor-pointer"
                  data-testid="link-nassau-county"
                >
                  We Buy Houses in Nassau County
                  <ChevronRight className="h-4 w-4" />
                </span>
              </Link>
            </li>
            <li>
              <Link href="/locations/suffolk-county">
                <span
                  className="text-accent underline inline-flex items-center gap-1 cursor-pointer"
                  data-testid="link-suffolk-county"
                >
                  We Buy Houses in Suffolk County
                  <ChevronRight className="h-4 w-4" />
                </span>
              </Link>
            </li>
          </ul>

          <AuthorByline className="mb-8" />

          <div
            className="text-xs text-muted-foreground border-t pt-6"
            data-testid="text-legal-disclaimer"
          >
            <p>
              <strong>Disclaimer:</strong> The information on this page is for
              educational purposes only and does not constitute legal or
              financial advice. Every pre-foreclosure situation is unique. We
              recommend consulting with a licensed attorney or HUD-approved
              housing counselor before making decisions about your property. The
              Property Father is not a law firm and does not provide legal
              representation.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-charcoal text-white" data-testid="section-cta">
        <div className="mx-auto max-w-7xl px-4 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Don't Wait Until It's Too Late
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
            Every day counts in a pre-foreclosure situation. Contact us now to
            explore your options and protect your future.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="tel:5165486558">
              <Button
                size="lg"
                className="bg-gold text-navy"
                data-testid="button-cta-call"
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
                data-testid="button-cta-contact"
              >
                Get Help Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
