import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ContactForm from "@/components/ContactForm";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import { BreadcrumbSchema, FAQSchema } from "@/components/SchemaMarkup";
import AuthorByline from "@/components/AuthorByline";
import {
  Wrench,
  CheckCircle,
  Phone,
  ArrowRight,
  Clock,
  DollarSign,
  ChevronRight
} from "lucide-react";

const benefits = [
  {
    icon: Wrench,
    title: "No Repairs Needed",
    description: "We buy houses in any condition. No fixing, no upgrading, no cleaning required."
  },
  {
    icon: Clock,
    title: "Fast Closing",
    description: "Close in as few as 7 days. No waiting for inspections or buyer financing."
  },
  {
    icon: DollarSign,
    title: "Fair Cash Offer",
    description: "Get a competitive offer based on your home's current condition and after-repair value."
  }
];

const conditions = [
  "Outdated kitchens and bathrooms",
  "Roof issues and missing shingles",
  "Foundation problems and structural cracks",
  "Water damage and mold",
  "Fire damage",
  "Code violations",
  "Hoarder situations",
  "Tenant-occupied properties",
  "Inherited properties needing updating"
];

const faqs = [
  {
    question: "Will you still buy my house if it has major structural issues?",
    answer: "Yes. We buy houses with foundation issues, roof damage, fire damage, and other significant structural problems. We factor the repair costs into our offer."
  },
  {
    question: "Do I need to disclose known issues when selling as-is in New York?",
    answer: "New York law requires sellers to disclose known material defects via a Property Condition Disclosure Statement, even in as-is sales. Alternatively, sellers can pay a $500 credit to the buyer in lieu of disclosure. Your attorney can advise on the right approach."
  },
  {
    question: "Can I sell as-is if I have tenants in the property?",
    answer: "Yes. We buy tenant-occupied properties and handle the transition ourselves after closing."
  },
  {
    question: "How is the as-is cash offer calculated?",
    answer: "We look at the after-repair value (what the house would sell for fully updated), subtract estimated repair costs and our profit margin, and present a fair cash offer. We walk you through the numbers so you understand how we got there."
  }
];

