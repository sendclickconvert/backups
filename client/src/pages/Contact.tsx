import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ContactForm from "@/components/ContactForm";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import { 
  Phone, 
  Mail, 
  MapPin,
  Clock
} from "lucide-react";

const contactInfo = [
  {
    icon: Phone,
    title: "Phone",
    value: "(516) 548-6558",
    href: "tel:5165486558",
    description: "Call us anytime"
  },
  {
    icon: Mail,
    title: "Email",
    value: "info@thepropertyfather.com",
    href: "mailto:info@thepropertyfather.com",
    description: "We respond within 24 hours"
  },
  {
    icon: MapPin,
    title: "Address",
    value: "Long Island, NY",
    href: "https://maps.google.com/?q=Long+Island+NY",
    description: "Our main office"
  },
  {
    icon: Clock,
    title: "Hours",
    value: "Mon-Fri: 9AM-6PM",
    href: null,
    description: "Weekend appointments available"
  }
];

export default function Contact() {
  return (
    <Layout>
      <SEO 
        title="Contact Us - Get Your Cash Offer"
        description="Contact The Property Father for a free cash offer on your Long Island home. Call (516) 548-6558 or fill out our form. We respond within 24 hours."
        canonicalPath="/contact"
      />
      <section className="bg-charcoal text-white py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Contact Us
            </h1>
            <p className="text-lg lg:text-xl text-white/90">
              Ready to get your cash offer? Have questions? We're here to help. Reach out and we'll respond within 24 hours.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold mb-6">
                Get Your Free Cash Offer
              </h2>
              <p className="text-muted-foreground mb-8">
                Fill out the form below and we'll contact you within 24 hours with a fair, no-obligation cash offer for your property.
              </p>
              <ContactForm 
                title="Request Your Cash Offer"
                description="No obligations. We'll respond within 24 hours."
                source="contact-page"
              />
            </div>
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold mb-6">
                Other Ways to Reach Us
              </h2>
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <info.icon className="h-6 w-6 text-accent" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold mb-1">{info.title}</h3>
                          {info.href ? (
                            <a 
                              href={info.href} 
                              className="text-accent hover:underline"
                              target={info.href.startsWith("http") ? "_blank" : undefined}
                              rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined}
                              data-testid={`contact-link-${info.title.toLowerCase()}`}
                            >
                              {info.value}
                            </a>
                          ) : (
                            <p className="text-foreground">{info.value}</p>
                          )}
                          <p className="text-sm text-muted-foreground mt-1">{info.description}</p>
                          {info.title === "Address" && (
                            <div className="mt-4 rounded-lg overflow-hidden h-[200px]">
                              <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387191.0360686158!2d-73.97968099999999!3d40.6974034!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e8429e4180af4f%3A0x72beb63b0a8e32b4!2sLong%20Island%2C%20NY!5e0!3m2!1sen!2sus!4v1700000000000"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="The Property Father Location"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="mt-8 p-6 bg-muted rounded-lg">
                <h3 className="font-semibold text-lg mb-4">Prefer to Call?</h3>
                <p className="text-muted-foreground mb-4">
                  Our team is standing by to answer your questions and discuss your situation. Calls are always free and confidential.
                </p>
                <a href="tel:5165486558">
                  <Button className="bg-accent text-accent-foreground " data-testid="button-call-now">
                    <Phone className="mr-2 h-5 w-5" />
                    Call (516) 548-6558
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-muted">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold mb-4">
              Our Location
            </h2>
            <p className="text-muted-foreground">
              Proudly serving all of Long Island
            </p>
          </div>
          <div className="aspect-video bg-card rounded-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387191.0360686158!2d-73.97968099999999!3d40.6974034!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e8429e4180af4f%3A0x72beb63b0a8e32b4!2sLong%20Island%2C%20NY!5e0!3m2!1sen!2sus!4v1700000000000"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="The Property Father Location"
            />
          </div>
        </div>
      </section>
    </Layout>
  );
}
