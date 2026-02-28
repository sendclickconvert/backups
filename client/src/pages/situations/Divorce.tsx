import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ContactForm from "@/components/ContactForm";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import { BreadcrumbSchema, FAQSchema } from "@/components/SchemaMarkup";
import AuthorByline from "@/components/AuthorByline";
import { 
  Heart, 
  CheckCircle, 
  Phone,
  ArrowRight,
  Shield,
  Clock,
  DollarSign,
  ChevronRight
} from "lucide-react";

const benefits = [
  {
    icon: Clock,
    title: "Fast Resolution",
    description: "Close quickly so both parties can move forward. No waiting months for a traditional sale."
  },
  {
    icon: Shield,
    title: "Confidential Process",
    description: "We handle everything discreetly. Your personal situation stays private."
  },
  {
    icon: DollarSign,
    title: "Fair Split",
    description: "Get a clear cash offer that makes dividing assets straightforward."
  }
];

const reasons = [
  "Need to sell quickly to finalize divorce proceedings",
  "Want to avoid the stress of listing and showing the home",
  "One spouse wants to keep the house but can't afford to buy out the other",
  "Both parties want a clean break and fresh start",
  "Facing difficulty agreeing on listing price or agent selection",
  "Property needs repairs neither party wants to handle"
];

const faqs = [
  {
    question: "Can I sell my house before the divorce is finalized in New York?",
    answer: "Yes, but both spouses typically need to agree to the sale and sign the deed. A cash sale with a flexible closing date makes this easier to coordinate."
  },
  {
    question: "Do I need a lawyer to sell my house during a divorce?",
    answer: "While not legally required for the sale itself, most divorcing couples work with a real estate attorney to ensure the proceeds are properly allocated per the divorce agreement."
  },
  {
    question: "How quickly can we close if we're under a court deadline?",
    answer: "The Property Father can close in as few as 7 days. We work with your attorneys and your timeline."
  },
  {
    question: "Will my soon-to-be ex have to be present at closing?",
    answer: "In most cases, yes — both parties on the deed need to sign. We coordinate with both sides to make this as simple as possible."
  }
];

