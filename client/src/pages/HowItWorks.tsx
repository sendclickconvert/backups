import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ContactForm from "@/components/ContactForm";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import { BreadcrumbSchema } from "@/components/SchemaMarkup";
import { 
  Phone, 
  ClipboardCheck, 
  Home, 
  Calendar, 
  Banknote,
  CheckCircle,
  ArrowRight,
  Clock,
  Shield,
  ChevronRight
} from "lucide-react";

const steps = [
  {
    icon: Phone,
    number: "01",
    title: "Contact Us",
    description: "Reach out by phone, form, or email. Tell us about your property and your situation. This conversation is completely confidential and obligation-free.",
    details: [
      "Share basic property details",
      "Explain your timeline and needs",
      "Ask any questions you have",
      "No pressure, no sales tactics"
    ]
  },
  {
    icon: Home,
    number: "02",
    title: "Property Evaluation",
    description: "We'll schedule a brief walkthrough of your property at a time convenient for you. Our team will assess the home's condition and value.",
    details: [
      "Quick 15-30 minute visit",
      "No cleaning or repairs needed",
      "We see past the mess and issues",
      "Completely confidential process"
    ]
  },
  {
    icon: ClipboardCheck,
    number: "03",
    title: "Receive Your Cash Offer",
    description: "Within 24 hours of our visit, you'll receive a fair, written cash offer. Our offers are based on current market conditions and comparable sales.",
    details: [
      "Fair market-based offer",
      "No obligation to accept",
      "No hidden fees or charges",
      "Take your time to decide"
    ],
    blogLink: { text: "why cash offers come in lower than retail price", url: "https://blog.thepropertyfather.com/why-cash-offers-are-lower/" }
  },
  {
    icon: Calendar,
    number: "04",
    title: "Choose Your Closing Date",
    description: "Accept our offer and choose a closing date that works for your schedule. We can close in as few as 7 days or wait up to 60 days if you need more time.",
    details: [
      "Flexible closing timeline",
      "Close as fast as 7 days",
      "Or take up to 60 days",
      "You're in complete control"
    ],
    blogLink: { text: "do you need a lawyer when selling to a cash buyer in NY", url: "https://blog.thepropertyfather.com/questions-to-ask-cash-buyer/" }
  },
  {
    icon: Banknote,
    number: "05",
    title: "Get Paid",
    description: "On closing day, sign the paperwork and receive your cash. We handle all the closing costs and there are zero fees taken from your sale price.",
    details: [
      "Receive your cash at closing",
      "We pay all closing costs",
      "No commissions or fees",
      "Walk away stress-free"
    ],
    blogLink: { text: "selling as-is explained for Long Island homeowners", url: "https://blog.thepropertyfather.com/sell-house-as-is-long-island/" }
  }
];

const comparisons = [
  {
    aspect: "Timeframe",
    traditional: "3-6 months or longer",
    propertyFather: "As fast as 7 days"
  },
  {
    aspect: "Showings",
    traditional: "Multiple strangers in your home",
    propertyFather: "Just one visit from us"
  },
  {
    aspect: "Repairs",
    traditional: "Often required before listing",
    propertyFather: "We buy as-is"
  },
  {
    aspect: "Commissions",
    traditional: "5-6% of sale price",
    propertyFather: "Zero commissions"
  },
  {
    aspect: "Closing Costs",
    traditional: "You typically pay",
    propertyFather: "We pay all costs"
  },
  {
    aspect: "Certainty",
    traditional: "Deals can fall through",
    propertyFather: "Guaranteed closing"
  }
];

export default function HowItWorks() {
  return (
    <Layout>
      <SEO 
        title="How to Sell Your House for Cash on Long Island | The Property Father"
        description="See how selling your Long Island house for cash works in 5 simple steps. Get a fair offer in 24 hours, close in as few as 7 days, pay zero fees or commissions."
        canonicalPath="/how-it-works"
      />
      <BreadcrumbSchema items={[{ label: "How It Works" }]} />
      <section className="bg-charcoal text-white py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8 text-center">
          <nav className="flex items-center justify-center gap-1 text-sm text-white/60 mb-6" aria-label="Breadcrumb" data-testid="nav-breadcrumb">
            <Link href="/">
              <span className="hover:text-gold cursor-pointer">Home</span>
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-gold">How It Works</span>
          </nav>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            How We Buy Your House
          </h1>
          <p className="text-lg lg:text-xl text-white/90 max-w-3xl mx-auto">
            Our simple 5-step process makes selling your home fast, easy, and stress-free. No agents, no fees, no hassle.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="space-y-12">
            {steps.map((step, index) => (
              <div key={index} className={`grid lg:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-charcoal rounded-full flex items-center justify-center">
                      <span className="text-2xl font-bold text-gold">{step.number}</span>
                    </div>
                    <h2 className="text-2xl lg:text-3xl font-bold">{step.title}</h2>
                  </div>
                  <p className="text-lg text-muted-foreground mb-6">{step.description}</p>
                  <ul className="space-y-3">
                    {step.details.map((detail, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                  {step.blogLink && (
                    <p className="mt-4 text-sm text-muted-foreground">
                      Learn more: <a href={step.blogLink.url} className="text-accent underline">{step.blogLink.text}</a>
                    </p>
                  )}
                </div>
                <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <Card className="bg-muted border-0">
                    <CardContent className="p-8 flex items-center justify-center min-h-[250px]">
                      <step.icon className="h-24 w-24 text-accent" />
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-muted">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Traditional Sale vs. The Property Father
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              See why more Long Island homeowners are choosing to sell directly to us.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg shadow-md">
              <thead>
                <tr className="border-b">
                  <th className="p-4 text-left font-semibold">Aspect</th>
                  <th className="p-4 text-left font-semibold text-muted-foreground">Traditional Sale</th>
                  <th className="p-4 text-left font-semibold text-accent">The Property Father</th>
                </tr>
              </thead>
              <tbody>
                {comparisons.map((row, index) => (
                  <tr key={index} className="border-b last:border-0">
                    <td className="p-4 font-medium">{row.aspect}</td>
                    <td className="p-4 text-muted-foreground">{row.traditional}</td>
                    <td className="p-4 text-accent font-medium">{row.propertyFather}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
                Frequently Asked Questions
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-2">How fast can you close?</h3>
                  <p className="text-muted-foreground">We can close in as few as 7 days, but we'll work with your timeline. If you need more time, we can wait up to 60 days or more.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Do I need to make repairs?</h3>
                  <p className="text-muted-foreground">No! We buy houses in any condition. You don't need to fix, clean, or stage anything.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Are there any fees?</h3>
                  <p className="text-muted-foreground">Absolutely not. We pay all closing costs and there are no commissions or hidden fees.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Is the offer really no-obligation?</h3>
                  <p className="text-muted-foreground">Yes! You're under no obligation to accept our offer. Take your time to consider it and make the best decision for your situation.</p>
                </div>
              </div>
              <div className="mt-8">
                <Link href="/faq">
                  <Button variant="outline" data-testid="button-view-faqs">
                    View All FAQs
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
            <div>
              <ContactForm 
                title="Ready to Get Your Offer?"
                description="Fill out the form and we'll contact you within 24 hours."
                source="how-it-works"
              />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
