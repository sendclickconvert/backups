import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ContactForm from "@/components/ContactForm";
import Layout from "@/components/Layout";
import { 
  Wrench, 
  CheckCircle, 
  Phone,
  ArrowRight,
  Shield,
  Clock,
  DollarSign
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
    description: "Get a competitive offer based on your home's current condition."
  }
];

const conditions = [
  "Major structural issues or foundation problems",
  "Roof damage or water damage",
  "Outdated electrical or plumbing systems",
  "Fire or storm damage",
  "Mold or pest infestations",
  "Hoarder houses or extensive clutter",
  "Outdated kitchens and bathrooms",
  "Code violations",
  "Tenant damage",
  "Houses that have been vacant for years"
];

export default function SellAsIs() {
  return (
    <Layout>
      <section className="bg-charcoal text-white py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Wrench className="h-5 w-5 text-gold" />
                <span className="text-gold font-medium">Sell As-Is</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                Sell Your House As-Is for Cash
              </h1>
              <p className="text-lg text-white/90 mb-8">
                Don't spend thousands on repairs before selling. We buy houses in any condition - even if they need major work. Get a fair cash offer today.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/contact">
                  <Button size="lg" className="bg-gold text-navy " data-testid="button-asis-offer">
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
                We Buy Houses in Any Condition
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                No matter how bad you think your house looks, we've probably seen worse - and bought it. Here are just some of the conditions we regularly purchase:
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {conditions.map((condition, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-accent flex-shrink-0" />
                    <span className="text-sm">{condition}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-charcoal rounded-lg p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Save Time and Money</h3>
              <p className="text-white/80 mb-4">
                The average homeowner spends $15,000-$30,000 on repairs and updates before listing their home. Then they wait 3-6 months for a buyer who might ask for even more repairs.
              </p>
              <p className="text-white/80 mb-4">
                With us, you skip all of that:
              </p>
              <ul className="space-y-2 text-white/80">
                <li>• No repair costs</li>
                <li>• No cleaning or staging</li>
                <li>• No endless showings</li>
                <li>• No waiting for buyer financing</li>
                <li>• Close in days, not months</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-charcoal text-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Get a Cash Offer on Your As-Is Property
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
            Stop worrying about repairs. We buy your house exactly as it is today.
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
