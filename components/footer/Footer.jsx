import Link from "next/link";
import { Mail, Phone, MapPin, Sun, Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Brand Pitch */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 font-bold text-2xl tracking-tight text-white">
              <Sun className="h-7 w-7 text-amber-400 fill-amber-300" />
              <span>Sun<span className="text-sky-400">Cart</span></span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              Premium summer essentials curated to elevate your outdoor adventures. Protect, style, and enjoy your time under the sun.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="p-2 bg-slate-800 hover:bg-sky-500 rounded-full hover:text-white transition-all duration-300" aria-label="Twitter">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="#" className="p-2 bg-slate-800 hover:bg-pink-600 rounded-full hover:text-white transition-all duration-300" aria-label="Instagram">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              <a href="#" className="p-2 bg-slate-800 hover:bg-blue-600 rounded-full hover:text-white transition-all duration-300" aria-label="Facebook">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8H7v3h2v9h4v-9h3.6l.4-3h-4V6c0-.5.5-1 1-1h3V1h-4c-2.8 0-5 2.2-5 5v2z"/>
                </svg>
              </a>
              <a href="#" className="p-2 bg-slate-800 hover:bg-slate-700 rounded-full hover:text-white transition-all duration-300" aria-label="Website">
                <Globe className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-sky-400 transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-sky-400 transition-colors">Products Catalog</Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-sky-400 transition-colors">Login / Register</Link>
              </li>
              <li>
                <Link href="/profile" className="hover:text-sky-400 transition-colors">My Profile</Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h3 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">Privacy & Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-sky-400 transition-colors">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="hover:text-sky-400 transition-colors">Terms of Service</a>
              </li>
              <li>
                <a href="#" className="hover:text-sky-400 transition-colors">Shipping & Returns</a>
              </li>
              <li>
                <a href="#" className="hover:text-sky-400 transition-colors">Cookie Policy</a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h3 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">Get in Touch</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-sky-400" />
                <span className="truncate">support@suncart.com</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-sky-400" />
                <span>+1 (800) 555-GLOW</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-sky-400" />
                <span className="leading-tight">77 Ocean Vista Drive, Suite 100, Sun-City, FL</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500">
          <p>© {new Date().getFullYear()} SunCart Inc. All summer vibes reserved.</p>
          <p className="mt-2 md:mt-0">Designed for ultimate summer shopping.</p>
        </div>
      </div>
    </footer>
  );
}
