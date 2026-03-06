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
  ChevronRight,
  Scale,
  DollarSign,
  Clock,
  Home,
  FileText
} from "lucide-react";

const towns = [
  { name: "Baldwin", desc: "South Shore waterfront community with aging Cape Cods and ranches" },
  { name: "Bellmore", desc: "Family-oriented community with post-war housing stock" },
  { name: "Bethpage", desc: "Central Nassau with mid-century homes near the famous state park" },
  { name: "Carle Place", desc: "Small hamlet with convenient Meadowbrook Parkway access" },
  { name: "East Meadow", desc: "Large suburban community in central Nassau County" },
  { name: "East Rockaway", desc: "Waterfront village on the South Shore" },
  { name: "Elmont", desc: "Diverse community bordering Queens, near Belmont Park" },
  { name: "Farmingdale", desc: "Village straddling Nassau-Suffolk border with revitalized downtown" },
  { name: "Floral Park", desc: "Tree-lined streets with pre-war colonials and Tudors" },
  { name: "Franklin Square", desc: "Densely populated hamlet with convenient location" },
  { name: "Freeport", desc: "Nautical Mile waterfront dining and diverse housing stock" },
  { name: "Garden City", desc: "Prestigious planned community with estate-style homes" },
  { name: "Glen Cove", desc: "North Shore city with waterfront properties and Gold Coast history" },
  { name: "Great Neck", desc: "Affluent North Shore community with top-rated schools" },
  { name: "Hempstead", desc: "Largest village in the county, diverse housing market" },
  { name: "Hicksville", desc: "Central Nassau hub with major LIRR junction station" },
  { name: "Inwood", desc: "South Shore community near JFK and Five Towns area" },
  { name: "Island Park", desc: "Barrier island community with flood zone considerations" },
  { name: "Jericho", desc: "Upscale hamlet with Jericho School District" },
  { name: "Lawrence", desc: "Five Towns community with mix of estate and modest homes" },
  { name: "Levittown", desc: "Iconic planned community — birthplace of American suburbia" },
  { name: "Long Beach", desc: "Barrier island city with beach access and post-Sandy rebuilding" },
  { name: "Lynbrook", desc: "South Shore village with LIRR access and walkable downtown" },
  { name: "Malverne", desc: "Compact village with charming downtown and older homes" },
  { name: "Manhasset", desc: "Affluent North Shore community near Americana shopping" },
  { name: "Massapequa", desc: "South Shore community spanning Massapequa, North Massapequa, and Massapequa Park" },
  { name: "Merrick", desc: "Established South Shore community with strong school district" },
  { name: "Mineola", desc: "County seat with LIRR hub and diverse housing" },
  { name: "New Hyde Park", desc: "Western Nassau community bordering Queens" },
  { name: "Oceanside", desc: "Large South Shore hamlet with waterfront access" },
  { name: "Old Bethpage", desc: "Rural feel with larger lots near Old Bethpage Village Restoration" },
  { name: "Oyster Bay", desc: "North Shore town with rich history and waterfront estates" },
  { name: "Plainview", desc: "Central Nassau hamlet with mid-century suburban development" },
  { name: "Port Washington", desc: "North Shore peninsula community with harbor views" },
  { name: "Rockville Centre", desc: "Vibrant village with walkable downtown and LIRR access" },
  { name: "Roosevelt", desc: "Diverse community with affordable housing stock" },
  { name: "Roslyn", desc: "Historic North Shore village with Gold Coast heritage" },
  { name: "Seaford", desc: "South Shore waterfront community with Tackapausha Preserve" },
  { name: "Syosset", desc: "North Shore hamlet with highly rated school district" },
  { name: "Uniondale", desc: "Centrally located near Nassau Coliseum site" },
  { name: "Valley Stream", desc: "Southern Nassau village bordering Queens with LIRR access" },
  { name: "Wantagh", desc: "South Shore community with Jones Beach parkway access" },
  { name: "Westbury", desc: "Centrally located with diverse housing and shopping" },
  { name: "Williston Park", desc: "Small, walkable village with strong community identity" },
  { name: "Woodmere", desc: "Five Towns community with mix of housing styles" },
];

