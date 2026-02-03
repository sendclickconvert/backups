import { Link } from "wouter";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <img
              src="/images/logo-stacked.png"
              alt="The Property Father"
              className="w-[180px] lg:w-[200px] h-auto"
            />
            <p className="text-gold font-semibold text-sm">
              Long Island's Trusted Cash Home Buyers
            </p>
            <p className="text-sm text-white/80">
              We buy houses for cash in any condition. Get a fair offer in 24 hours with no obligations or hidden fees.
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
                  <span>Long Island, NY</span>
                </div>
              </li>
            </ul>
            <div className="mt-4 rounded-lg overflow-hidden h-[150px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387191.0360686158!2d-73.97968099999999!3d40.6974034!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e8429e4180af4f%3A0x72beb63b0a8e32b4!2sLong%20Island%2C%20NY!5e0!3m2!1sen!2sus!4v1700000000000"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="The Property Father - Long Island, NY"
              />
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-4">
            <Link href="/terms" className="text-sm text-white/60 hover:text-gold transition-colors" data-testid="footer-link-terms">
              Terms of Service
            </Link>
            <span className="hidden md:inline text-white/40">|</span>
            <Link href="/privacy" className="text-sm text-white/60 hover:text-gold transition-colors" data-testid="footer-link-privacy">
              Privacy Policy
            </Link>
          </div>
          <p className="text-center text-sm text-white/60">
            &copy; {new Date().getFullYear()} The Property Father. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
