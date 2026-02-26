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
  DollarSign,
  Clock,
  Home,
  FileText
} from "lucide-react";

const towns = [
  { name: "Babylon", desc: "South Shore village with revitalized downtown and waterfront access" },
  { name: "Brookhaven", desc: "Largest town in NY State — dozens of hamlets from Port Jeff to Mastic" },
  { name: "East Hampton", desc: "Hamptons community with high-end and legacy properties" },
  { name: "Huntington", desc: "North Shore town with vibrant village center and diverse housing" },
  { name: "Islip", desc: "South Shore town with numerous hamlets and waterfront communities" },
  { name: "Riverhead", desc: "County seat and gateway to the North Fork wine country" },
  { name: "Shelter Island", desc: "Island community accessible only by ferry" },
  { name: "Smithtown", desc: "North Shore town with top-rated school districts" },
  { name: "Southampton", desc: "East End town with beach communities and year-round residents" },
  { name: "Southold", desc: "North Fork town with agricultural heritage and waterfront homes" },
  { name: "Patchogue", desc: "Revitalized village with downtown nightlife and LIRR access" },
  { name: "Bay Shore", desc: "South Shore hamlet with ferry access to Fire Island" },
  { name: "Brentwood", desc: "Large, diverse community in central Suffolk" },
  { name: "Central Islip", desc: "Centrally located with county courthouse and diverse housing" },
  { name: "Commack", desc: "Suburban community with strong schools and commercial corridors" },
  { name: "Coram", desc: "Large Brookhaven hamlet with affordable housing stock" },
  { name: "Deer Park", desc: "Central Suffolk community straddling Babylon-Huntington" },
  { name: "East Northport", desc: "North Shore hamlet with Northport-East Northport school district" },
  { name: "Farmingville", desc: "Brookhaven hamlet with mid-century ranch-style homes" },
  { name: "Hauppauge", desc: "Home to Suffolk County government and major industrial park" },
  { name: "Holbrook", desc: "Compact hamlet in the Town of Islip" },
  { name: "Lake Grove", desc: "Hamlet surrounding Smith Haven Mall area" },
  { name: "Lindenhurst", desc: "South Shore village with walkable downtown and canal-front properties" },
  { name: "Medford", desc: "Affordable Brookhaven hamlet with rural character" },
  { name: "Middle Island", desc: "Eastern Brookhaven community with wooded lots" },
  { name: "Miller Place", desc: "North Shore hamlet with Longwood school district" },
  { name: "Mount Sinai", desc: "Quiet North Shore community with Mt. Sinai school district" },
  { name: "North Babylon", desc: "Large community north of Babylon village with Deer Park school district" },
  { name: "Port Jefferson", desc: "Historic North Shore harbor village with ferry to Connecticut" },
  { name: "Ronkonkoma", desc: "Central Suffolk with major LIRR hub and diverse housing" },
  { name: "Sayville", desc: "Charming village with downtown shops and Fire Island ferry" },
  { name: "Selden", desc: "Large Brookhaven hamlet near Suffolk County Community College" },
  { name: "Shirley", desc: "South Shore community with William Floyd school district" },
  { name: "Stony Brook", desc: "University town with North Shore charm and historic village" },
  { name: "West Babylon", desc: "South Shore community with diverse housing and Sunrise Mall area" },
  { name: "West Islip", desc: "South Shore hamlet with waterfront access and strong schools" },
];

const faqs = [
  {
    question: "How fast can you close on a Suffolk County property?",
    answer: "We can close in as few as 7 days. The typical timeline is 7 to 21 days, depending on title clearance and your schedule. Because we're paying cash — no mortgage contingencies, no bank appraisals — the only delay is the legal process. Under New York law, a real estate attorney must handle the closing (NY Judiciary Law § 484). We coordinate that and cover the cost."
  },
  {
    question: "Do you buy houses with septic system problems in Suffolk County?",
    answer: "Yes. Septic system failures are one of the most common issues in Suffolk County, particularly in eastern communities that aren't connected to public sewer systems. Suffolk County has been implementing its Septic Improvement Program to address nitrogen pollution, but for homeowners with failing septics, replacement costs of $15,000 to $30,000+ can make a traditional sale impractical. We buy properties with septic issues as-is."
  },
  {
    question: "How do you determine your offer price?",
    answer: "We base our offers on the After-Repair Value (ARV) of your property — what it would sell for fully renovated on the open market — minus estimated repair costs, holding costs, and our margin. Our offers typically range from 70% to 85% of ARV. We use real comparable sales data from your specific Suffolk County neighborhood, not countywide averages. We're transparent about the math — just ask and we'll walk you through it."
  },
  {
    question: "What's the difference between selling to you and selling with a realtor?",
    answer: "With a realtor, you list on the MLS, make repairs, stage the home, and wait 2-6 months for a qualified buyer — then negotiate inspections, appraisals, and contingencies. Your net proceeds after commissions (now negotiable post-NAR settlement, August 2024), closing costs, repairs, and holding costs may be comparable to our cash offer. The key differences: speed, certainty, and convenience. Read our detailed comparison at our blog."
  },
  {
    question: "Do I have to pay any fees or commissions?",
    answer: "None. We charge zero commissions, zero fees, and we pay all closing costs — including the real estate attorney, title search, title insurance, and Suffolk County transfer taxes ($2 per $500 of sale price). The number we offer is the number you receive."
  }
];

