import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ContactForm from "@/components/ContactForm";
import Layout from "@/components/Layout";
import { 
  Home, 
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
    title: "Sell Quickly",
    description: "No need to spend months cleaning, repairing, and listing the property."
  },
  {
    icon: Shield,
    title: "Buy As-Is",
    description: "We purchase inherited properties in any condition. No repairs needed."
  },
  {
    icon: DollarSign,
    title: "Cash Offer",
    description: "Get a fair cash offer and close on your timeline."
  }
];

const challenges = [
  "Property is in a different state or far from where you live",
  "Home needs significant repairs you don't want to deal with",
  "Multiple heirs who all want to liquidate their share",
  "Property taxes, maintenance, and insurance costs adding up",
  "Emotional burden of dealing with a family home",
  "Don't have time to clean out years of belongings"
];

export default function InheritedProperty() {
  return (
    <Layout>
      <section className="gradient-navy text-white py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Home className="h-5 w-5 text-gold" />
                <span className="text-gold font-medium">Inherited Property</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                Sell Your Inherited House Fast
              </h1>
              <p className="text-lg text-white/90 mb-8">
                Inheriting a property can be overwhelming, especially when it comes with unexpected costs and responsibilities. We make it easy to sell and move forward.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/contact">
                  <Button size="lg" className="bg-gold text-navy " data-testid="button-inherited-offer">
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
                title="Inherited Property Consultation"
                description="Get a cash offer for your inherited home."
                source="inherited-property"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Why Sell Inherited Property to Us
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We understand the unique challenges that come with inherited properties and offer simple solutions.
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
                Common Inherited Property Challenges
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Inheriting a home often comes with unexpected burdens. Here's how we help solve these common challenges.
              </p>
              <ul className="space-y-3">
                {challenges.map((challenge, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <span>{challenge}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-navy rounded-lg p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">We Handle Everything</h3>
              <p className="text-white/80 mb-4">
                Dealing with an inherited property doesn't have to be stressful. We can:
              </p>
              <ul className="space-y-2 text-white/80">
                <li>• Purchase the home in any condition</li>
                <li>• Handle property clean-out if needed</li>
                <li>• Work with multiple heirs</li>
                <li>• Close quickly to stop ongoing costs</li>
                <li>• Provide a fair cash offer</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-navy text-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Turn Your Inherited Property Into Cash
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
            Stop paying property taxes, insurance, and maintenance on a home you don't want. Get a cash offer today.
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
