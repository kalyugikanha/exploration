import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Youtube, Twitter, Send, Plane, ArrowRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#f8fafc] text-slate-600 pt-20 relative overflow-hidden">
      
      {/* Top Footer Content */}
      <div className="max-w-7xl mx-auto px-4 pb-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Column 1: Brand (Span 4) */}
          <div className="lg:col-span-4 pr-4 lg:pr-8">
                        <Link href="/" className="flex items-center mb-6 group inline-flex">
              <div className="relative w-48 h-16 md:w-56 md:h-20">
                <Image src="/images/logo.jpg" alt="Exploration Tours" fill className="object-contain group-hover:scale-105 transition-transform duration-500" />
              </div>
            </Link>
            <div className="text-slate-500 text-sm leading-relaxed mb-8 font-medium space-y-2">
              <p><strong>Exploration Tours</strong></p>
              <p>Flat No. G1, Ground Floor, Shrikriti Apartments,<br/>Plot No. 222 Nemi Nagar Extension,<br/>Vaishali Nagar, Jaipur, Rajasthan - 302021, India</p>
              <p>Phone: +91 998 231 6521</p>
              <p>Email: <a href="mailto:mathur@exploration-tours.com" className="hover:text-[#045a94] transition-colors">mathur@exploration-tours.com</a></p>
            </div>
            
            <div className="flex items-center gap-3">
              <a href="https://www.facebook.com/people/Exploration-Tours/100089478369935" target="_blank" rel="noopener noreferrer" className="group w-10 h-10 rounded-full bg-white shadow-[0_5px_15px_rgba(0,0,0,0.05)] flex items-center justify-center hover:bg-blue-600 hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(37,99,235,0.3)] transition-all duration-300">
                <Facebook className="w-4 h-4 text-slate-600 group-hover:text-white transition-colors" />
              </a>
              <a href="https://www.instagram.com/explorationtourss/" target="_blank" rel="noopener noreferrer" className="group w-10 h-10 rounded-full bg-white shadow-[0_5px_15px_rgba(0,0,0,0.05)] flex items-center justify-center hover:bg-pink-600 hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(219,39,119,0.3)] transition-all duration-300">
                <Instagram className="w-4 h-4 text-slate-600 group-hover:text-white transition-colors" />
              </a>
              <a href="https://www.linkedin.com/in/exploration-tours-735" target="_blank" rel="noopener noreferrer" className="group w-10 h-10 rounded-full bg-white shadow-[0_5px_15px_rgba(0,0,0,0.05)] flex items-center justify-center hover:bg-blue-700 hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(29,78,216,0.3)] transition-all duration-300">
                <svg className="w-4 h-4 text-slate-600 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="group w-10 h-10 rounded-full bg-white shadow-[0_5px_15px_rgba(0,0,0,0.05)] flex items-center justify-center hover:bg-red-600 hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(220,38,38,0.3)] transition-all duration-300">
                <Youtube className="w-4 h-4 text-slate-600 group-hover:text-white transition-colors" />
              </a>
            </div>

          </div>

          {/* Column 2: Quick Links (Span 2) */}
          <div className="lg:col-span-2 lg:pl-8">
            <h4 className="text-slate-900 font-bold mb-8 text-lg font-display">Quick Links</h4>
            <ul className="space-y-4 text-sm font-medium">
              {['Destinations', 'Experiences', 'Hotels', 'Tours', 'Deals', 'About Us'].map((item) => (
                <li key={item}>
                  <Link href={`/${item.toLowerCase().replace(' ', '-')}`} className="group flex items-center text-slate-500 hover:text-[#045a94] transition-colors">
                    <ArrowRight className="w-3 h-3 mr-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    <span className="transform group-hover:translate-x-1 transition-transform duration-300">{item}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Support (Span 2) */}
          <div className="lg:col-span-2">
            <h4 className="text-slate-900 font-bold mb-8 text-lg font-display">Support</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link href="/faqs" className="group flex items-center text-slate-500 hover:text-[#045a94] transition-colors"><ArrowRight className="w-3 h-3 mr-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" /><span className="transform group-hover:translate-x-1 transition-transform duration-300">FAQs</span></Link></li>
              <li><Link href="/privacy" className="group flex items-center text-slate-500 hover:text-[#045a94] transition-colors"><ArrowRight className="w-3 h-3 mr-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" /><span className="transform group-hover:translate-x-1 transition-transform duration-300">Privacy Policy</span></Link></li>
              <li><Link href="/terms" className="group flex items-center text-slate-500 hover:text-[#045a94] transition-colors"><ArrowRight className="w-3 h-3 mr-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" /><span className="transform group-hover:translate-x-1 transition-transform duration-300">Terms & Conditions</span></Link></li>
              <li><Link href="/refund-and-cancellation" className="group flex items-center text-slate-500 hover:text-[#045a94] transition-colors"><ArrowRight className="w-3 h-3 mr-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" /><span className="transform group-hover:translate-x-1 transition-transform duration-300">Cancellation & Refund Policy</span></Link></li>
              <li><Link href="/contact" className="group flex items-center text-slate-500 hover:text-[#045a94] transition-colors"><ArrowRight className="w-3 h-3 mr-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" /><span className="transform group-hover:translate-x-1 transition-transform duration-300">Contact Us</span></Link></li>
            </ul>

          </div>

          {/* Column 4: Newsletter (Span 4) */}
          <div className="lg:col-span-4">
            <h4 className="text-slate-900 font-bold mb-8 text-lg font-display">Newsletter</h4>
            <p className="text-slate-500 text-sm mb-6 leading-relaxed pr-8">
              Subscribe to get exclusive travel deals, insider tips, and updates directly to your inbox.
            </p>
            <form className="flex items-center border border-white rounded-full p-1.5 bg-white shadow-[0_10px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_10px_40px_rgba(4,90,148,0.1)] transition-all duration-500 focus-within:border-[#045a94] focus-within:ring-4 focus-within:ring-[#045a94]/10 max-w-sm mt-4 group">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="w-full px-5 outline-none bg-transparent text-sm text-slate-700 placeholder-slate-400 font-medium"
                required
              />
              <button 
                type="submit" 
                className="w-12 h-12 rounded-full bg-[#0f172a] text-white flex items-center justify-center shrink-0 hover:bg-[#045a94] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                aria-label="Subscribe"
              >
                <Send className="w-4 h-4 ml-[-2px] mt-[2px] transform group-focus-within:translate-x-1 group-focus-within:-translate-y-1 transition-transform" />
              </button>
            </form>
          </div>

        </div>
      </div>

      {/* Giant Animated Text Background at the bottom of the footer */}
      <div className="relative w-full h-[15vw] min-h-[120px] overflow-hidden flex items-end justify-center pointer-events-none select-none border-t border-slate-200/60 bg-white/50 mt-10">
        <h1 className="text-[14vw] font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-100 via-[#045a94]/40 to-slate-100 bg-[length:200%_auto] animate-[gradient_3s_linear_infinite] leading-[0.8] tracking-tighter uppercase whitespace-nowrap">
          Exploration
        </h1>
      </div>

      {/* Copyright Bar */}
      <div className="relative z-10 bg-white py-6 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-sm font-medium tracking-wide">
            &copy; {new Date().getFullYear()} Exploration Tours. All rights reserved.
          </p>
          
          <div className="flex flex-wrap gap-4 md:gap-6 text-sm text-slate-400 font-medium">
            <Link href="/terms" className="hover:text-[#045a94] transition-colors">Terms</Link>
            <Link href="/privacy" className="hover:text-[#045a94] transition-colors">Privacy</Link>
            <Link href="/refund-and-cancellation" className="hover:text-[#045a94] transition-colors">Cancellation & Refund Policy</Link>
          </div>

        </div>
      </div>
    </footer>
  );
}