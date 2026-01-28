import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ContactForm from "@/components/ContactForm";
import Layout from "@/components/Layout";
import { 
  AlertTriangle, 
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
    title: "Stop the Clock",
    description: "We can close before your foreclosure date, helping you avoid the process entirely."
  },
  {
    icon: Shield,
    title: "Protect Your Credit",
    description: "Avoid the credit damage that comes with foreclosure on your record."
  },
  {
    icon: DollarSign,
    title: "Walk Away with Cash",
    description: "Instead of losing everything, you may be able to walk away with money in your pocket."
  }
];

const steps = [
  "Call us immediately - time is critical in pre-foreclosure situations",
  "We'll evaluate your home and make a cash offer within 24 hours",
  "If you accept, we can close before your foreclosure date",
  "We pay off your mortgage and you walk away with any remaining equity",
  "Your credit is protected and you get a fresh start"
];

export default function PreForeclosure() {
  return (
    <Layout>
      <section className="gradient-navy text-white py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="h-5 w-5 text-gold" />
                <span className="text-gold font-medium">Pre-Foreclosure Help</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                Facing Foreclosure? We Can Help
              </h1>
              <p className="text-lg text-white/90 mb-8">
                Don't let the bank take your home. We can help you sell before foreclosure, protect your credit, and potentially walk away with cash in your pocket.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/contact">
                  <Button size="lg" className="bg-gold text-navy " data-testid="button-foreclosure-offer">
                    Get Immediate Help
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
                title="Get Help Now"
                description="Time is critical. Contact us immediately."
                source="pre-foreclosure"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Why Sell Before Foreclosure?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Selling your home before foreclosure has significant advantages over letting the bank take your property.
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
                How We Help You Avoid Foreclosure
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                When you're facing foreclosure, time is of the essence. Our fast cash buying process can help you avoid foreclosure and its devastating effects on your credit and future.
              </p>
              <ol className="space-y-4">
                {steps.map((step, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-navy rounded-full flex items-center justify-center">
                      <span className="text-gold font-bold text-sm">{index + 1}</span>
                    </div>
                    <span className="mt-1">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-8">
              <AlertTriangle className="h-12 w-12 text-destructive mb-4" />
              <h3 className="text-2xl font-bold mb-4">Time is Critical</h3>
              <p className="text-muted-foreground mb-6">
                The longer you wait, the fewer options you have. If you've received a notice of default or foreclosure notice, contact us immediately. We may be able to help you avoid losing your home to the bank.
              </p>
              <a href="tel:5165486558">
                <Button className="bg-destructive text-white hover:bg-destructive/90">
                  <Phone className="mr-2 h-5 w-5" />
                  Call Now: (516) 548-6558
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-navy text-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Don't Wait Until It's Too Late
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
            Every day counts in a pre-foreclosure situation. Contact us now to explore your options and protect your future.
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
