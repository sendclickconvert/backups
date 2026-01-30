import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ContactForm from "@/components/ContactForm";
import Layout from "@/components/Layout";
import { 
  Heart, 
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

export default function Divorce() {
  return (
    <Layout>
      <section className="bg-charcoal text-white py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Heart className="h-5 w-5 text-gold" />
                <span className="text-gold font-medium">Divorce Situations</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                Selling Your Home During Divorce
              </h1>
              <p className="text-lg text-white/90 mb-8">
                Divorce is hard enough without the added stress of selling a home. We make it easy for both parties to move forward with a fair cash offer and fast closing.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/contact">
                  <Button size="lg" className="bg-gold text-navy " data-testid="button-divorce-offer">
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
            <div className="bg-charcoal rounded-lg p-8 text-white">
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
