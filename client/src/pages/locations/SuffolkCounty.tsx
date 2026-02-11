import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ContactForm from "@/components/ContactForm";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import { 
  MapPin, 
  CheckCircle, 
  Phone,
  ArrowRight,
  Building2
} from "lucide-react";

const towns = [
  "Babylon", "Brookhaven", "East Hampton", "Huntington", "Islip",
  "Riverhead", "Shelter Island", "Smithtown", "Southampton", "Southold",
  "Patchogue", "Bay Shore", "Brentwood", "Central Islip", "Commack",
  "Coram", "Deer Park", "East Northport", "Farmingville", "Hauppauge",
  "Holbrook", "Lake Grove", "Lindenhurst", "Medford", "Middle Island",
  "Miller Place", "Mount Sinai", "North Babylon", "Port Jefferson", "Ronkonkoma",
  "Sayville", "Selden", "Shirley", "Stony Brook", "West Babylon", "West Islip"
];

const benefits = [
  "We know Suffolk County like the back of our hand",
  "Fair offers based on local market conditions",
  "We've purchased 300+ homes in Suffolk County",
  "Close in as few as 7 days",
  "No repairs, cleaning, or staging needed",
  "Zero fees or commissions"
];

export default function SuffolkCounty() {
  return (
    <Layout>
      <SEO 
        title="We Buy Houses for Cash in Suffolk County"
        description="Sell your Suffolk County house fast for cash. The Property Father buys houses in any condition in Babylon, Huntington, Islip, Smithtown and all Suffolk County towns."
        canonicalPath="/locations/suffolk-county"
      />
      <section className="bg-charcoal text-white py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="h-5 w-5 text-gold" />
                <span className="text-gold font-medium">Suffolk County, NY</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                We Buy Houses for Cash in Suffolk County
              </h1>
              <p className="text-lg text-white/90 mb-8">
                Selling your Suffolk County home doesn't have to be stressful. Get a fair cash offer within 24 hours and close on your timeline. No agents, no fees, no hassle.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/contact">
                  <Button size="lg" className="bg-gold text-navy " data-testid="button-suffolk-offer">
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
                title="Sell Your Suffolk County Home"
                description="Get a fair cash offer within 24 hours."
                source="suffolk-county"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                Your Suffolk County Cash Home Buying Experts
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                As local investors based on Long Island, we understand the Suffolk County real estate market inside and out. We've helped hundreds of homeowners throughout the county sell their homes quickly and hassle-free.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                Whether your home is in Huntington, Babylon, Smithtown, Brookhaven, or any other Suffolk County town, we're ready to make you a fair cash offer.
              </p>
              <ul className="space-y-3">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <Card className="bg-muted border-0">
                <CardContent className="p-8">
                  <Building2 className="h-16 w-16 text-accent mb-4" />
                  <h3 className="text-2xl font-bold mb-2">300+</h3>
                  <p className="text-muted-foreground">Homes purchased in Suffolk County</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-muted">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Towns We Serve in Suffolk County
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We buy houses throughout Suffolk County. If your town isn't listed, don't worry - we still want to hear from you!
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {towns.map((town, index) => {
              const slug = town.toLowerCase().replace(/\s+/g, "-");
              return (
                <Link key={index} href={`/locations/suffolk-county/${slug}`}>
                  <div className="bg-white rounded-md p-3 text-center text-sm font-medium cursor-pointer hover-elevate" data-testid={`link-town-${slug}`}>
                    {town}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-charcoal text-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Sell Your Suffolk County Home?
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
            Get your free, no-obligation cash offer today. Call us or fill out our quick form.
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
