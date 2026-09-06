import Image from 'next/image';
import { Phone, Clock, Mail, ArrowUpRight } from 'lucide-react';

export const metadata = { title: 'Contact Us | Exploration Tours' };

export default function ContactPage() {
  return (
    <main className="w-full bg-[#fafafa] min-h-screen pb-24 font-sans text-slate-800">
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-32 lg:pt-40">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 lg:mb-16 gap-8">
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-slate-100 text-xs font-bold uppercase tracking-wider mb-6">Plan Trip</span>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-display font-medium tracking-tight text-slate-900 leading-none">
              Contact Us
            </h1>
          </div>
          <div className="md:w-1/3">
            <p className="text-slate-500 font-medium md:text-right leading-relaxed text-lg">
              Tell us when and where you'd like to go and we'll confirm availability within 24 hours.
            </p>
          </div>
        </div>

        {/* MAIN FORM & IMAGE SECTION */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 mb-24">
          
          {/* Form */}
          <div className="w-full lg:w-[60%] bg-white rounded-[2rem] p-8 md:p-12 shadow-sm border border-slate-100">
            <form className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Name</label>
                  <input type="text" placeholder="Your full name" className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#045a94]/20 focus:border-[#045a94] transition-all placeholder:text-slate-400" required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Email</label>
                  <input type="email" placeholder="you@example.com" className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#045a94]/20 focus:border-[#045a94] transition-all placeholder:text-slate-400" required />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Phone Number</label>
                  <input type="tel" placeholder="+91 998 231 6521" className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#045a94]/20 focus:border-[#045a94] transition-all placeholder:text-slate-400" required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Select Your Tour</label>
                  <select className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#045a94]/20 focus:border-[#045a94] transition-all text-slate-600 appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM2NDc0OGIiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cG9seWxpbmUgcG9pbnRzPSI2IDkgMTIgMTUgMTggOSI+PC9wb2x5bGluZT48L3N2Zz4=')] bg-no-repeat bg-[position:right_1rem_center] bg-[length:1em]">
                    <option value="" disabled selected>Choose your tour...</option>
                    <option value="international">International Tour</option>
                    <option value="domestic">Domestic Tour</option>
                    <option value="custom">Custom Itinerary</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Preferred Date</label>
                  <input type="date" className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#045a94]/20 focus:border-[#045a94] transition-all text-slate-600" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Adults</label>
                  <input type="number" min="1" placeholder="2 adults" className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#045a94]/20 focus:border-[#045a94] transition-all placeholder:text-slate-400" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Children</label>
                  <input type="number" min="0" placeholder="0 children" className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#045a94]/20 focus:border-[#045a94] transition-all placeholder:text-slate-400" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Message / Special Requests</label>
                <textarea rows={4} placeholder="Anything else we should know?" className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#045a94]/20 focus:border-[#045a94] transition-all placeholder:text-slate-400 resize-none"></textarea>
              </div>

              <div className="pt-4 flex items-center gap-3">
                <button type="submit" className="bg-[#0f172a] hover:bg-[#045a94] text-white px-8 py-3.5 rounded-full font-medium transition-colors">
                  Reserve Your Spot
                </button>
                <div className="w-12 h-12 rounded-full bg-[#0f172a] text-white flex items-center justify-center shrink-0">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
              </div>

            </form>
          </div>

          {/* Image */}
          <div className="w-full lg:w-[40%] h-[400px] lg:h-auto relative rounded-[2rem] overflow-hidden">
            <div className="absolute top-6 right-6 z-10">
              <span className="px-4 py-2 rounded-full border border-white/40 text-white text-sm backdrop-blur-md bg-black/10 font-medium">Your Journey</span>
            </div>
            <Image src="https://images.unsplash.com/photo-1517760444937-f6397edcbbcd?q=80&w=1000&auto=format&fit=crop" alt="Beautiful landscape" fill className="object-cover hover:scale-105 transition-transform duration-700" />
          </div>
          
        </div>

        {/* INFO CARDS SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-16 border-t border-slate-200/60 text-center">
          
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center mb-6 text-slate-700">
              <Phone className="w-5 h-5" />
            </div>
            <h4 className="font-semibold text-slate-900 mb-2">Call & WhatsApp</h4>
            <p className="text-slate-500 text-sm leading-relaxed">
              +91 998 231 6521
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center mb-6 text-slate-700">
              <Clock className="w-5 h-5" />
            </div>
            <h4 className="font-semibold text-slate-900 mb-2">Working Hours</h4>
            <p className="text-slate-500 text-sm leading-relaxed">
              Daily: 10am-7pm<br />
              Sunday: Closed
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center mb-6 text-slate-700">
              <Mail className="w-5 h-5" />
            </div>
            <h4 className="font-semibold text-slate-900 mb-2">Write to Us</h4>
            <p className="text-slate-500 text-sm leading-relaxed">
              mathur@exploration-tours.com
            </p>
          </div>

        </div>

        {/* BOTTOM PROMO SECTION */}
        <div className="bg-[#f3f4f6] rounded-[2rem] p-8 md:p-12 mt-12 mb-12 flex flex-col md:flex-row gap-12 items-center">
          <div className="w-full md:w-1/2">
            <span className="inline-block px-3 py-1 rounded-full bg-white text-xs font-bold uppercase tracking-wider mb-6 border border-slate-200">Start now</span>
            <h2 className="text-4xl md:text-5xl font-display font-medium tracking-tight text-slate-900 leading-tight mb-4">
              Discover your next perfect escape
            </h2>
            <p className="text-slate-500 font-medium">
              Plan your trip in minutes and enjoy every moment of your journey.
            </p>
          </div>
          <div className="w-full md:w-1/2 grid grid-cols-2 gap-4 h-[300px]">
            <div className="relative rounded-2xl overflow-hidden mt-8">
              <Image src="https://images.unsplash.com/photo-1541300613939-71366b37c92e?q=80&w=800&auto=format&fit=crop" alt="Promo 1" fill className="object-cover" />
            </div>
            <div className="relative rounded-2xl overflow-hidden mb-8">
              <Image src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=800&auto=format&fit=crop" alt="Promo 2" fill className="object-cover" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}