const situations = [
  { label: "Divorce", href: "/situations/divorce", blogHref: "https://blog.thepropertyfather.com/sell-house-during-divorce-long-island/" },
  { label: "Foreclosure", href: "/situations/foreclosure", blogHref: "https://blog.thepropertyfather.com/facing-foreclosure-long-island/" },
  { label: "Inherited Property", href: "/situations/inherited-property", blogHref: "https://blog.thepropertyfather.com/sell-inherited-house-new-york/" },
  { label: "Probate Sales", href: "/situations/probate", blogHref: "https://blog.thepropertyfather.com/probate-sales-suffolk-county/" },
  { label: "Selling As-Is", href: "/situations/as-is", blogHref: "https://blog.thepropertyfather.com/sell-house-as-is-long-island/" },
  { label: "Selling with Liens", href: "https://blog.thepropertyfather.com/sell-house-with-liens-long-island/", blogHref: "https://blog.thepropertyfather.com/sell-house-with-liens-long-island/" },
  { label: "Relocating", href: "https://blog.thepropertyfather.com/relocating-sell-long-island-house/", blogHref: "https://blog.thepropertyfather.com/relocating-sell-long-island-house/" },
];

export default function SuffolkCounty() {
  return (
    <Layout>
      <SEO 
        title="We Buy Houses Suffolk County NY | Cash Home Buyers | The Property Father"
        description="Sell your Suffolk County house fast for cash. The Property Father buys homes in any condition — Babylon, Huntington, Islip, Smithtown, Brookhaven, and all Suffolk towns. No agents, no fees. Call (516) 548-6558."
        canonicalPath="/locations/suffolk-county"
      />
      <BreadcrumbSchema items={[{ label: "Suffolk County" }]} />
      <FAQSchema faqs={faqs} />

      <section className="bg-charcoal text-white py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <nav className="flex items-center gap-1 text-sm text-white/60 mb-6" aria-label="Breadcrumb" data-testid="nav-breadcrumb">
            <Link href="/">
              <span className="hover:text-gold cursor-pointer">Home</span>
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-gold">Suffolk County</span>
          </nav>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="h-5 w-5 text-gold" />
                <span className="text-gold font-medium">Suffolk County, NY</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6" data-testid="text-suffolk-h1">
                We Buy Houses Suffolk County NY | Cash Home Buyers
              </h1>
              <p className="text-lg text-white/90 mb-4">
                Suffolk County stretches 86 miles from the Nassau border to Montauk Point, covering 10 towns and hundreds of communities. With a median home price around $550,000 (per Redfin data, Q4 2024) and property taxes averaging roughly 2.2% of assessed value (per Suffolk County tax records), homeowners who need to sell quickly face real financial pressure every month they hold a property.
              </p>
              <p className="text-lg text-white/90 mb-8">
                The Property Father buys houses for cash in any condition throughout Suffolk County. We're based right here in Patchogue at 100 Washington Ave — this is our home market. No agents, no fees, no repairs needed. We close in as few as 7 days.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/contact">
                  <Button size="lg" className="bg-gold text-navy" data-testid="button-suffolk-offer">
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
                title="Sell Your Suffolk County Home"
                description="Get a fair cash offer within 24 hours."
                source="suffolk-county"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6" data-testid="text-why-cash">
              Why Suffolk County Homeowners Choose Cash Buyers
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Suffolk County's housing market is deeply local — what a home is worth in Cold Spring Harbor has nothing to do with what it's worth in Mastic. But across the county, homeowners face common challenges that make traditional sales difficult or impossible:
            </p>
            <ul className="space-y-3 mb-6 text-lg text-muted-foreground">
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-1" />
                <span><strong>Septic system issues</strong> — Much of Suffolk County relies on cesspools and septic systems. Failing systems cost $15,000-$30,000+ to replace, and buyers walk away from properties with septic problems.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-1" />
                <span><strong>High property taxes</strong> — Suffolk County taxes average ~2.2% of assessed value. On a $550,000 home, that's over $12,000/year — a significant monthly burden for homeowners in financial distress.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-1" />
                <span><strong>Flood zone properties</strong> — South Shore communities from Lindenhurst to Mastic Beach sit in FEMA flood zones with elevated insurance costs and lingering Sandy damage.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-1" />
                <span><strong>Oil tank contamination</strong> — Underground oil tanks — common in older Suffolk homes — can leak and create environmental remediation requirements costing $20,000 to $100,000+.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-1" />
                <span><strong>Inherited properties</strong> — Heirs inheriting Suffolk County homes often live out of state and can't manage repairs, maintenance, or a 6-month listing process.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-1" />
                <span><strong>Code violations</strong> — Town of Brookhaven, Town of Islip, and other municipalities have active code enforcement. Open violations can prevent a traditional sale.</span>
              </li>
            </ul>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We've purchased homes in every corner of Suffolk County — from waterfront fixer-uppers on the Great South Bay to rural properties in eastern Brookhaven to suburban ranches along the Route 110 corridor. We know this market because we live and work here.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-muted">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6" data-testid="text-process">
              How Our Cash Home Buying Process Works in Suffolk County
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              We've streamlined the process to eliminate the headaches of a traditional sale. Here's exactly what happens:
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {[
                { step: "1", title: "Contact Us", desc: "Call (516) 548-6558 or submit our form. Give us some basic details about your property — location, condition, and your situation." },
                { step: "2", title: "Property Visit", desc: "We visit your Suffolk County home in person — usually within 48 hours. Come as you are. No cleaning, no repairs, no staging required." },
                { step: "3", title: "Cash Offer", desc: "We present a written cash offer based on comparable sales in your specific neighborhood. We'll show you how we got to our number — no mystery." },
                { step: "4", title: "Attorney Review", desc: "New York requires an attorney at closing (NY Judiciary Law § 484). We cover the cost. We encourage you to have your own attorney review the contract." },
                { step: "5", title: "Your Timeline", desc: "Close in 7 days if you're in a rush, or take up to 60 days if you need time. We work around you." },
                { step: "6", title: "Closing Day", desc: "You get paid. No commissions deducted, no closing costs, no last-minute surprises. The offer amount is the amount you receive." },
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
              All contracts are prepared in compliance with NY Real Property Law § 240 (written contract requirement) and NY Real Property Law § 462 (property condition disclosure). Learn more about <a href="https://thepropertyfather.com/how-it-works" className="text-gold underline">our full process</a> or read <a href="https://blog.thepropertyfather.com/how-do-we-buy-houses-companies-work/" className="text-gold underline" target="_blank" rel="noopener noreferrer">how "we buy houses" companies actually work</a>.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6" data-testid="text-what-we-pay">
              What Cash Buyers Pay in Suffolk County
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Here's how we calculate our offers, using real numbers based on Suffolk County's current market. The ARV (After-Repair Value) is what your home would sell for in fully renovated condition:
            </p>
            <Card className="border-2 border-gold/20 mb-8">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <p className="text-xl font-bold mb-2">Cash Offer Formula</p>
                  <p className="text-2xl font-bold text-gold">ARV - Repair Costs - Holding Costs - Margin = Your Cash Offer</p>
                </div>
                <p className="text-muted-foreground mb-4">
                  For a typical Suffolk County property with an ARV of $550,000:
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold mb-3 flex items-center gap-2"><DollarSign className="h-4 w-4 text-gold" /> Cash Sale to Us</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>Sale price: $385,000 - $467,000 (70-85% of ARV)</li>
                      <li>Agent commissions: $0</li>
                      <li>Closing costs: $0 (we pay)</li>
                      <li>Repair costs: $0</li>
                      <li>Holding costs: $0 (close in 7-21 days)</li>
                      <li className="font-bold text-foreground pt-2 border-t">You net: $385,000 - $467,000</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold mb-3 flex items-center gap-2"><Home className="h-4 w-4 text-muted-foreground" /> Traditional MLS Sale</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>Sale price: $550,000 (if renovated)</li>
                      <li>Agent commissions: ~$27,500 - $33,000 (5-6%)</li>
                      <li>Closing costs: ~$11,000 - $22,000 (2-4%)</li>
                      <li>Repairs/staging: $25,000 - $70,000</li>
                      <li>Holding costs (4-6 months): $7,000 - $12,000</li>
                      <li className="font-bold text-foreground pt-2 border-t">You net: $413,000 - $479,500</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
            <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
              The gap between a cash offer and a traditional sale is often smaller than people assume — and that's before accounting for the certainty, speed, and zero risk of deal fallthrough. Read our <a href="https://blog.thepropertyfather.com/why-cash-offers-are-lower/" className="text-gold underline" target="_blank" rel="noopener noreferrer">detailed breakdown of cash offer pricing</a>.
            </p>
            <p className="text-sm text-muted-foreground italic">
              Honest disclosure: If your Suffolk County home is in good condition and you have 3-6 months, listing with a qualified agent may net you more. We're the right choice when speed, certainty, or property condition makes a traditional sale impractical.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-muted">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6" data-testid="text-situations">
              Situations We Help Suffolk County Homeowners With
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              We work with homeowners across Suffolk County in a wide range of situations. No judgment, just solutions:
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {situations.map((situation, idx) => (
                <Card key={idx} className="border-0 shadow-sm">
                  <CardContent className="p-5">
                    <Link href={situation.href}>
                      <span className="font-bold text-lg hover:text-gold cursor-pointer flex items-center gap-2" data-testid={`link-situation-${idx}`}>
                        <ArrowRight className="h-4 w-4 text-gold" />
                        {situation.label}
                      </span>
                    </Link>
                    <a href={situation.blogHref} target="_blank" rel="noopener noreferrer" className="text-sm text-gold underline mt-1 inline-block">
                      Read our guide
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Learn more about <a href="https://blog.thepropertyfather.com/are-we-buy-houses-companies-legit/" className="text-gold underline" target="_blank" rel="noopener noreferrer">verifying cash home buyers</a> and <a href="https://blog.thepropertyfather.com/questions-to-ask-cash-buyer/" className="text-gold underline" target="_blank" rel="noopener noreferrer">questions you should ask before accepting any offer</a>.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4" data-testid="text-towns-heading">
              Towns and Villages We Serve in Suffolk County
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              We buy houses across all 10 towns in Suffolk County and every hamlet, village, and community within them. Click any area below for local details.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {towns.map((town, index) => {
              const slug = town.name.toLowerCase().replace(/\s+/g, "-");
              return (
                <Link key={index} href={`/locations/suffolk-county/${slug}`}>
                  <div className="bg-muted rounded-md p-4 cursor-pointer hover-elevate" data-testid={`link-town-${slug}`}>
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
              Suffolk County Real Estate Market Data
            </h2>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6 text-center">
                  <DollarSign className="h-8 w-8 text-gold mx-auto mb-3" />
                  <p className="text-2xl font-bold">$550,000</p>
                  <p className="text-sm text-muted-foreground">Median Home Price</p>
                  <p className="text-xs text-muted-foreground mt-1">Per Redfin data, Q4 2024</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6 text-center">
                  <Clock className="h-8 w-8 text-gold mx-auto mb-3" />
                  <p className="text-2xl font-bold">40-55 Days</p>
                  <p className="text-sm text-muted-foreground">Avg. Days on Market</p>
                  <p className="text-xs text-muted-foreground mt-1">For move-in ready listings</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6 text-center">
                  <FileText className="h-8 w-8 text-gold mx-auto mb-3" />
                  <p className="text-2xl font-bold">~2.2%</p>
                  <p className="text-sm text-muted-foreground">Avg. Property Tax Rate</p>
                  <p className="text-xs text-muted-foreground mt-1">Suffolk County tax records</p>
                </CardContent>
              </Card>
            </div>
            <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
              Suffolk County's market varies dramatically by location. Huntington and Smithtown command higher prices due to school districts and North Shore desirability, while eastern communities like Shirley and Mastic offer more affordable entry points. Properties needing significant work or carrying environmental issues (oil tanks, septic failures) routinely sell for 25% to 35% below neighborhood medians through traditional channels.
            </p>
            <p className="text-sm text-muted-foreground italic">
              Sources: Redfin market data (Q4 2024), Suffolk County Real Property Tax Service, NY Department of Finance. For current market trends, see our <a href="https://blog.thepropertyfather.com/long-island-real-estate-trends/" className="text-gold underline" target="_blank" rel="noopener noreferrer">Long Island real estate market analysis</a>.
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
            We Buy Houses Throughout Suffolk County, NY
          </h2>
          <div className="rounded-lg overflow-hidden shadow-md" data-testid="map-embed">
            <iframe
              src="https://www.google.com/maps?q=40.8000,-73.1200&z=11&output=embed"
              width="100%"
              height="350"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              title="Map of Suffolk County, NY"
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
            Ready to Sell Your Suffolk County Home?
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
            Get your free, no-obligation cash offer today. No pressure, no commitment — just an honest number so you can make an informed decision.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="tel:5165486558">
              <Button size="lg" className="bg-gold text-navy" data-testid="button-suffolk-cta-phone">
                <Phone className="mr-2 h-5 w-5" />
                (516) 548-6558
              </Button>
            </a>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-white text-white bg-transparent" data-testid="button-suffolk-cta-form">
                Get Your Cash Offer
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
          <p className="mt-6 text-sm text-white/60">
            <a href="https://blog.thepropertyfather.com/selling-your-suffolk-county-home/" target="_blank" rel="noopener noreferrer" className="underline">Read our full Suffolk County guide</a>
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
