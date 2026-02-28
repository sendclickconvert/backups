import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ContactForm from "@/components/ContactForm";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import { BreadcrumbSchema } from "@/components/SchemaMarkup";
import { 
  Building, 
  CheckCircle, 
  Phone,
  ArrowRight,
  Handshake,
  Clock,
  DollarSign,
  ChevronRight
} from "lucide-react";

const benefits = [
  {
    icon: Clock,
    title: "Consistent Deal Flow",
    description: "We have a steady pipeline of properties that need financing for rehab and resale."
  },
  {
    icon: DollarSign,
    title: "Secured Investments",
    description: "All financing is backed by real property with strong equity positions."
  },
  {
    icon: Handshake,
    title: "Reliable Partner",
    description: "We have a proven track record and maintain transparent communication throughout every deal."
  }
];

const services = [
  "Fix and flip financing partnerships",
  "Bridge loan opportunities",
  "Property acquisition funding",
  "Renovation project financing",
  "Joint venture opportunities",
  "Portfolio lending partnerships"
];

export default function Lenders() {
  return (
    <Layout>
      <SEO
        title="Partner With Us - Lenders"
        description="Private lenders and hard money lenders — partner with The Property Father for consistent deal flow on Long Island. Secured investments backed by real property with strong equity positions."
        canonicalPath="/partners/lenders"
      />
      <BreadcrumbSchema items={[{ label: "Lenders" }]} />
      <section className="bg-charcoal text-white py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <nav className="flex items-center gap-1 text-sm text-white/60 mb-6" aria-label="Breadcrumb" data-testid="nav-breadcrumb">
            <Link href="/">
              <span className="hover:text-gold cursor-pointer">Home</span>
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-gold">Lenders</span>
          </nav>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Building className="h-5 w-5 text-gold" />
                <span className="text-gold font-medium">Lender Partners</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                Partner With Us on Property Financing
              </h1>
              <p className="text-lg text-white/90 mb-8">
                Partner with us to provide financing for properties on future deals. We work with banks, credit unions, and private lenders to create mutually beneficial opportunities.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/contact">
                  <Button size="lg" className="bg-gold text-navy " data-testid="button-lender-partner">
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
                title="Lender Partnership Inquiry"
                description="Let's discuss financing partnership opportunities."
                source="lenders"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Why Lenders Partner With Us
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We make disposing of distressed assets simple, fast, and reliable.
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
                Partnership Opportunities
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                We're experienced in working with financial institutions and private lenders to create profitable financing arrangements.
              </p>
              <ul className="space-y-3">
                {services.map((service, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                    <span>{service}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-charcoal rounded-lg p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Work With a Proven Partner</h3>
              <p className="text-white/80 mb-4">
                We have the capital, experience, and track record to handle your distressed properties efficiently.
              </p>
              <ul className="space-y-2 text-white/80">
                <li>• Proof of funds available immediately</li>
                <li>• No financing contingencies</li>
                <li>• Close on your timeline</li>
                <li>• Purchase properties in any condition</li>
                <li>• Professional, reliable communication</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-charcoal text-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Let's Work Together
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
            Contact us to discuss financing partnership opportunities on our upcoming property deals.
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
