import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ContactForm from "@/components/ContactForm";
import Layout from "@/components/Layout";
import { 
  Hammer, 
  CheckCircle, 
  Phone,
  ArrowRight,
  Handshake,
  Calendar,
  DollarSign
} from "lucide-react";

const benefits = [
  {
    icon: Calendar,
    title: "Consistent Work",
    description: "Join our preferred vendor list and get regular renovation projects."
  },
  {
    icon: DollarSign,
    title: "Prompt Payment",
    description: "We pay our contractors on time, every time. No chasing payments."
  },
  {
    icon: Handshake,
    title: "Long-Term Partnership",
    description: "Build a relationship with an investor who buys and renovates dozens of homes annually."
  }
];

const services = [
  "General contracting",
  "Kitchen and bathroom remodels",
  "Roofing and siding",
  "Electrical work",
  "Plumbing",
  "HVAC installation and repair",
  "Flooring installation",
  "Painting (interior and exterior)",
  "Drywall and plastering",
  "Demolition and cleanout",
  "Landscaping and hardscaping",
  "Foundation repair"
];

export default function Contractors() {
  return (
    <Layout>
      <section className="bg-charcoal text-white py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Hammer className="h-5 w-5 text-gold" />
                <span className="text-gold font-medium">Contractor Partners</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                Join Our Contractor Network
              </h1>
              <p className="text-lg text-white/90 mb-8">
                We're always looking for reliable contractors to work on our renovation projects. Get consistent work, prompt payment, and a long-term partnership.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/contact">
                  <Button size="lg" className="bg-gold text-navy " data-testid="button-contractor-partner">
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
                title="Contractor Partnership Inquiry"
                description="Tell us about your services and experience."
                source="contractors"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Why Contractors Work With Us
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We value our contractors and treat them as partners, not vendors.
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
                Services We Need
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                We work with contractors across a wide range of trades. If your specialty is listed here, we want to hear from you:
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {services.map((service, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-accent flex-shrink-0" />
                    <span className="text-sm">{service}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-charcoal rounded-lg p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">What We Look For</h3>
              <p className="text-white/80 mb-4">
                We're building long-term relationships with contractors who share our values:
              </p>
              <ul className="space-y-2 text-white/80">
                <li>• Licensed and insured</li>
                <li>• Reliable and punctual</li>
                <li>• Quality workmanship</li>
                <li>• Fair and transparent pricing</li>
                <li>• Good communication</li>
                <li>• Able to work within project timelines</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-charcoal text-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Partner With Us?
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
            Get consistent work and build a lasting partnership with an active real estate investor.
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