export default function SellAsIs() {
  return (
    <Layout>
      <SEO
        title="Sell Your House As-Is on Long Island | No Repairs Needed"
        description="Want to sell your Long Island house without making repairs? The Property Father buys houses as-is in any condition in Suffolk and Nassau County. Get a cash offer in 24 hours. Call (516) 548-6558."
        canonicalPath="/situations/sell-as-is"
      />
      <BreadcrumbSchema items={[{ label: "Sell As-Is" }]} />
      <FAQSchema faqs={faqs} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Sell Your House As-Is on Long Island",
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
        "description": "Want to sell your Long Island house without making repairs? The Property Father buys houses as-is in any condition in Suffolk and Nassau County. Get a cash offer in 24 hours."
      }) }} />

      <section className="bg-charcoal text-white py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <nav className="flex items-center gap-1 text-sm text-white/60 mb-6" aria-label="Breadcrumb" data-testid="nav-breadcrumb">
            <Link href="/">
              <span className="hover:text-gold cursor-pointer">Home</span>
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-gold">Sell As-Is</span>
          </nav>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Wrench className="h-5 w-5 text-gold" />
                <span className="text-gold font-medium">Sell As-Is</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6" data-testid="heading-sell-as-is">
                Selling Your Long Island House As-Is: No Repairs, No Hassle
              </h1>
              <p className="text-lg text-white/90 mb-8" data-testid="text-sell-as-is-intro">
                Not every homeowner has the time, money, or energy to prep a house for the traditional real estate market. Whether your property needs cosmetic updates, major repairs, or has been neglected for years, The Property Father buys Long Island houses as-is for cash — no repairs required, no staging, no open houses.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/contact">
                  <Button size="lg" className="bg-gold text-navy" data-testid="button-asis-offer">
                    Get Your Cash Offer
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <a href="tel:5165486558">
                  <Button size="lg" variant="outline" className="border-white text-white bg-transparent" data-testid="button-asis-call">
                    <Phone className="mr-2 h-5 w-5" />
                    (516) 548-6558
                  </Button>
                </a>
              </div>
            </div>
            <div>
              <ContactForm
                title="Sell Your House As-Is"
                description="No repairs. No cleaning. Just cash."
                source="sell-as-is"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Why Sell As-Is to Us
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Skip the expensive repairs and months of waiting. We make selling simple.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center" data-testid={`card-benefit-${index}`}>
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
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-4" data-testid="heading-what-does-as-is-mean">What Does Selling As-Is Actually Mean?</h2>
          <p className="text-muted-foreground mb-4">
            Selling a house as-is means you are offering the property in its current condition, without making any repairs, improvements, or cosmetic updates before the sale. For a deeper look at <a href="https://blog.thepropertyfather.com/sell-house-as-is-long-island/" className="text-accent underline">what selling as-is really means for Long Island homeowners</a>, we've broken down the process step by step. The buyer agrees to purchase the home exactly as it stands on the day of the transaction. There are no repair credits, no fix-up requests, and no renegotiations after a home inspection.
          </p>
          <p className="text-muted-foreground mb-4">
            This is fundamentally different from a traditional real estate sale. In a conventional listing, a buyer typically hires a home inspector after their offer is accepted. That inspector produces a report detailing every issue — from a leaky faucet to a cracked foundation. The buyer then comes back to the seller with a list of demands: fix this, replace that, or give us a $10,000 credit at closing. These back-and-forth negotiations can add weeks or even months to the process, and they frequently cause deals to fall apart entirely.
          </p>
          <p className="text-muted-foreground mb-8">
            When you sell as-is to The Property Father, none of that happens. We evaluate the property ourselves, factor in the condition and necessary repairs, and present you with a fair cash offer. There is no inspection contingency, no repair list, and no risk of the deal falling through because a buyer got cold feet after seeing the inspector's report. You know exactly what you are getting from day one.
          </p>

          <h2 className="text-3xl font-bold text-foreground mb-4" data-testid="heading-what-conditions">What Conditions Do We Buy?</h2>
          <p className="text-muted-foreground mb-4">
            We buy Long Island houses in virtually every condition imaginable. No matter how much work you think your property needs, we have almost certainly purchased something in worse shape. Here are some of the most common conditions we encounter:
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-muted">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                We Buy Houses in Any Condition
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                No matter how bad you think your house looks, we have probably seen worse — and bought it. Here are just some of the conditions we regularly purchase:
              </p>
              <ul className="space-y-3" data-testid="list-conditions">
                {conditions.map((condition, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <span>{condition}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-charcoal rounded-md p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Every Situation is Different</h3>
              <p className="text-white/80 mb-4">
                Whether the property has been sitting vacant for years, has tenants who have caused damage, or was inherited from a family member and needs a complete overhaul, we handle it. We do not require you to clean out the house, remove personal belongings, or deal with any deferred maintenance. We take care of everything after closing.
              </p>
              <p className="text-white/80">
                If you are unsure whether your property qualifies, the answer is almost certainly yes. Call us at (516) 548-6558 and describe the situation — we will give you a straight answer.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-white">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-4" data-testid="heading-math-behind">The Math Behind As-Is vs. Repaired Sales</h2>
          <p className="text-muted-foreground mb-4">
            Many homeowners assume they will always net more money by fixing up a property and listing it on the open market. In some cases that is true, but the math is not as straightforward as most people think. Let us walk through a real-world example that is common on Long Island.
          </p>
          <p className="text-muted-foreground mb-4">
            Suppose you own a house that would be worth $500,000 if it were fully updated and in move-in condition. However, the property currently needs about $80,000 in repairs — a new roof, updated kitchen and bathrooms, foundation work, and general cosmetic improvements. Here is how the numbers break down for a traditional sale versus a cash as-is offer.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Traditional sale after repairs:</strong> You spend $80,000 on renovations, which takes three to six months. You list the home at $500,000 and pay a 6% real estate commission ($30,000). You also pay closing costs, transfer taxes, and attorney fees, which typically run another $5,000 to $10,000 on Long Island. During the renovation period, you continue to pay the mortgage, property taxes, insurance, and utilities — carrying costs that can easily reach $2,000 to $3,000 per month. After all expenses, your net proceeds come in around $385,000 to $390,000.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Cash as-is offer from The Property Father:</strong> We make you an offer of $400,000 to $415,000 based on the after-repair value minus our estimated repair costs and margin. You pay zero in repair costs, zero in agent commissions, and zero in carrying costs. The sale closes in seven to twenty-one days. Your net proceeds are the full offer amount, and you walk away with your check at the closing table.
          </p>
          <p className="text-muted-foreground mb-8">
            In this scenario, selling as-is actually puts more money in your pocket than going through the traditional process — and you avoid months of stress, contractor headaches, and financial uncertainty. Every situation is different, but the point is clear: the highest sale price does not always equal the highest net proceeds.
          </p>

          <h2 className="text-3xl font-bold text-foreground mb-4" data-testid="heading-why-choose">Why Long Island Homeowners Choose As-Is Sales</h2>
          <p className="text-muted-foreground mb-4">
            Beyond the financial math, there are practical reasons why Long Island homeowners choose to sell as-is rather than going through the traditional listing process. The renovation process itself is one of the biggest pain points. Finding reliable contractors on Long Island is difficult, timelines frequently stretch beyond estimates, and costs almost always come in higher than the initial quotes. A project that was supposed to take six weeks can easily stretch to three or four months.
          </p>
          <p className="text-muted-foreground mb-4">
            Carrying costs during renovation are another factor that many sellers underestimate. If you are paying a mortgage, property taxes, homeowner's insurance, and utilities on a property while it sits empty during a renovation, those expenses add up quickly. On Long Island, where property taxes are among the highest in the nation, carrying costs can easily exceed $3,000 per month.
          </p>
          <p className="text-muted-foreground mb-4">
            There is also the uncertainty that comes with the inspection process. Even after you invest tens of thousands of dollars in repairs, a buyer's inspector may still find issues you were not aware of. That leads to another round of negotiations, more repair requests, and potentially a reduced sale price. Some buyers use the inspection as leverage to renegotiate the price regardless of the home's actual condition.
          </p>
          <p className="text-muted-foreground mb-8">
            Selling as-is to The Property Father eliminates all of these headaches. You sell on your timeline, with no contractor drama, no carrying costs, no inspection surprises, and no risk of the deal collapsing at the last minute.
          </p>

          <h2 className="text-3xl font-bold text-foreground mb-4" data-testid="heading-after-cash-offer">What Happens After You Accept a Cash Offer</h2>
          <p className="text-muted-foreground mb-4">
            Once you accept our cash offer, the closing process is straightforward and moves quickly. The first step is a title search, which is conducted by a title company or your attorney. This search confirms that you have clear ownership of the property and identifies any liens, judgments, or encumbrances that need to be resolved before the sale can close.
          </p>
          <p className="text-muted-foreground mb-4">
            If the title is clear, we move directly to scheduling the closing. If there are title issues — such as an old mortgage that was paid off but never discharged, or a tax lien from a previous owner — we work with you and the title company to resolve them. In most cases, these issues can be handled without significantly delaying the closing.
          </p>
          <p className="text-muted-foreground mb-8">
            The closing itself takes place at a local title company or your attorney's office, right here on Long Island. You sign the deed transfer documents, receive your payment, and hand over the keys. The entire process from accepted offer to closing typically takes seven to twenty-one days, depending on the title search and any scheduling considerations. There are no bank appraisals to wait for, no mortgage underwriting delays, and no last-minute financing contingencies that could derail the deal.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-white">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center" data-testid="heading-faq">Frequently Asked Questions</h2>
          <div className="space-y-6" data-testid="faq-list-asis">
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
          <h2 className="text-3xl font-bold text-foreground mb-6" data-testid="heading-related-resources">Related Resources</h2>
          <ul className="space-y-3 mb-8">
            <li>
              <a
                href="https://blog.thepropertyfather.com/sell-house-as-is-long-island/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent underline hover:text-accent/80 flex items-center gap-2"
                data-testid="link-blog-sell-as-is"
              >
                <ArrowRight className="h-4 w-4" />
                How to Sell Your House As-Is on Long Island (Blog)
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
              Disclaimer: The information on this page is for general informational purposes only and does not constitute legal, financial, or real estate advice. Every property and situation is unique. We recommend consulting with a licensed attorney or real estate professional in New York State regarding your specific circumstances. The Property Father is not a law firm and does not provide legal counsel.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-charcoal text-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6" data-testid="heading-bottom-cta">
            Ready to Sell Your House As-Is?
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
            Stop worrying about repairs. Get a fair cash offer and close on your timeline — no contractors, no commissions, no hassle.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="tel:5165486558">
              <Button size="lg" className="bg-gold text-navy" data-testid="button-asis-call-bottom">
                <Phone className="mr-2 h-5 w-5" />
                (516) 548-6558
              </Button>
            </a>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-white text-white bg-transparent" data-testid="button-asis-offer-bottom">
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
