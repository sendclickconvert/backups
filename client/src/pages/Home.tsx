import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ContactForm from "@/components/ContactForm";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import { 
  Home as HomeIcon, 
  Clock, 
  DollarSign, 
  Shield, 
  CheckCircle, 
  Phone,
  Star,
  ArrowRight,
  MapPin,
  MapPinned,
  Zap,
  Scale,
  AlertTriangle,
  ScrollText,
  Gift,
  Wrench,
  type LucideIcon
} from "lucide-react";

const benefits = [
  {
    icon: DollarSign,
    title: "No Fees or Commissions",
    description: "Keep more of your home's value. We never charge hidden fees or agent commissions."
  },
  {
    icon: Clock,
    title: "Close in Days, Not Months",
    description: "Get your cash in as little as 7 days. We work on your timeline."
  },
  {
    icon: Shield,
    title: "Sell As-Is",
    description: "No repairs, no cleaning, no staging. We buy your house exactly as it is."
  },
  {
    icon: Zap,
    title: "Fast Cash Offers",
    description: "Receive a fair, no-obligation cash offer within 24 hours of contacting us."
  }
];

const steps = [
  {
    number: "1",
    title: "Contact Us",
    description: "Fill out our form or call us. Tell us about your property and situation."
  },
  {
    number: "2",
    title: "Get Your Offer",
    description: "We'll evaluate your property and present you with a fair cash offer within 24 hours."
  },
  {
    number: "3",
    title: "Choose Your Closing Date",
    description: "Accept our offer and pick a closing date that works for you. Close in as few as 7 days."
  },
  {
    number: "4",
    title: "Get Paid",
    description: "Receive your cash at closing. It's that simple!"
  }
];

const situations: { name: string; href: string; icon: LucideIcon }[] = [
  { name: "Sell As-Is", href: "/situations/sell-as-is", icon: Wrench },
  { name: "Divorce", href: "/situations/divorce", icon: Scale },
  { name: "Pre-Foreclosure", href: "/situations/pre-foreclosure", icon: AlertTriangle },
  { name: "Probate", href: "/situations/probate", icon: ScrollText },
  { name: "Inherited Property", href: "/situations/inherited-property", icon: Gift },
];

const testimonials = [
  {
    name: "Maria S.",
    location: "Huntington, NY",
    text: "The Property Father made selling my inherited home so easy. They were professional, fast, and gave me a fair price. Closed in just 10 days!",
    rating: 5
  },
  {
    name: "Robert K.",
    location: "Babylon, NY",
    text: "Facing foreclosure was terrifying. These guys helped me sell quickly and walk away with cash in my pocket. Can't thank them enough.",
    rating: 5
  },
  {
    name: "Jennifer L.",
    location: "Islip, NY",
    text: "Going through a divorce is hard enough. The Property Father took all the stress out of selling our house. Highly recommend!",
    rating: 5
  }
];

