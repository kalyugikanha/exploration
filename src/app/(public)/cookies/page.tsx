import Link from 'next/link';
import { Cookie, CheckCircle2, ShieldCheck, Sliders, Info, HelpCircle } from 'lucide-react';

export const metadata = {
  title: 'Cookies Policy | Exploration Tours',
  description: 'How Exploration Tours uses cookies and how you can manage your preferences.'
};

export default function CookiesPolicyPage() {
  return (
    <main className="w-full bg-slate-50 min-h-screen pt-28 pb-24">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        
        {/* Header Hero */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100 mb-10">
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100">
            <div className="w-16 h-16 bg-brand-50 text-[#045a94] rounded-2xl flex items-center justify-center shrink-0">
              <Cookie className="w-8 h-8" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#045a94] bg-sky-50 px-3 py-1 rounded-full mb-1 inline-block">
                Browser Transparency
              </span>
              <h1 className="text-3xl md:text-5xl font-display font-bold text-slate-900">
                Cookies Policy
              </h1>
              <p className="text-slate-400 text-sm mt-1">Last Updated: October 2026 &bull; Exploration Tours</p>
            </div>
          </div>

          <p className="text-slate-600 leading-relaxed text-base md:text-lg font-light">
            This Cookies Policy explains how <strong className="font-semibold text-slate-900">Exploration Tours</strong> utilizes cookies and similar tracking technologies when you browse our website. We believe in total transparency regarding how your browsing data is stored and utilized.
          </p>

          {/* Quick Value Points */}
          <div className="grid sm:grid-cols-3 gap-4 mt-8 pt-6 border-t border-slate-100">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <div className="font-bold text-slate-900 text-sm mb-1 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" /> Safe Browsing
              </div>
              <p className="text-xs text-slate-500">
                Our cookies never capture passwords or sensitive banking data.
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <div className="font-bold text-slate-900 text-sm mb-1 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#045a94]" /> Total Control
              </div>
              <p className="text-xs text-slate-500">
                You can decline non-essential cookies via your browser settings.
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <div className="font-bold text-slate-900 text-sm mb-1 flex items-center gap-2">
                <Info className="w-4 h-4 text-brand-600" /> Performance Boost
              </div>
              <p className="text-xs text-slate-500">
                Helps cache high-res destination imagery for faster loading.
              </p>
            </div>
          </div>
        </div>

        {/* Structured Sections */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100 space-y-12">
          
          {/* Section 1 */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold text-sm flex items-center justify-center shrink-0">1</span>
              <h2 className="text-2xl font-display font-bold text-slate-900">What Are Cookies?</h2>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed pl-11">
              Cookies are compact text files placed onto your computer, tablet, or smartphone when you visit a website. They permit the site to identify your device, retain your currency and language preferences, and assist you in navigating smoothly without having to re-enter data on every page.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold text-sm flex items-center justify-center shrink-0">2</span>
              <h2 className="text-2xl font-display font-bold text-slate-900">Types of Cookies We Deploy</h2>
            </div>
            
            <div className="pl-11 space-y-4">
              <div className="border border-slate-200 rounded-2xl overflow-hidden">
                <div className="bg-slate-100 p-4 font-bold text-slate-900 text-sm">
                  2.1 Strictly Necessary Cookies (Always Active)
                </div>
                <div className="p-4 bg-white text-xs text-slate-600 leading-relaxed">
                  These cookies are vital for the basic operation of the website. They enable core security features, user session handling in the admin portal, and passenger form submission. Disabling them may render certain booking features unusable.
                </div>
              </div>

              <div className="border border-slate-200 rounded-2xl overflow-hidden">
                <div className="bg-slate-100 p-4 font-bold text-slate-900 text-sm">
                  2.2 Performance &amp; Analytics Cookies
                </div>
                <div className="p-4 bg-white text-xs text-slate-600 leading-relaxed">
                  We use aggregated analytical cookies to understand how travelers interact with our destination guides and cruise itineraries (such as popular pages, bounce rates, and load times). All data collected is strictly anonymized.
                </div>
              </div>

              <div className="border border-slate-200 rounded-2xl overflow-hidden">
                <div className="bg-slate-100 p-4 font-bold text-slate-900 text-sm">
                  2.3 Functional &amp; Preference Cookies
                </div>
                <div className="p-4 bg-white text-xs text-slate-600 leading-relaxed">
                  These cookies remember choices you make (such as preferred regions or previously viewed packages) to provide a tailored browsing experience when you return.
                </div>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold text-sm flex items-center justify-center shrink-0">3</span>
              <h2 className="text-2xl font-display font-bold text-slate-900">How to Manage Your Browser Cookies</h2>
            </div>
            <div className="pl-11 space-y-3 text-sm text-slate-600 leading-relaxed">
              <p>
                You have the absolute right to accept, limit, or refuse cookies. Most modern web browsers allow you to modify cookie preferences within their settings:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-600">
                <li><strong>Google Chrome:</strong> Settings &rarr; Privacy and security &rarr; Third-party cookies.</li>
                <li><strong>Apple Safari:</strong> Preferences &rarr; Privacy &rarr; Prevent cross-site tracking.</li>
                <li><strong>Mozilla Firefox:</strong> Settings &rarr; Privacy &amp; Security &rarr; Enhanced Tracking Protection.</li>
                <li><strong>Microsoft Edge:</strong> Settings &rarr; Cookies and site permissions &rarr; Manage and delete cookies.</li>
              </ul>
            </div>
          </section>

          {/* Section 4 */}
          <section className="pt-6 border-t border-slate-100">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold text-sm flex items-center justify-center shrink-0">4</span>
              <h2 className="text-2xl font-display font-bold text-slate-900">Questions &amp; Contact</h2>
            </div>
            <div className="pl-11 text-sm text-slate-600 leading-relaxed">
              <p className="mb-4">
                If you have any questions regarding our use of cookies or technical privacy practices, please contact our web administration team:
              </p>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-700">
                Email: <a href="mailto:info@explorationtours.com" className="text-[#045a94] font-bold underline">info@explorationtours.com</a> &bull; Attention: Web Operations &amp; Privacy Desk
              </div>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}
