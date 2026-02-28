import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ContactForm from "@/components/ContactForm";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import { BreadcrumbSchema, FAQSchema } from "@/components/SchemaMarkup";
import AuthorByline from "@/components/AuthorByline";
import {
  Scale,
  CheckCircle,
  Phone,
  ArrowRight,
  Shield,
  Clock,
  DollarSign,
  ChevronRight,
  ExternalLink,
} from "lucide-react";

const faqs = [
  {
    question: "Do all heirs have to agree to sell the house in probate?",
    answer:
      "If there's a valid will naming an executor, that person has legal authority to sell. If there's no will (intestate), all heirs typically need to consent or the court can authorize the sale.",
  },
  {
    question:
      "How long does it take to sell a probate property in New York?",
    answer:
      "Once the executor is appointed, we can close in as few as 7-14 days depending on court scheduling. Total timeline from death to closing is typically 6-12 months, mostly waiting on court appointment.",
  },
  {
    question: "Does the house need to be cleaned out before selling?",
    answer:
      "No. We buy probate properties in as-is condition, contents and all. We handle the cleanout after closing.",
  },
  {
    question:
      "What if the property has deferred maintenance or code violations?",
    answer:
      "We buy as-is regardless of condition. Property condition does not affect our ability to close.",
  },
];

const timelineSteps = [
  {
    step: "1",
    title: "Death of Property Owner",
    description:
      "The property becomes part of the deceased's estate and cannot be sold without court authorization.",
  },
  {
    step: "2",
    title: "File for Probate",
    description:
      "The will is submitted to the Surrogate's Court in the county where the deceased lived. If there is no will, a petition for administration is filed.",
  },
  {
    step: "3",
    title: "Executor or Administrator Appointed",
    description:
      "The court validates the will and officially appoints the executor (or administrator if no will exists). This step can take several months.",
  },
  {
    step: "4",
    title: "Property Sold",
    description:
      "Once appointed, the executor has authority to sell real property. With a cash buyer like The Property Father, this can happen in as few as 7-14 days.",
  },
  {
    step: "5",
    title: "Proceeds Distributed",
    description:
      "After debts, taxes, and expenses are paid from the estate, remaining proceeds are distributed to beneficiaries according to the will or state law.",
  },
];