export default function Divorce() {
  return (
    <Layout>
      <SEO
        title="Sell Your House During Divorce on Long Island"
        description="Going through a divorce on Long Island? We buy houses fast for cash so you can split the proceeds and move on. No repairs, no agents, close in 7 days. Call (516) 548-6558."
        canonicalPath="/situations/divorce"
      />
      <BreadcrumbSchema items={[{ label: "Divorce" }]} />
      <FAQSchema faqs={faqs} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Sell Your House During Divorce on Long Island",
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
        "description": "Going through a divorce on Long Island? We buy houses fast for cash so you can split the proceeds and move on. No repairs, no agents, close in 7 days."
      }) }} />

      <section className="bg-charcoal text-white py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <nav className="flex items-center gap-1 text-sm text-white/60 mb-6" aria-label="Breadcrumb" data-testid="nav-breadcrumb">
            <Link href="/">
              <span className="hover:text-gold cursor-pointer">Home</span>
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-gold">Divorce</span>
          </nav>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Heart className="h-5 w-5 text-gold" />
                <span className="text-gold font-medium">Divorce Situations</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                Selling Your Long Island Home During Divorce
              </h1>
              <p className="text-lg text-white/90 mb-8">
                Divorce is one of the most stressful situations a homeowner can face. When the marital home is involved, the process gets even more complicated — especially on Long Island where property values are high and the traditional selling process can take months. The Property Father helps divorcing couples sell quickly for cash so both parties can move forward.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/contact">
                  <Button size="lg" className="bg-gold text-navy" data-testid="button-divorce-offer">
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
                title="Get Your Cash Offer"
                description="Confidential consultation within 24 hours."
                source="divorce"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Why Divorcing Couples Choose Us
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We understand the unique challenges of selling a home during divorce and offer solutions that work for both parties.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-8">
                  <div className="mx-auto w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                    <benefit.icon className="h-7 w-7 text-accent" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-white">
        <div className="mx-auto max-w-4xl px-4 lg:px-8 prose prose-lg max-w-none">
          <h2 className="text-3xl font-bold text-foreground mb-4">How Selling for Cash Simplifies a Divorce Settlement</h2>
          <p className="text-muted-foreground mb-4">
            Selling a home during a divorce adds an extra layer of complexity to an already difficult process. When a couple decides to list their home the traditional way, they must agree on a listing price, choose a real estate agent, coordinate showings, negotiate with buyers, and wait months for a closing. During a divorce, every one of these steps becomes an opportunity for disagreement and delay.
          </p>
          <p className="text-muted-foreground mb-4">
            A cash sale eliminates these friction points entirely. With The Property Father, there is no need for a real estate agent, no listing, no showings, and no drawn-out negotiation. You receive a fair cash offer quickly, and the closing can happen in as few as seven days. This gives both spouses a clear dollar amount to work with, which simplifies the division of assets and removes the home as a source of ongoing conflict.
          </p>
          <p className="text-muted-foreground mb-8">
            For divorcing couples on Long Island, where property values can be substantial, having a definitive cash offer means you can finalize your settlement faster and start your next chapter sooner. There is no guessing about what the home might sell for on the open market, no inspections or repair demands from buyers, and no risk of a deal falling through at the last minute.
          </p>

          <h2 className="text-3xl font-bold text-foreground mb-4">New York Divorce Law and Your Home</h2>
          <p className="text-muted-foreground mb-4">
            New York is an equitable distribution state, which means that marital property — including the family home — is divided fairly, but not necessarily equally. The court considers factors such as the length of the marriage, each spouse's income and earning potential, and contributions to the property when determining how assets should be split. This means that a 50/50 split is not guaranteed, and the outcome depends on the specific circumstances of each case.
          </p>
          <p className="text-muted-foreground mb-4">
            When the marital home is sold on the open market, the timeline is outside of your control. Market conditions, buyer financing, inspections, and appraisals can all introduce delays that interfere with divorce proceedings. A court-ordered deadline to resolve property matters can come and go while the home sits on the market waiting for a buyer.
          </p>
          <p className="text-muted-foreground mb-8">
            Selling to a cash buyer like The Property Father puts the timeline back in your hands. You and your spouse decide when to close, and the proceeds are distributed at the closing table according to your divorce agreement. This level of control is particularly valuable when courts are involved and deadlines need to be met.
          </p>

          <h2 className="text-3xl font-bold text-foreground mb-4">What Happens to the House in a Divorce in New York?</h2>
          <p className="text-muted-foreground mb-4">
            When a married couple in New York decides to divorce, there are generally three options for the marital home. The first option is for one spouse to buy out the other's share. This requires the buying spouse to qualify for a new mortgage on their own and come up with enough cash to compensate the other party. On Long Island, where home values regularly exceed $500,000, this can be a significant financial hurdle.
          </p>
          <p className="text-muted-foreground mb-4">
            The second option is to list the home on the open market and split the proceeds after the sale. While this may maximize the sale price, it also introduces uncertainty. The home could sit on the market for months, and both spouses remain tied to the property — financially and emotionally — until it sells. During this time, mortgage payments, property taxes, insurance, and maintenance costs continue to accumulate.
          </p>
          <p className="text-muted-foreground mb-8">
            The third option is to sell directly to a cash buyer. This approach provides certainty, speed, and simplicity. Both spouses agree to accept a cash offer, the sale closes quickly, and the proceeds are divided according to the divorce settlement. There are no contingencies, no financing delays, and no risk of a buyer backing out. For many Long Island couples, this is the most practical path forward.
          </p>

          <h2 className="text-3xl font-bold text-foreground mb-4">Why Long Island Homeowners Choose a Cash Buyer During Divorce</h2>
          <p className="text-muted-foreground mb-4">
            Long Island's real estate market presents unique challenges for divorcing homeowners. Homes in Nassau and Suffolk counties often need updates or repairs to attract top-dollar offers on the open market. During a divorce, neither spouse may have the time, energy, or willingness to invest in preparing the home for sale. Disagreements over who pays for repairs or how to stage the home can further delay the process.
          </p>
          <p className="text-muted-foreground mb-4">
            When you sell to The Property Father, none of that matters. We buy homes in any condition — no repairs, no cleaning, no staging required. There are no showings to schedule around two separate households, no open houses to plan, and no strangers walking through your home during an already difficult time.
          </p>
          <p className="text-muted-foreground mb-8">
            The cash proceeds are distributed cleanly at the closing table. Your attorneys can be present to ensure the funds are allocated correctly per the divorce agreement. There are no agent commissions to reduce the proceeds and no hidden fees. Both parties walk away with their share on the same day, allowing everyone to move on.
          </p>

          <h2 className="text-3xl font-bold text-foreground mb-4">How The Property Father Works</h2>
          <p className="text-muted-foreground mb-4">
            Our process is designed to be as simple and transparent as possible, especially for homeowners navigating a divorce. It works in three straightforward steps.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Step 1: Submit your property information.</strong> Fill out our quick online form or call us at (516) 548-6558. Tell us about your property and your situation. Everything you share is completely confidential.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Step 2: Get a cash offer within 24 hours.</strong> We evaluate your property and present you with a fair, no-obligation cash offer. There are no fees, no commissions, and no pressure. You and your spouse can review the offer with your respective attorneys and take the time you need to decide.
          </p>
          <p className="text-muted-foreground mb-8">
            <strong>Step 3: Close in as few as 7 days.</strong> Once both parties agree to the offer, we handle the rest. You choose the closing date that works best for your situation. At closing, the proceeds are distributed according to your divorce agreement, and both parties can move forward with their lives.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-muted">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                Common Divorce Home-Selling Situations
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                We've helped many couples in divorce situations. Whatever your circumstances, we can find a solution that works for everyone.
              </p>
              <ul className="space-y-3">
                {reasons.map((reason, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-charcoal rounded-md p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">How We Help</h3>
              <p className="text-white/80 mb-6">
                We work with divorce attorneys and can coordinate with both parties to ensure a smooth transaction. Our cash offers provide certainty and help you avoid lengthy negotiations over repairs or listing prices.
              </p>
              <p className="text-white/80">
                Close in as few as 7 days and divide the proceeds fairly. It's that simple.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-white">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6" data-testid="faq-list-divorce">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-border pb-6" data-testid={`faq-item-${index}`}>
                <h3 className="text-lg font-semibold text-foreground mb-2" data-testid={`faq-question-${index}`}>{faq.question}</h3>
                <p className="text-muted-foreground text-base" data-testid={`faq-answer-${index}`}>{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-6">Related Resources</h2>
          <ul className="space-y-3 mb-8">
            <li>
              <a
                href="https://blog.thepropertyfather.com/sell-house-during-divorce-long-island/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent underline hover:text-accent/80 flex items-center gap-2"
                data-testid="link-blog-divorce"
              >
                <ArrowRight className="h-4 w-4" />
                How to Sell Your House During a Divorce on Long Island (Blog)
              </a>
            </li>
            <li>
              <Link href="/locations/nassau-county">
                <span className="text-accent underline hover:text-accent/80 flex items-center gap-2 cursor-pointer" data-testid="link-nassau-county">
                  <ArrowRight className="h-4 w-4" />
                  We Buy Houses in Nassau County
                </span>
              </Link>
            </li>
            <li>
              <Link href="/locations/suffolk-county">
                <span className="text-accent underline hover:text-accent/80 flex items-center gap-2 cursor-pointer" data-testid="link-suffolk-county">
                  <ArrowRight className="h-4 w-4" />
                  We Buy Houses in Suffolk County
                </span>
              </Link>
            </li>
          </ul>

          <AuthorByline className="mb-8" />

          <div className="border-t pt-6">
            <p className="text-xs text-muted-foreground" data-testid="text-legal-disclaimer">
              Disclaimer: The information on this page is for general informational purposes only and does not constitute legal advice. Every divorce and real estate transaction is unique. We recommend consulting with a licensed attorney in New York State regarding your specific situation. The Property Father is not a law firm and does not provide legal counsel.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-charcoal text-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Move Forward?
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
            Get a fair cash offer and close on your timeline. We handle everything discreetly and professionally.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="tel:5165486558">
              <Button size="lg" className="bg-gold text-navy" data-testid="button-divorce-call-bottom">
                <Phone className="mr-2 h-5 w-5" />
                (516) 548-6558
              </Button>
            </a>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-white text-white bg-transparent" data-testid="button-divorce-offer-bottom">
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