const faqs = [
  {
    question: "How fast can I sell my Nassau County house for cash?",
    answer: "We can close in as few as 7 days after you accept our offer. The typical timeline is 7 to 21 days, depending on your situation. Because we pay cash, there is no waiting for mortgage approvals, appraisals, or bank underwriting. Under New York law (Judiciary Law § 484), a real estate attorney must handle the closing — we coordinate that for you at no cost."
  },
  {
    question: "Do I need to make repairs before selling my Nassau County home?",
    answer: "No. We buy houses in any condition — foundation issues, outdated systems, fire damage, hoarding, you name it. Under NY Real Property Law § 462, sellers must provide a Property Condition Disclosure Statement or credit the buyer $500 at closing. When you sell to us, we typically handle that credit so you don't have to worry about filling out disclosure forms for every known defect."
  },
  {
    question: "How much will you offer for my Nassau County house?",
    answer: "Our offers typically range from 70% to 85% of the after-repair value (ARV), depending on the property's condition, location, and the repairs needed. While that's below full retail market value, you save 6% to 10% in agent commissions (which are now fully negotiable since the NAR settlement of August 2024), 2% to 4% in closing costs, plus whatever you'd spend on repairs and holding costs during a traditional sale. For many homeowners, the net proceeds end up comparable."
  },
  {
    question: "Are there any fees or commissions when selling to The Property Father?",
    answer: "Zero. We charge no commissions, no closing costs, and no hidden fees. The offer we make is the amount you receive at closing. We cover all closing costs, including the attorney, title search, and transfer taxes. Nassau County transfer tax is $2 per $500 of the sale price — we pay that."
  },
  {
    question: "What areas of Nassau County do you buy houses in?",
    answer: "We buy houses in every city, village, hamlet, and unincorporated area across Nassau County — from the North Shore communities like Great Neck, Port Washington, and Glen Cove to the South Shore towns like Long Beach, Freeport, and Baldwin, and everywhere in between including Hempstead, Levittown, Hicksville, and Garden City. If it's in Nassau County, we'll buy it."
  }
];

const situations = [
  { label: "Divorce", href: "/situations/divorce", blogHref: "https://blog.thepropertyfather.com/sell-house-during-divorce-long-island/" },
  { label: "Pre-Foreclosure", href: "/situations/pre-foreclosure", blogHref: "https://blog.thepropertyfather.com/facing-foreclosure-long-island/" },
  { label: "Inherited Property", href: "/situations/inherited-property", blogHref: "https://blog.thepropertyfather.com/sell-inherited-house-new-york/" },
  { label: "Probate Sales", href: "/situations/probate", blogHref: "https://blog.thepropertyfather.com/probate-sales-suffolk-county/" },
  { label: "Sell As-Is", href: "/situations/sell-as-is", blogHref: "https://blog.thepropertyfather.com/sell-house-as-is-long-island/" },
  { label: "Selling with Liens", href: "https://blog.thepropertyfather.com/sell-house-with-liens-long-island/", blogHref: "https://blog.thepropertyfather.com/sell-house-with-liens-long-island/" },
  { label: "Relocating", href: "https://blog.thepropertyfather.com/relocating-sell-long-island-house/", blogHref: "https://blog.thepropertyfather.com/relocating-sell-long-island-house/" },
];

