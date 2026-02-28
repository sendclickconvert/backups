import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ContactForm from "@/components/ContactForm";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import { BreadcrumbSchema } from "@/components/SchemaMarkup";
import { 
  Home, 
  CheckCircle, 
  Phone,
  ArrowRight,
  Handshake,
  DollarSign,
  Users,
  ChevronRight
} from "lucide-react";

const benefits = [
  {
    icon: DollarSign,
    title: "Referral Fees",
    description: "Earn a referral fee for properties that don't fit your traditional sale model."
  },
  {
    icon: Users,
    title: "Serve More Clients",
    description: "Help clients who need to sell fast or have properties in poor condition."
  },
  {
    icon: Handshake,
    title: "Reliable Partner",
    description: "We close when we say we will. No last-minute surprises or failed deals."
  }
];

const situations = [
  "Client needs to sell faster than the traditional market allows",
  "Property condition makes it difficult to list",
  "Seller can't afford to make repairs before listing",
  "Inherited or probate properties with multiple heirs",
  "Divorce situations requiring quick resolution",
  "Pre-foreclosure or financial distress situations"
];

export default function Realtors() {
  return (
    <Layout>
      <SEO
        title="Partner With Us - Realtors"
        description="Real estate agents on Long Island — partner with The Property Father to help clients who need fast cash sales. Earn referral fees, serve more clients, and close deals that don't fit the traditional market."
        canonicalPath="/partners/realtors"
      />
      <BreadcrumbSchema items={[{ label: "Realtors" }]} />
      <section className="bg-charcoal text-white py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <nav className="flex items-center gap-1 text-sm text-white/60 mb-6" aria-label="Breadcrumb" data-testid="nav-breadcrumb">
            <Link href="/">
              <span className="hover:text-gold cursor-pointer">Home</span>
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-gold">Realtors</span>
          </nav>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Home className="h-5 w-5 text-gold" />
                <span className="text-gold font-medium">Realtor Partners</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                Real Estate Agent Partner Program
              </h1>
              <p className="text-lg text-white/90 mb-8">
                Have a client who needs to sell fast? Properties that won't work for a traditional listing? Partner with us and earn referral fees while helping more clients.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/contact">
                  <Button size="lg" className="bg-gold text-navy " data-testid="button-realtor-partner">
                    Become a Partner
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
                title="Realtor Partnership Inquiry"
                description="Join our referral partner program."
                source="realtors"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Why Agents Partner With Us
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Turn your unsellable listings into closed deals and earn referral fees.
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

      <section className="py-16 lg:py-20 bg-muted">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                Perfect Referral Situations
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Not every seller fits the traditional listing model. Here are the types of situations where referring to us makes sense:
              </p>
              <ul className="space-y-3">
                {situations.map((situation, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <span>{situation}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-charcoal rounded-lg p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">How It Works</h3>
              <ol className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-gold text-navy rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <span className="text-white/80">Identify a client who would benefit from our cash offer</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-gold text-navy rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <span className="text-white/80">Contact us with the referral details</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-gold text-navy rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <span className="text-white/80">We work directly with your client</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-gold text-navy rounded-full flex items-center justify-center text-sm font-bold">4</span>
                  <span className="text-white/80">Receive your referral fee at closing</span>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-charcoal text-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Join Our Agent Network
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
            Start earning referral fees on deals that wouldn't work for traditional listings.
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
                Contact Us
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
