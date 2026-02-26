interface LocalBusinessSchemaProps {
  name?: string;
  description?: string;
  url?: string;
}

export function LocalBusinessSchema({ 
  name = "The Property Father",
  description = "We buy houses for cash in Long Island, NY. Fast, fair offers with no fees or commissions.",
  url = "https://thepropertyfather.com"
}: LocalBusinessSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name,
    description,
    url,
    telephone: "(516) 548-6558",
    email: "info@thepropertyfather.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Long Island",
      addressRegion: "NY",
      addressCountry: "US"
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "40.7891",
      longitude: "-73.1350"
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: "3",
      bestRating: "5",
      worstRating: "1"
    },
    areaServed: [
      {
        "@type": "County",
        name: "Suffolk County, NY"
      },
      {
        "@type": "County", 
        name: "Nassau County, NY"
      }
    ],
    priceRange: "$$",
    openingHours: "Mo-Fr 09:00-18:00",
    sameAs: []
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSchemaProps {
  faqs: FAQItem[];
}

export function FAQSchema({ faqs }: FAQSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[];
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://thepropertyfather.com"
      },
      ...items.map((item, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: item.label,
        ...(item.href ? { item: `https://thepropertyfather.com${item.href}` } : {})
      }))
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
