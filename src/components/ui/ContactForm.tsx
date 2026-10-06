'use client';
import { useState, useRef, useEffect } from 'react';
import { submitLead } from '@/app/admin/actions';
import { Users, Plus, Minus, ChevronDown } from 'lucide-react';

export default function ContactForm() {
  const [status, setStatus] = useState<'idle'|'loading'|'success'|'error'>('idle');
  
  // Passenger state
  const [showPassengers, setShowPassengers] = useState(false);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowPassengers(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function action(formData: FormData) {
    setStatus('loading');
    
    // Inject numTravellers
    const numTravellers = `${adults} Adults, ${children} Children, ${infants} Infants`;
    formData.append('numTravellers', numTravellers);

    try {
      await submitLead(formData);
      setStatus('success');
      (document.getElementById('contact-form') as HTMLFormElement).reset();
      setAdults(1); setChildren(0); setInfants(0);
    } catch(err) {
      setStatus('error');
    }
  }

  const passengerSummary = `${adults} Adult${adults > 1 ? 's' : ''}${children > 0 ? `, ${children} Child${children > 1 ? 'ren' : ''}` : ''}${infants > 0 ? `, ${infants} Infant${infants > 1 ? 's' : ''}` : ''}`;

  return (
    <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
      <h3 className="text-2xl font-bold font-display text-slate-900 mb-6">Send us a Message</h3>
      <form id="contact-form" action={action} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Full Name *</label>
            <input type="text" name="name" required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none" placeholder="John Doe" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email Address *</label>
            <input type="email" name="email" required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none" placeholder="john@example.com" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number *</label>
            <input type="tel" name="phone" required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none" placeholder="+1 (555) 000-0000" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Destination of Interest</label>
            <input type="text" name="destination" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none" placeholder="E.g. Maldives" />
          </div>
        </div>

        {/* Passenger Selector */}
        <div className="relative" ref={dropdownRef}>
          <label className="block text-sm font-medium text-slate-700 mb-1">Passengers</label>
          <button 
            type="button" 
            onClick={() => setShowPassengers(!showPassengers)}
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-slate-200 bg-white hover:border-brand-500 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none text-left"
          >
            <div className="flex items-center gap-2 text-slate-700">
              <Users className="w-5 h-5 text-slate-400" />
              <span>{passengerSummary}</span>
            </div>
            <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${showPassengers ? 'rotate-180' : ''}`} />
          </button>

          {showPassengers && (
            <div className="absolute z-20 top-full left-0 w-full mt-2 bg-white rounded-xl shadow-xl border border-slate-100 p-4">
              <h4 className="font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">Select Passengers</h4>
              
              {/* Adults */}
              <div className="flex items-center justify-between py-3 border-b border-slate-50">
                <div>
                  <div className="font-bold text-slate-900">Adults</div>
                  <div className="text-xs text-slate-500">Age 12+ Years</div>
                </div>
                <div className="flex items-center gap-3">
                  <button type="button" onClick={() => setAdults(Math.max(1, adults - 1))} className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 text-slate-600 disabled:opacity-50" disabled={adults <= 1}>
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-4 text-center font-bold text-slate-900">{adults}</span>
                  <button type="button" onClick={() => setAdults(adults + 1)} className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 text-slate-600">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Children */}
              <div className="flex items-center justify-between py-3 border-b border-slate-50">
                <div>
                  <div className="font-bold text-slate-900">Children</div>
                  <div className="text-xs text-slate-500">Age 2-12 Years</div>
                </div>
                <div className="flex items-center gap-3">
                  <button type="button" onClick={() => setChildren(Math.max(0, children - 1))} className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 text-slate-600 disabled:opacity-50" disabled={children <= 0}>
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-4 text-center font-bold text-slate-900">{children}</span>
                  <button type="button" onClick={() => setChildren(children + 1)} className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 text-slate-600">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Infants */}
              <div className="flex items-center justify-between py-3">
                <div>
                  <div className="font-bold text-slate-900">Infants</div>
                  <div className="text-xs text-slate-500">Under 2 Years</div>
                </div>
                <div className="flex items-center gap-3">
                  <button type="button" onClick={() => setInfants(Math.max(0, infants - 1))} className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 text-slate-600 disabled:opacity-50" disabled={infants <= 0}>
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-4 text-center font-bold text-slate-900">{infants}</span>
                  <button type="button" onClick={() => setInfants(infants + 1)} className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 text-slate-600">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <button type="button" onClick={() => setShowPassengers(false)} className="w-full mt-4 bg-slate-900 text-white font-bold py-2 rounded-lg hover:bg-slate-800 transition-colors">
                Done
              </button>
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Message / Requirements *</label>
          <textarea name="message" required rows={4} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none resize-none" placeholder="Tell us about your dream trip..."></textarea>
        </div>

        <button type="submit" disabled={status === 'loading'} className="w-full bg-brand-700 text-white font-bold py-4 rounded-xl hover:bg-brand-800 transition-colors disabled:opacity-70 disabled:cursor-not-allowed">
          {status === 'loading' ? 'Sending...' : 'Send Message'}
        </button>

        {status === 'success' && <p className="text-green-600 text-sm font-medium mt-4 text-center">Thank you! Your message has been sent. Our team will contact you shortly.</p>}
        {status === 'error' && <p className="text-red-600 text-sm font-medium mt-4 text-center">Something went wrong. Please try again.</p>}
      </form>
    </div>
  );
}