import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoImage from "@assets/The_Property_Father-02_1769605313217.jpg";

const navigation = [
  { name: "Home", href: "/" },
  { name: "How It Works", href: "/how-it-works" },
  {
    name: "Locations",
    children: [
      { name: "Suffolk County", href: "/locations/suffolk-county" },
      { name: "Nassau County", href: "/locations/nassau-county" },
    ],
  },
  {
    name: "Situations",
    children: [
      { name: "Divorce", href: "/situations/divorce" },
      { name: "Pre-Foreclosure", href: "/situations/pre-foreclosure" },
      { name: "Probate", href: "/situations/probate" },
      { name: "Inherited Property", href: "/situations/inherited-property" },
      { name: "Sell As-Is", href: "/situations/sell-as-is" },
    ],
  },
  {
    name: "Partners",
    children: [
      { name: "Lenders", href: "/partners/lenders" },
      { name: "Realtors", href: "/partners/realtors" },
      { name: "Contractors", href: "/partners/contractors" },
    ],
  },
  { name: "About", href: "/about" },
  { name: "FAQ", href: "/faq" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [location] = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 lg:px-8">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5" data-testid="link-home-logo">
            <img
              className="h-16 lg:h-[150px] w-auto"
              src={logoImage}
              alt="The Property Father"
            />
          </Link>
        </div>

        <div className="flex lg:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(true)}
            data-testid="button-mobile-menu"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>

        <div className="hidden lg:flex lg:gap-x-0">
          {navigation.map((item) =>
            item.children ? (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => setOpenDropdown(item.name)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button
                  className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-foreground hover:text-accent transition-colors rounded-md hover-elevate"
                  data-testid={`dropdown-${item.name.toLowerCase()}`}
                >
                  {item.name}
                  <ChevronDown className="h-4 w-4" />
                </button>
                {openDropdown === item.name && (
                  <div className="absolute left-0 top-full z-10 mt-1 w-48 origin-top-left rounded-md bg-white py-2 shadow-lg ring-1 ring-black/5">
                    {item.children.map((child) => (
                      <Link
                        key={child.name}
                        href={child.href}
                        className="block px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                        data-testid={`link-${child.name.toLowerCase().replace(/\s+/g, '-')}`}
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.name}
                href={item.href}
                className={`px-3 py-2 text-sm font-medium transition-colors rounded-md hover-elevate ${
                  location === item.href
                    ? "text-accent"
                    : "text-foreground hover:text-accent"
                }`}
                data-testid={`link-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {item.name}
              </Link>
            )
          )}
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-x-6">
          <a
            href="tel:5165486558"
            className="flex items-center gap-2 text-sm font-semibold text-accent whitespace-nowrap"
            data-testid="link-phone-header"
          >
            <Phone className="h-4 w-4 flex-shrink-0" />
            (516) 548-6558
          </a>
          <Link href="/contact">
            <Button className="bg-accent text-accent-foreground" data-testid="button-get-offer">
              Get Cash Offer
            </Button>
          </Link>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="fixed inset-0 bg-black/20" onClick={() => setMobileMenuOpen(false)} />
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-border">
            <div className="flex items-center justify-between">
              <Link href="/" className="-m-1.5 p-1.5" onClick={() => setMobileMenuOpen(false)}>
                <img
                  className="h-16 w-auto min-w-[180px]"
                  src={logoImage}
                  alt="The Property Father"
                />
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(false)}
                data-testid="button-close-menu"
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-border">
                <div className="space-y-2 py-6">
                  {navigation.map((item) =>
                    item.children ? (
                      <div key={item.name} className="space-y-2">
                        <span className="block px-3 py-2 text-base font-semibold text-muted-foreground">
                          {item.name}
                        </span>
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            href={child.href}
                            className="block rounded-lg py-2 pl-6 pr-3 text-sm font-medium text-foreground hover:bg-muted"
                            onClick={() => setMobileMenuOpen(false)}
                            data-testid={`mobile-link-${child.name.toLowerCase().replace(/\s+/g, '-')}`}
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block rounded-lg px-3 py-2 text-base font-semibold text-foreground hover:bg-muted"
                        onClick={() => setMobileMenuOpen(false)}
                        data-testid={`mobile-link-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                      >
                        {item.name}
                      </Link>
                    )
                  )}
                </div>
                <div className="py-6 space-y-4">
                  <a
                    href="tel:5165486558"
                    className="flex items-center gap-2 text-lg font-semibold text-accent"
                  >
                    <Phone className="h-5 w-5" />
                    (516) 548-6558
                  </a>
                  <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                    <Button className="w-full bg-accent text-accent-foreground">
                      Get Cash Offer
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
