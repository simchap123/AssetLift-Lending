import Link from "next/link";
import Logo from "@/components/Logo";

const Footer = () => {
  return (
    <footer className="py-12 border-t border-border bg-card/50">
      <div className="container px-4 md:px-6">
        <div className="grid md:grid-cols-5 gap-8 mb-12">
          {/* Logo & tagline */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-3">
              <Logo size={38} />
            </div>
            <p className="text-muted-foreground text-sm max-w-sm">
              Private real estate lending solutions for investors who move fast.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/loans/fix-and-flip" className="hover:text-primary transition-colors">Fix & Flip Loans</Link>
              </li>
              <li>
                <Link href="/loans/dscr-rental" className="hover:text-primary transition-colors">DSCR Rental Loans</Link>
              </li>
              <li>
                <Link href="/loans/bridge" className="hover:text-primary transition-colors">Bridge Loans</Link>
              </li>
              <li>
                <Link href="/loans/ground-up-construction" className="hover:text-primary transition-colors">Construction Loans</Link>
              </li>
              <li>
                <Link href="/markets" className="hover:text-primary transition-colors">Markets</Link>
              </li>
              <li>
                <Link href="/apply" className="hover:text-primary transition-colors">Apply Now</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/how-funding-works" className="hover:text-primary transition-colors">How Funding Works</Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
              </li>
              <li>
                <Link href="/licensing" className="hover:text-primary transition-colors">Licensing</Link>
              </li>
              <li>
                <Link href="/state-disclosures" className="hover:text-primary transition-colors">State Disclosures</Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
              </li>
              <li>
                <Link href="/compare" className="hover:text-primary transition-colors">Compare</Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-primary transition-colors">FAQ</Link>
              </li>
              <li>
                <Link href="/resources/fix-and-flip-borrower-package" className="hover:text-primary transition-colors">Fix & Flip Borrower Package</Link>
              </li>
              <li>
                <Link href="/tools/fix-and-flip-calculator" className="hover:text-primary transition-colors">Fix & Flip Calculator</Link>
              </li>
              <li>
                <Link href="/tools/dscr-calculator" className="hover:text-primary transition-colors">DSCR Calculator</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="mailto:info@assetliftlending.com" className="hover:text-primary transition-colors">
                  info@assetliftlending.com
                </a>
              </li>
              <li>
                <a href="tel:+19296392284" className="hover:text-primary transition-colors">
                  +1 929-639-2284
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Asset Lift Lending. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <Link href="/privacy" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <span>|</span>
            <Link href="/terms" className="hover:text-primary transition-colors">
              Terms
            </Link>
            <span>|</span>
            <Link href="/licensing" className="hover:text-primary transition-colors">
              Licensing
            </Link>
            <span>|</span>
            <Link href="/state-disclosures" className="hover:text-primary transition-colors">
              State Disclosures
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
