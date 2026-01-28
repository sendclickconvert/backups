import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ContactForm from "@/components/ContactForm";
import Layout from "@/components/Layout";
import { 
  Scale, 
  CheckCircle, 
  Phone,
  ArrowRight,
  Shield,
  Clock,
  DollarSign
} from "lucide-react";

const benefits = [
  {
    icon: Clock,
    title: "No Waiting for Buyers",
    description: "Skip the lengthy process of listing and waiting for traditional buyers during probate."
  },
  {
    icon: Shield,
    title: "We Handle Complexity",
    description: "We're experienced with probate sales and work directly with estate attorneys."
  },
  {
    icon: DollarSign,
    title: "Fair Cash Offers",
    description: "Get a competitive cash offer that helps settle the estate quickly."
  }
];

const situations = [
  "Need to sell a property during the probate process",
  "Multiple heirs who want to liquidate the estate quickly",
  "Property needs extensive repairs that the estate can't afford",
  "Want to avoid the hassle of cleaning out and staging the home",
  "Need cash to pay estate debts or taxes",
  "Out-of-state property that's difficult to manage"
];

export default function Probate() {
  return (
    <Layout>
      <section className="gradient-navy text-white py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Scale className="h-5 w-5 text-gold" />
                <span className="text-gold font-medium">Probate Sales</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                Selling a House in Probate
              </h1>
              <p className="text-lg text-white/90 mb-8">
                The probate process is complicated enough. We simplify selling the property with fair cash offers and experience working with estate attorneys and executors.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/contact">
                  <Button size="lg" className="bg-gold text-navy " data-testid="button-probate-offer">
                    Get Your Cash Offer
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
                title="Probate Property Consultation"
                description="Get guidance on selling during probate."
                source="probate"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Why Sell Probate Property to Us
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We have extensive experience with probate sales and can help you navigate this challenging time.
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
                Common Probate Selling Situations
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                As an executor or administrator of an estate, you have many responsibilities. We can help take the property sale off your plate.
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
            <div className="bg-navy rounded-lg p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Our Probate Process</h3>
              <p className="text-white/80 mb-4">
                We work directly with estate attorneys and understand the legal requirements of probate sales. Our process is designed to work within the probate timeline.
              </p>
              <ul className="space-y-2 text-white/80">
                <li>• We can close once probate court approves the sale</li>
                <li>• We handle all property clean-out if needed</li>
                <li>• No repairs required on your end</li>
                <li>• Fair offers based on current market value</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-navy text-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Simplify the Probate Process
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
            Let us help you handle the property while you focus on settling the estate. Contact us for a free consultation.
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
