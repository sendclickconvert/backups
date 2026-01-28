import { Link } from "wouter";
import { Phone, Mail, MapPin } from "lucide-react";
import logoImage from "@assets/ThePropertFather_1769607853656.png";

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <img
              src={logoImage}
              alt="The Property Father"
              className="h-16 w-auto"
            />
            <p className="text-sm text-white/80">
              We buy houses for cash in Long Island, NY. Get a fair offer in 24 hours with no obligations or hidden fees.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-gold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/how-it-works" className="text-sm text-white/80 hover:text-gold transition-colors" data-testid="footer-link-how-it-works">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-white/80 hover:text-gold transition-colors" data-testid="footer-link-about">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm text-white/80 hover:text-gold transition-colors" data-testid="footer-link-faq">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-white/80 hover:text-gold transition-colors" data-testid="footer-link-contact">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-gold">We Buy Houses In</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/locations/suffolk-county" className="text-sm text-white/80 hover:text-gold transition-colors" data-testid="footer-link-suffolk">
                  Suffolk County
                </Link>
              </li>
              <li>
                <Link href="/locations/nassau-county" className="text-sm text-white/80 hover:text-gold transition-colors" data-testid="footer-link-nassau">
                  Nassau County
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-gold">Contact Us</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:5165486558"
                  className="flex items-center gap-2 text-sm text-white/80 hover:text-gold transition-colors"
                  data-testid="footer-link-phone"
                >
                  <Phone className="h-4 w-4 text-gold" />
                  (516) 548-6558
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@thepropertyfather.com"
                  className="flex items-center gap-2 text-sm text-white/80 hover:text-gold transition-colors"
                  data-testid="footer-link-email"
                >
                  <Mail className="h-4 w-4 text-gold" />
                  info@thepropertyfather.com
                </a>
              </li>
              <li>
                <div className="flex items-start gap-2 text-sm text-white/80">
                  <MapPin className="h-4 w-4 text-gold flex-shrink-0 mt-0.5" />
                  <span>100 Washington Ave<br />Patchogue, NY 11772</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-center text-sm text-white/60">
            &copy; {new Date().getFullYear()} The Property Father. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