export default function NassauCounty() {
  return (
    <Layout>
      <SEO 
        title="We Buy Houses Nassau County NY | Cash Home Buyers | The Property Father"
        description="Sell your Nassau County house fast for cash. The Property Father buys homes in any condition — Hempstead, Long Beach, Glen Cove, and all 45 Nassau towns. No agents, no fees. Call (516) 548-6558."
        canonicalPath="/locations/nassau-county"
      />
      <BreadcrumbSchema items={[{ label: "Nassau County" }]} />
      <FAQSchema faqs={faqs} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "We Buy Houses for Cash in Nassau County, NY",
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
          ...["Baldwin","Bellmore","Bethpage","Carle Place","East Meadow","East Rockaway","Elmont","Farmingdale","Floral Park","Franklin Square","Freeport","Garden City","Glen Cove","Great Neck","Hempstead","Hicksville","Inwood","Island Park","Jericho","Lawrence","Levittown","Long Beach","Lynbrook","Malverne","Manhasset","Massapequa","Merrick","Mineola","New Hyde Park","Oceanside","Old Bethpage","Oyster Bay","Plainview","Port Washington","Rockville Centre","Roosevelt","Roslyn","Seaford","Syosset","Uniondale","Valley Stream","Wantagh","Westbury","Williston Park","Woodmere"].map(t => ({ "@type": "City", "name": t + ", NY" }))
        ],
        "description": "The Property Father buys houses for cash in any condition throughout Nassau County, NY. No agents, no fees, no repairs. Close in as few as 7 days."
      }) }} />

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
              <h1 className="text-4xl lg:text-5xl font-bold mb-6" data-testid="text-nassau-h1">
                We Buy Houses Nassau County NY | Cash Home Buyers
              </h1>
              <p className="text-lg text-white/90 mb-4">
                Nassau County homeowners carry some of the highest property tax burdens in the country — averaging roughly 2.1% of assessed value, based on Nassau County Department of Assessment data. When you combine that with a median home price that has pushed past $650,000 (per Redfin data, Q4 2024), holding onto a property you can't afford or don't want becomes expensive fast.
              </p>
              <p className="text-lg text-white/90 mb-8">
                If you're a Nassau County homeowner looking to sell without the hassle of agents, repairs, or months of waiting, The Property Father buys houses for cash in any condition. We close in as few as 7 days, and you pay zero fees or commissions.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/contact">
                  <Button size="lg" className="bg-gold text-navy" data-testid="button-nassau-offer">
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
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6" data-testid="text-why-cash">
              Why Nassau County Homeowners Choose Cash Buyers
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Nassau County's real estate market rewards move-in ready homes with updated kitchens, modern bathrooms, and curb appeal. But not every homeowner is in a position to invest $50,000 to $100,000 in renovations before listing. The gap between what a dated property can sell for on the MLS and what it costs to get it there is often wider than homeowners expect — especially when you factor in agent commissions (which are now fully negotiable since the <a href="https://blog.thepropertyfather.com/cash-buyer-vs-realtor/" className="text-gold underline" target="_blank" rel="noopener noreferrer">NAR settlement of August 2024</a>), closing costs, staging, and months of carrying costs.
            </p>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Homeowners in Nassau County face specific challenges that make cash sales practical:
            </p>
            <ul className="space-y-3 mb-6 text-lg text-muted-foreground">
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-1" />
                <span><strong>Property tax burden</strong> — Nassau County property taxes average $12,000 to $20,000+ per year. Every month you hold a property costs you.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-1" />
                <span><strong>Aging housing stock</strong> — Many Nassau homes were built in the 1940s-1960s and have outdated electrical, plumbing, and heating systems that scare off traditional buyers.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-1" />
                <span><strong>Flood zone properties</strong> — South Shore communities from Long Beach to Baldwin to Island Park sit in FEMA flood zones with elevated insurance costs and post-Sandy damage that was never fully addressed.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-1" />
                <span><strong>Estate and probate situations</strong> — Inherited homes often need significant work, and heirs frequently live out of state.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-1" />
                <span><strong>Divorce and financial hardship</strong> — When time matters, a 90-day listing process doesn't work.</span>
              </li>
            </ul>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We've bought homes in every corner of Nassau County — from waterfront properties on Reynolds Channel to split-levels in Levittown to estate homes on the North Shore Gold Coast. We understand what each neighborhood is worth and what it costs to bring a property back to market condition.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-muted">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6" data-testid="text-process">
              How Our Cash Home Buying Process Works in Nassau County
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Our process is designed to be simple, transparent, and fast. Here's exactly what happens when you reach out to The Property Father about your Nassau County property:
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {[
                { step: "1", title: "Contact Us", desc: "Call (516) 548-6558 or fill out our online form. Tell us about your property — condition doesn't matter." },
                { step: "2", title: "Property Walkthrough", desc: "We schedule a visit to your Nassau County home, usually within 48 hours. No need to clean, repair, or stage." },
                { step: "3", title: "Receive Your Offer", desc: "We present a fair cash offer based on current market conditions in your specific neighborhood — typically within 24 hours of the walkthrough." },
                { step: "4", title: "Review with Your Attorney", desc: "Under NY Judiciary Law § 484, only an attorney may draft real estate contracts in New York. We recommend you have your own attorney review the contract." },
                { step: "5", title: "Choose Your Closing Date", desc: "You pick the timeline that works for you — as fast as 7 days or up to 60 days. We work around your schedule." },
                { step: "6", title: "Get Paid", desc: "At closing, you receive your cash. No commissions, no closing costs deducted, no surprises. We cover all costs." },
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
              Under NY Real Property Law § 240, all real estate contracts must be in writing. We handle the paperwork through a licensed title company and ensure the entire process follows New York state requirements. Learn more about <a href="https://thepropertyfather.com/how-it-works" className="text-gold underline">how our process works</a>.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6" data-testid="text-what-we-pay">
              What Cash Buyers Pay in Nassau County
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              We're transparent about how we calculate offers. Our formula is based on the After-Repair Value (ARV) — what your property would be worth fully renovated and listed on the open market:
            </p>
            <Card className="border-2 border-gold/20 mb-8">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <p className="text-xl font-bold mb-2">Cash Offer Formula</p>
                  <p className="text-2xl font-bold text-gold">ARV - Repair Costs - Holding Costs - Margin = Your Cash Offer</p>
                </div>
                <p className="text-muted-foreground mb-4">
                  For a typical Nassau County property with an ARV of $650,000:
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold mb-3 flex items-center gap-2"><DollarSign className="h-4 w-4 text-gold" /> Cash Sale to Us</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>Sale price: $490,000 - $552,000 (75-85% of ARV)</li>
                      <li>Agent commissions: $0</li>
                      <li>Closing costs: $0 (we pay)</li>
                      <li>Repair costs: $0</li>
                      <li>Holding costs: $0 (close in 7-21 days)</li>
                      <li className="font-bold text-foreground pt-2 border-t">You net: $490,000 - $552,000</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold mb-3 flex items-center gap-2"><Home className="h-4 w-4 text-muted-foreground" /> Traditional MLS Sale</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>Sale price: $650,000 (if renovated)</li>
                      <li>Agent commissions: ~$32,500 - $39,000 (5-6%)</li>
                      <li>Closing costs: ~$13,000 - $26,000 (2-4%)</li>
                      <li>Repairs/staging: $30,000 - $80,000</li>
                      <li>Holding costs (4-6 months): $8,000 - $15,000</li>
                      <li className="font-bold text-foreground pt-2 border-t">You net: $490,000 - $566,500</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
            <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
              The math often works out closer than homeowners expect — especially when you factor in the certainty of a cash close, no contingencies, and no risk of the deal falling through. Read more about <a href="https://blog.thepropertyfather.com/why-cash-offers-are-lower/" className="text-gold underline" target="_blank" rel="noopener noreferrer">why cash offers are lower than retail</a> and what that actually means for your bottom line.
            </p>
            <p className="text-sm text-muted-foreground italic">
              Important: We're honest about the trade-offs. If your home is in excellent condition and you have time to wait, a traditional sale with a good agent may net you more. We're not the right fit for every seller — but for homeowners who need speed, certainty, or can't afford repairs, a cash sale often makes more sense.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-muted">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6" data-testid="text-situations">
              Situations We Help Nassau County Homeowners With
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Every homeowner's situation is different. Here are the most common scenarios where Nassau County homeowners choose a cash sale:
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {situations.map((situation, idx) => {
                const isExternal = situation.href.startsWith("http");
                return (
                  <Card key={idx} className="border-0 shadow-sm">
                    <CardContent className="p-5">
                      {isExternal ? (
                        <a href={situation.href} target="_blank" rel="noopener noreferrer" className="font-bold text-lg hover:text-gold cursor-pointer flex items-center gap-2" data-testid={`link-situation-${idx}`}>
                          <ArrowRight className="h-4 w-4 text-gold" />
                          {situation.label}
                        </a>
                      ) : (
                        <Link href={situation.href}>
                          <span className="font-bold text-lg hover:text-gold cursor-pointer flex items-center gap-2" data-testid={`link-situation-${idx}`}>
                            <ArrowRight className="h-4 w-4 text-gold" />
                            {situation.label}
                          </span>
                        </Link>
                      )}
                      <a href={situation.blogHref} target="_blank" rel="noopener noreferrer" className="text-sm text-gold underline mt-1 inline-block">
                        Read our guide
                      </a>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              No matter your situation, we approach every conversation with empathy and honesty. These are real people in real situations, not transactions. If we're not the right solution for you, we'll tell you. Learn more about <a href="https://blog.thepropertyfather.com/are-we-buy-houses-companies-legit/" className="text-gold underline" target="_blank" rel="noopener noreferrer">how to verify we're legitimate</a> and <a href="https://blog.thepropertyfather.com/questions-to-ask-cash-buyer/" className="text-gold underline" target="_blank" rel="noopener noreferrer">questions to ask any cash buyer</a>.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4" data-testid="text-towns-heading">
              Towns and Villages We Serve in Nassau County
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              We buy houses in every community across Nassau County. Click any town below for specific information about selling your home in that area.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {towns.map((town, index) => {
              const slug = town.name.toLowerCase().replace(/\s+/g, "-");
              return (
                <Link key={index} href={`/locations/nassau-county/${slug}`}>
                  <div className="bg-muted rounded-md p-4 hover-elevate cursor-pointer" data-testid={`link-town-${slug}`}>
                    <p className="font-medium text-sm">{town.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">{town.desc}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-muted">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6" data-testid="text-market-data">
              Nassau County Real Estate Market Data
            </h2>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6 text-center">
                  <DollarSign className="h-8 w-8 text-gold mx-auto mb-3" />
                  <p className="text-2xl font-bold">$650,000+</p>
                  <p className="text-sm text-muted-foreground">Median Home Price</p>
                  <p className="text-xs text-muted-foreground mt-1">Per Redfin data, Q4 2024</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6 text-center">
                  <Clock className="h-8 w-8 text-gold mx-auto mb-3" />
                  <p className="text-2xl font-bold">45-60 Days</p>
                  <p className="text-sm text-muted-foreground">Avg. Days on Market</p>
                  <p className="text-xs text-muted-foreground mt-1">For move-in ready listings</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6 text-center">
                  <FileText className="h-8 w-8 text-gold mx-auto mb-3" />
                  <p className="text-2xl font-bold">~2.1%</p>
                  <p className="text-sm text-muted-foreground">Avg. Property Tax Rate</p>
                  <p className="text-xs text-muted-foreground mt-1">Nassau County assessment data</p>
                </CardContent>
              </Card>
            </div>
            <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
              Nassau County remains one of the most expensive markets on Long Island. Home values have appreciated significantly since 2020, but that appreciation benefits sellers only if their property is in condition to compete on the MLS. Properties that need major work or have structural issues often sell for 20% to 30% below median values through traditional channels — after months of price reductions and failed inspections.
            </p>
            <p className="text-sm text-muted-foreground italic">
              Sources: Redfin market data (Q4 2024), Nassau County Department of Assessment, NY Department of Finance public records. For the latest trends, see our <a href="https://blog.thepropertyfather.com/long-island-real-estate-trends/" className="text-gold underline" target="_blank" rel="noopener noreferrer">Long Island real estate market analysis</a>.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold mb-8 text-center" data-testid="text-faqs">
              Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`faq-${index}`}>
                  <AccordionTrigger className="text-left text-lg" data-testid={`faq-trigger-${index}`}>
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base leading-relaxed" data-testid={`faq-content-${index}`}>
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
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

      <section className="py-8">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <AuthorByline />
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-charcoal text-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Sell Your Nassau County Home?
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
            Get your free, no-obligation cash offer today. No pressure, no commitment — just an honest number so you can make an informed decision.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="tel:5165486558">
              <Button size="lg" className="bg-gold text-navy" data-testid="button-nassau-cta-phone">
                <Phone className="mr-2 h-5 w-5" />
                (516) 548-6558
              </Button>
            </a>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-white text-white bg-transparent" data-testid="button-nassau-cta-form">
                Get Your Cash Offer
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
          <p className="mt-6 text-sm text-white/60">
            <a href="https://blog.thepropertyfather.com/we-buy-houses-nassau-county/" target="_blank" rel="noopener noreferrer" className="underline">Read our full Nassau County guide</a>
            {" | "}
            <a href="https://blog.thepropertyfather.com/sell-house-fast-long-island/" target="_blank" rel="noopener noreferrer" className="underline">Sell Your House Fast on Long Island</a>
            {" | "}
            <a href="https://blog.thepropertyfather.com/cash-home-buyer-scams-to-avoid/" target="_blank" rel="noopener noreferrer" className="underline">Avoid Cash Buyer Scams</a>
          </p>
          <p className="mt-2 text-xs text-white/40">
            This content is for informational purposes only and does not constitute legal or financial advice. Consult with a licensed attorney and/or financial advisor before making real estate decisions.
          </p>
        </div>
      </section>
    </Layout>
  );
}
