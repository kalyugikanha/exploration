'use client';
import { useState } from 'react';
import { submitLead } from '@/app/admin/actions';

export default function ContactForm() {
  const [status, setStatus] = useState<'idle'|'loading'|'success'|'error'>('idle');

  async function action(formData: FormData) {
    setStatus('loading');
    try {
      await submitLead(formData);
      setStatus('success');
      (document.getElementById('contact-form') as HTMLFormElement).reset();
    } catch(err) {
      setStatus('error');
    }
  }

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
