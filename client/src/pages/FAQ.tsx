import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import { FAQSchema } from "@/components/SchemaMarkup";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  Phone,
  ArrowRight,
  HelpCircle
} from "lucide-react";

const faqs = [
  {
    question: "How does the process work?",
    answer: "It's simple: Contact us with your property details, we'll schedule a quick visit, then present you with a fair cash offer within 24 hours. If you accept, we close on your timeline - as fast as 7 days. We handle all paperwork and closing costs."
  },
  {
    question: "How fast can you close?",
    answer: "We can close in as few as 7 days if you need to move quickly. However, we're flexible and can work with your timeline. If you need 30, 60, or even 90 days, that's fine too."
  },
  {
    question: "Do I need to make repairs before selling?",
    answer: "Absolutely not. We buy houses in any condition - damaged, outdated, dirty, or perfect. You don't need to fix, clean, or stage anything. We see potential where others see problems."
  },
  {
    question: "Are there any fees or commissions?",
    answer: "No. We never charge fees or commissions. The offer we make is what you receive at closing. We even pay all standard closing costs."
  },
  {
    question: "How do you determine your offer price?",
    answer: "We evaluate your property based on its location, condition, size, and current market conditions. We look at recent comparable sales in your area and factor in any repairs needed. Our goal is to make a fair offer that works for both parties."
  },
  {
    question: "Will you still buy my house if it has tenants?",
    answer: "Yes, we buy houses with tenants. We can work around existing leases or help facilitate the transition. This is often simpler than trying to sell on the traditional market with tenants in place."
  },
  {
    question: "Do I have to accept your offer?",
    answer: "No. Our offers are completely no-obligation. You're free to take your time, consider your options, and make the decision that's best for you. There's no pressure."
  },
  {
    question: "What if I owe more than my house is worth?",
    answer: "We can still help. We have experience with short sales and can work with your lender to negotiate a solution. Contact us to discuss your specific situation - there may be options you're not aware of."
  },
  {
    question: "Can you help if I'm facing foreclosure?",
    answer: "Yes, and time is critical. We specialize in helping homeowners avoid foreclosure. If you've received a notice of default or foreclosure, contact us immediately. We may be able to close before your foreclosure date."
  },
  {
    question: "What areas do you serve?",
    answer: "We buy houses throughout Long Island, including all of Suffolk County and Nassau County. From Montauk to Queens, we're interested in properties across the entire island."
  },
  {
    question: "How is selling to you different from listing with an agent?",
    answer: "With an agent, you'll wait 3-6 months (or longer), pay 5-6% in commissions, make repairs, stage your home, and deal with multiple showings. With us, you get a cash offer in 24 hours, close in as few as 7 days, pay no commissions or fees, and sell as-is."
  },
  {
    question: "What types of properties do you buy?",
    answer: "We buy single-family homes, multi-family properties, condos, townhouses, and land. We're interested in properties in any condition - occupied or vacant, pristine or distressed."
  },
  {
    question: "Is your offer negotiable?",
    answer: "Our initial offers are based on thorough market analysis and are generally at the top of what we can pay. However, we're always open to discussing the numbers if you feel they don't reflect fair market value."
  },
  {
    question: "What happens after I accept the offer?",
    answer: "We'll handle everything from there. We'll order title work, prepare all closing documents, and coordinate with the title company. You just need to show up at closing, sign the papers, and receive your cash."
  },
  {
    question: "Do I need to clean out the house?",
    answer: "No. We can handle property cleanouts as part of the purchase. Leave behind anything you don't want - furniture, appliances, trash, personal items. We'll take care of it."
  }
];

export default function FAQ() {
  return (
    <Layout>
      <SEO 
        title="FAQ - Frequently Asked Questions"
        description="Get answers to common questions about selling your house for cash to The Property Father. Learn about our process, timeline, fees, and more."
        canonicalPath="/faq"
      />
      <FAQSchema faqs={faqs} />
      
      <section className="gradient-navy text-white py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-4">
              <HelpCircle className="h-6 w-6 text-gold" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-lg lg:text-xl text-white/90">
              Everything you need to know about selling your house to The Property Father.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-card border rounded-lg px-6"
              >
                <AccordionTrigger className="text-left hover:no-underline py-4" data-testid={`faq-question-${index}`}>
                  <span className="font-semibold">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="pb-4 text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-muted">
        <div className="mx-auto max-w-7xl px-4 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Still Have Questions?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Our team is here to help. Give us a call or fill out our contact form and we'll get back to you within 24 hours.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="tel:5165486558">
              <Button size="lg" className="bg-navy text-white ">
                <Phone className="mr-2 h-5 w-5" />
                (516) 548-6558
              </Button>
            </a>
            <Link href="/contact">
              <Button size="lg" variant="outline">
                Contact Us
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-navy text-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Get Your Cash Offer?
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
            Stop wondering and start the process. Get a fair, no-obligation cash offer for your Long Island home today.
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-gold text-navy ">
              Get Your Cash Offer
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