export default function Probate() {
  return (
    <Layout>
      <SEO
        title="Selling a Probate Property on Long Island"
        description="Inherited a house going through probate in Suffolk or Nassau County? We buy probate properties for cash, work with estate attorneys, and close on your timeline. Call (516) 548-6558."
        canonicalPath="/situations/probate"
      />
      <BreadcrumbSchema items={[{ label: "Probate" }]} />
      <FAQSchema faqs={faqs} />

      <section className="bg-charcoal text-white py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <nav className="flex items-center gap-1 text-sm text-white/60 mb-6" aria-label="Breadcrumb" data-testid="nav-breadcrumb">
            <Link href="/">
              <span className="hover:text-gold cursor-pointer">Home</span>
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-gold">Probate</span>
          </nav>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Scale className="h-5 w-5 text-gold" />
                <span className="text-gold font-medium">Probate Sales</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6" data-testid="text-probate-h1">
                Selling a Probate Property on Long Island: What You Need to Know
              </h1>
              <p className="text-lg text-white/90 mb-8" data-testid="text-probate-intro">
                When a loved one passes away and leaves behind a house, the property typically goes through probate before it can be sold. On Long Island, where property values are high and family dynamics can be complicated, navigating a probate sale without the right support is overwhelming. The Property Father works with estate attorneys and executors to simplify the process and close on your timeline.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/contact">
                  <Button size="lg" className="bg-gold text-navy" data-testid="button-probate-offer">
                    Get Your Cash Offer
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <a href="tel:5165486558">
                  <Button size="lg" variant="outline" className="border-white text-white bg-transparent" data-testid="button-probate-call">
                    <Phone className="mr-2 h-5 w-5" />
                    (516) 548-6558
                  </Button>
                </a>
              </div>
            </div>
            <div>
              <ContactForm
                title="Probate Property Consultation"
                description="Get guidance on selling during probate."
                source="probate"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20" data-testid="section-what-is-probate">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
            What Is Probate in New York?
          </h2>
          <p className="text-lg text-muted-foreground mb-4">
            Probate is the legal process through which a deceased person's will is validated and their assets are distributed to beneficiaries. In New York, the Surrogate's Court in the county where the deceased resided oversees probate proceedings. The court confirms the validity of the will, appoints an executor, and ensures that all debts, taxes, and obligations of the estate are satisfied before any remaining assets are transferred.
          </p>
          <p className="text-lg text-muted-foreground mb-4">
            If the deceased died without a will (known as dying "intestate"), the court appoints an administrator to manage the estate. The administrator's role is similar to an executor's, but the distribution of assets follows New York's intestacy laws rather than the wishes outlined in a will.
          </p>
          <p className="text-lg text-muted-foreground mb-4">
            The probate process in New York typically takes between 6 and 12 months, though it can take significantly longer if the will is contested, if there are disputes among heirs, or if the estate is particularly complex. During this time, the property cannot be sold without proper court authorization, and expenses such as property taxes, insurance, and maintenance continue to accrue against the estate.
          </p>
          <p className="text-lg text-muted-foreground">
            For Long Island families, where the average home value in Nassau and Suffolk Counties can exceed $500,000, the carrying costs of a probate property add up quickly. Understanding how to navigate the probate process efficiently is critical to preserving the value of the estate for all beneficiaries.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-muted" data-testid="section-sell-during-probate">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
            Can You Sell a House During Probate in New York?
          </h2>
          <p className="text-lg text-muted-foreground mb-4">
            Yes, you can sell a house during probate in New York, but there are legal steps that must be completed first. The most important requirement is that the executor or administrator must be formally appointed by the Surrogate's Court before they have the authority to sell real property belonging to the estate.
          </p>
          <p className="text-lg text-muted-foreground mb-4">
            Once the executor receives their Letters Testamentary (or Letters of Administration for intestate estates), they have the legal authority to manage estate assets, including selling real property. The executor has a fiduciary duty to act in the best interests of the estate and its beneficiaries, which means obtaining a fair price for the property.
          </p>
          <p className="text-lg text-muted-foreground mb-4">
            In New York, the executor generally does not need additional court approval to sell real property if the will grants them the power to do so. However, if the will is silent on real property sales or if the estate is being administered without a will, the administrator may need to petition the court for permission to sell. An experienced estate attorney can advise on the specific requirements for your situation.
          </p>
          <p className="text-lg text-muted-foreground">
            Working with a cash buyer like The Property Father simplifies this process significantly. Because we purchase properties as-is and can close on a flexible timeline, executors have one fewer complication to manage during an already stressful time.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-20" data-testid="section-probate-timeline">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-8">
            Probate Sale Timeline on Long Island
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Understanding the probate timeline helps executors plan ahead and avoid unnecessary delays. Here is a typical sequence for selling a probate property on Long Island:
          </p>
          <div className="space-y-6">
            {timelineSteps.map((item, index) => (
              <Card key={index} data-testid={`card-timeline-step-${index}`}>
                <CardContent className="flex items-start gap-4 pt-6">
                  <div className="flex-shrink-0 w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                    <span className="text-accent font-bold">{item.step}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="text-lg text-muted-foreground mt-8">
            The biggest variable in this timeline is how long it takes the Surrogate's Court to appoint the executor. In Nassau and Suffolk Counties, this process can take anywhere from a few weeks to several months depending on court backlogs, the complexity of the estate, and whether any parties contest the will.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-muted" data-testid="section-cash-buyers">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
            Why Cash Buyers Work Well for Probate Sales
          </h2>
          <p className="text-lg text-muted-foreground mb-4">
            Traditional home sales involve financing contingencies, inspection periods, repair negotiations, and timelines that can stretch for months. For an estate in probate, these delays compound the financial burden and create additional stress for grieving families. Cash buyers like The Property Father eliminate many of these hurdles.
          </p>
          <div className="grid md:grid-cols-3 gap-6 my-8">
            <Card className="text-center">
              <CardContent className="pt-8">
                <div className="mx-auto w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                  <Shield className="h-7 w-7 text-accent" />
                </div>
                <h3 className="font-semibold text-lg mb-2">No Repair Contingencies</h3>
                <p className="text-muted-foreground">We buy as-is. No inspections, no repair requests, no renegotiations after the offer is made.</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-8">
                <div className="mx-auto w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                  <Clock className="h-7 w-7 text-accent" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Fast Closing</h3>
                <p className="text-muted-foreground">Once the executor is appointed, we can close in as few as 7-14 days. No waiting on mortgage approvals.</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-8">
                <div className="mx-auto w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                  <DollarSign className="h-7 w-7 text-accent" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Flexible Dates</h3>
                <p className="text-muted-foreground">We work around court schedules and can adjust closing dates to align with Surrogate's Court requirements.</p>
              </CardContent>
            </Card>
          </div>
          <p className="text-lg text-muted-foreground">
            Because we pay cash and don't rely on bank financing, there is no risk of a deal falling through due to a denied mortgage application. This certainty is especially valuable during probate, when multiple beneficiaries are counting on the sale to move forward. Our offers are straightforward, with no hidden fees or commissions, so the estate receives a clear and predictable amount at closing.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-20" data-testid="section-estate-attorneys">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
            Working With Estate Attorneys
          </h2>
          <p className="text-lg text-muted-foreground mb-4">
            We understand that probate sales involve more legal requirements than a standard real estate transaction. That's why we work directly with your estate attorney throughout the entire process. From the initial offer to the closing table, we coordinate with your legal team to ensure that every requirement of the Surrogate's Court is met.
          </p>
          <p className="text-lg text-muted-foreground mb-4">
            Our experience with probate sales in Nassau and Suffolk Counties means we know what documentation is required, how to structure the transaction to satisfy court requirements, and how to avoid common delays. We handle our side of the paperwork efficiently so your attorney can focus on the legal aspects of settling the estate.
          </p>
          <p className="text-lg text-muted-foreground mb-4">
            If you don't yet have an estate attorney, we can provide referrals to experienced probate attorneys on Long Island who specialize in estate administration and real property sales. Having the right attorney makes a significant difference in how smoothly the probate process goes.
          </p>
          <p className="text-lg text-muted-foreground">
            Whether you're an executor managing your first estate or an attorney representing a client, we're here to make the real estate side of probate as simple as possible. Call us at <a href="tel:5165486558" className="text-accent underline" data-testid="link-call-attorneys-section">(516) 548-6558</a> to discuss your situation.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-muted" data-testid="section-faqs">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-8">
            Frequently Asked Questions About Probate Sales
          </h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`faq-${index}`} data-testid={`accordion-faq-${index}`}>
                <AccordionTrigger className="text-left text-lg" data-testid={`button-faq-${index}`}>
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base" data-testid={`text-faq-answer-${index}`}>
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="py-16 lg:py-20" data-testid="section-related-resources">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
            Related Resources
          </h2>
          <ul className="space-y-3 mb-8">
            <li className="flex items-start gap-3">
              <ExternalLink className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
              <a
                href="https://blog.thepropertyfather.com/sell-inherited-house-new-york/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent underline"
                data-testid="link-blog-inherited-house"
              >
                How to Sell an Inherited House in New York
              </a>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
              <Link href="/locations/nassau-county">
                <span className="text-accent underline cursor-pointer" data-testid="link-nassau-county">
                  We Buy Houses in Nassau County
                </span>
              </Link>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
              <Link href="/locations/suffolk-county">
                <span className="text-accent underline cursor-pointer" data-testid="link-suffolk-county">
                  We Buy Houses in Suffolk County
                </span>
              </Link>
            </li>
          </ul>

          <AuthorByline className="mb-8" />

          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground" data-testid="text-legal-disclaimer">
                <strong>Disclaimer:</strong> This page is for informational purposes only and does not constitute legal advice. Probate laws vary and are subject to change. We recommend consulting with a qualified estate attorney licensed in New York for advice specific to your situation. The Property Father is not a law firm and does not provide legal services.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-charcoal text-white" data-testid="section-bottom-cta">
        <div className="mx-auto max-w-7xl px-4 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Simplify the Probate Process
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
            Let us help you handle the property sale while you focus on settling the estate. Contact us today for a free, no-obligation consultation.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="tel:5165486558">
              <Button size="lg" className="bg-gold text-navy" data-testid="button-cta-call">
                <Phone className="mr-2 h-5 w-5" />
                (516) 548-6558
              </Button>
            </a>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-white text-white bg-transparent" data-testid="button-cta-offer">
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