export default function Home() {
  return (
    <Layout>
      <SEO 
        title="We Buy Houses for Cash in Long Island, NY"
        description="Sell your Long Island house fast for cash. The Property Father buys houses in any condition in Suffolk and Nassau County. No fees, no repairs, close in 7 days."
        canonicalPath="/"
      />
      <section className="relative text-white overflow-hidden min-h-[90vh] flex items-center">
        {/* Hero Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80')" }}
        />
        {/* Cinematic Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 lg:py-32 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-gold/20 border border-gold/30 rounded-full px-4 py-2 text-sm">
                <Star className="h-4 w-4 text-gold" />
                <span className="text-gold">Trusted Cash Home Buyers in Long Island</span>
              </div>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                Sell Your House <span className="text-gold">Fast For Cash</span>
              </h1>
              <p className="text-lg lg:text-xl text-white/90">
                Get a fair cash offer in 24 hours. Close on your timeline and move forward with your life.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/contact">
                  <Button size="lg" className="bg-accent text-accent-foreground font-semibold" data-testid="button-hero-offer">
                    Get Your Free Cash Offer
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <a href="tel:5165486558">
                  <Button size="lg" variant="outline" className="border-white/50 text-white bg-white/10" data-testid="button-hero-call">
                    <Phone className="mr-2 h-5 w-5" />
                    (516) 548-6558
                  </Button>
                </a>
              </div>
              <div className="flex items-center gap-6 pt-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-gold/30 border-2 border-white flex items-center justify-center">
                      <span className="text-xs font-bold">{i}</span>
                    </div>
                  ))}
                </div>
                <div className="text-sm">
                  <p className="font-semibold">Local Long Island Cash Buyers</p>
                  <p className="text-white/80">Serving Suffolk & Nassau County homeowners</p>
                </div>
              </div>
            </div>
            <div className="lg:pl-8">
              <ContactForm 
                title="Get Your Free Cash Offer" 
                description="No obligations. No fees. Just a fair offer."
                source="homepage"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-muted">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Why Sell to The Property Father?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're not like traditional buyers or realtors. We make selling your house simple, fast, and stress-free.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="border-0 shadow-md hover-elevate">
                <CardContent className="pt-6 text-center">
                  <div className="mx-auto w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                    <benefit.icon className="h-7 w-7 text-accent" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground text-sm">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Selling your house for cash is simple. Here's our straightforward 4-step process.
            </p>
          </div>
          <div className="relative grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Connecting dotted lines - desktop only */}
            <div className="hidden lg:block absolute top-8 left-[12.5%] right-[12.5%] -translate-y-1/2">
              <div className="w-full border-t-2 border-dashed border-gold/40" />
            </div>
            {steps.map((step, index) => (
              <div key={index} className="relative text-center z-10">
                <div className="mx-auto w-16 h-16 bg-charcoal rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-gold">{step.number}</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/how-it-works">
              <Button size="lg" className="bg-charcoal text-white " data-testid="button-learn-more">
                Learn More About Our Process
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-charcoal text-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              We Buy Houses in <span className="text-gold">Any Situation</span>
            </h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              No matter what you're going through, we can help. We've worked with hundreds of homeowners facing various life situations.
            </p>
          </div>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
            {situations.map((situation, index) => (
              <Link key={index} href={situation.href}>
                <Card className="bg-white/10 border-0 hover:bg-white/20 transition-colors cursor-pointer h-full">
                  <CardContent className="pt-6 text-center">
                    <situation.icon className="h-8 w-8 text-gold mx-auto mb-3" />
                    <h3 className="font-semibold text-white">{situation.name}</h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              What Our Clients Say
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Don't just take our word for it. Here's what homeowners in Long Island have to say about working with us.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover-elevate">
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-gold fill-gold" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">"{testimonial.text}"</p>
                  <div className="border-t pt-4">
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                  </div>
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
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Serving All of <span className="text-accent">Long Island</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                We buy houses throughout Suffolk County and Nassau County. No matter where your property is located on Long Island, we can help.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <Link href="/locations/suffolk-county">
                  <Card className="hover-elevate cursor-pointer">
                    <CardContent className="pt-6 flex items-center gap-4">
                      <MapPin className="h-10 w-10 text-accent" />
                      <div>
                        <h3 className="font-semibold">Suffolk County</h3>
                        <p className="text-sm text-muted-foreground">Eastern Long Island</p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
                <Link href="/locations/nassau-county">
                  <Card className="hover-elevate cursor-pointer">
                    <CardContent className="pt-6 flex items-center gap-4">
                      <MapPinned className="h-10 w-10 text-accent" />
                      <div>
                        <h3 className="font-semibold">Nassau County</h3>
                        <p className="text-sm text-muted-foreground">Western Long Island</p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            </div>
            <div className="bg-charcoal rounded-lg p-8 text-white text-center">
              <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
              <p className="text-white/80 mb-6">
                Call us now or fill out our form to get your free, no-obligation cash offer today.
              </p>
              <a href="tel:5165486558">
                <Button size="lg" className="bg-gold text-navy  font-semibold">
                  <Phone className="mr-2 h-5 w-5" />
                  (516) 548-6558
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
