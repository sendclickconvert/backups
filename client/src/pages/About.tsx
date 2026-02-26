import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import { BreadcrumbSchema } from "@/components/SchemaMarkup";
import { 
  Users, 
  Target, 
  Heart, 
  Award,
  Phone,
  ArrowRight,
  Building2,
  CheckCircle,
  ChevronRight
} from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Compassion",
    description: "We understand that selling your home is often tied to difficult life circumstances. We approach every situation with empathy and respect."
  },
  {
    icon: Target,
    title: "Integrity",
    description: "We make fair offers and keep our promises. No lowball tactics, no bait-and-switch, no hidden fees."
  },
  {
    icon: Award,
    title: "Excellence",
    description: "We strive for excellence in everything we do, from our initial contact to closing and beyond."
  }
];

const stats = [
  { number: "500+", label: "Homes Purchased" },
  { number: "10+", label: "Years in Business" },
  { number: "24hrs", label: "Offer Timeline" },
  { number: "$0", label: "Fees or Commissions" }
];

export default function About() {
  return (
    <Layout>
      <SEO 
        title="About Us - Local Long Island Cash Home Buyers"
        description="Learn about The Property Father - local Long Island investors helping homeowners sell their houses quickly and hassle-free since 2015. 500+ homes purchased."
        canonicalPath="/about"
      />
      <BreadcrumbSchema items={[{ label: "About" }]} />
      <section className="bg-charcoal text-white py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <nav className="flex items-center justify-center gap-1 text-sm text-white/60 mb-6" aria-label="Breadcrumb" data-testid="nav-breadcrumb">
              <Link href="/">
                <span className="hover:text-gold cursor-pointer">Home</span>
              </Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-gold">About</span>
            </nav>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              About The Property Father
            </h1>
            <p className="text-lg lg:text-xl text-white/90">
              We're local Long Island investors helping homeowners sell their houses quickly and hassle-free since 2015.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  The Property Father was founded with a simple mission: to help Long Island homeowners who need to sell quickly but don't want to deal with the traditional real estate process.
                </p>
                <p>
                  We've seen firsthand how stressful selling a home can be, especially when you're dealing with life changes like divorce, inheritance, job relocation, or financial difficulties. Traditional real estate can take months, requires costly repairs, and comes with uncertainty about whether your deal will even close.
                </p>
                <p>
                  That's why we created a better way. We buy houses directly from homeowners for cash, close on your timeline, and handle all the complexity so you don't have to.
                </p>
                <p>
                  Based right here on Long Island, we know this area inside and out. We're not a national franchise or a faceless corporation - we're your neighbors, and we're here to help.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="pt-6">
                    <p className="text-3xl font-bold text-accent mb-1">{stat.number}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-muted">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Our Values
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything we do is guided by these core principles.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-8">
                  <div className="mx-auto w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                    <value.icon className="h-7 w-7 text-accent" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <Card className="bg-muted border-0">
                <CardContent className="p-8 flex flex-col items-center justify-center min-h-[300px]">
                  <Building2 className="h-24 w-24 text-accent mb-4" />
                  <p className="text-center text-muted-foreground">
                    Long Island, NY
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                Why Choose Us
              </h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-accent flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Local Expertise</h3>
                    <p className="text-muted-foreground">We know Long Island's neighborhoods, market values, and unique characteristics.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-accent flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Proven Track Record</h3>
                    <p className="text-muted-foreground">Over 500 successful purchases and countless satisfied homeowners.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-accent flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Transparent Process</h3>
                    <p className="text-muted-foreground">No hidden fees, no surprises. We explain everything clearly.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-accent flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Your Timeline</h3>
                    <p className="text-muted-foreground">Close in 7 days or 60 days - whatever works best for you.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-charcoal text-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Work With Us?
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
            Get a fair cash offer for your Long Island home today. No obligations, no pressure.
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
