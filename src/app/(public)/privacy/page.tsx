import Link from 'next/link';
import { Shield, Lock, EyeOff, UserCheck, FileText, Mail, CheckCircle2, AlertCircle } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy | Exploration Tours',
  description: 'How Exploration Tours collects, protects, and handles your personal information.'
};

export default function PrivacyPolicyPage() {
  return (
    <main className="w-full bg-slate-50 min-h-screen pt-28 pb-24">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        
        {/* Header Hero */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100 mb-10">
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100">
            <div className="w-16 h-16 bg-brand-50 text-[#045a94] rounded-2xl flex items-center justify-center shrink-0">
              <Shield className="w-8 h-8" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#045a94] bg-sky-50 px-3 py-1 rounded-full mb-1 inline-block">
                Legal &amp; Compliance
              </span>
              <h1 className="text-3xl md:text-5xl font-display font-bold text-slate-900">
                Privacy Policy
              </h1>
              <p className="text-slate-400 text-sm mt-1">Last Updated: October 2026 &bull; Exploration Tours</p>
            </div>
          </div>

          <p className="text-slate-600 leading-relaxed text-base md:text-lg font-light">
            At <strong className="font-semibold text-slate-900">Exploration Tours</strong>, your privacy and trust are of paramount importance. This document clearly and transparently details what information we collect, why we need it, how we safeguard it, and your legal rights under international and Indian privacy guidelines.
          </p>

          {/* Quick Highlight Cards */}
          <div className="grid sm:grid-cols-3 gap-4 mt-8 pt-6 border-t border-slate-100">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm mb-1">
                <EyeOff className="w-4 h-4 text-emerald-600" /> No Data Selling
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                We never rent, trade, or sell your personal details to advertisers.
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm mb-1">
                <Lock className="w-4 h-4 text-[#045a94]" /> 256-Bit Encryption
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                All inquiries and transaction details are guarded with SSL encryption.
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm mb-1">
                <UserCheck className="w-4 h-4 text-brand-600" /> Full Access Control
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                You can review, modify, or request deletion of your data at any time.
              </p>
            </div>
          </div>
        </div>

        {/* Structured Point-by-Point Clauses */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100 space-y-12">
          
          {/* Section 1 */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold text-sm flex items-center justify-center shrink-0">1</span>
              <h2 className="text-2xl font-display font-bold text-slate-900">Information We Collect</h2>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed mb-4 pl-11">
              To curate bespoke travel itineraries, reserve flights, and confirm hotel/cruise bookings, we collect the following categories of information:
            </p>
            <div className="pl-11 space-y-3">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <h4 className="font-bold text-slate-900 text-sm mb-1">1.1 Identity &amp; Contact Information</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Full name, email address, telephone/WhatsApp contact number, residential city, and nationality.
                </p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <h4 className="font-bold text-slate-900 text-sm mb-1">1.2 Travel Documentation &amp; Passenger Data</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Passport number and validity, date of birth, dietary preferences, emergency contact details, and frequent flyer or cruise loyalty memberships.
                </p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <h4 className="font-bold text-slate-900 text-sm mb-1">1.3 Financial &amp; Payment Records</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Billing addresses and bank wire or payment confirmations. Credit card transactions are handled via PCI-DSS compliant payment gateways; we do not store full card numbers on our servers.
                </p>
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold text-sm flex items-center justify-center shrink-0">2</span>
              <h2 className="text-2xl font-display font-bold text-slate-900">How We Use Your Information</h2>
            </div>
            <div className="pl-11 space-y-2 text-sm text-slate-600 leading-relaxed">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <span><strong>Fulfill Booking Requests:</strong> Booking flights, hotels, luxury trains, cruises, and obtaining entry permits or tickets.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <span><strong>Personalized Itinerary Design:</strong> Customizing sightseeing pacing, private vehicle allocations, and language guides based on your preferences.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <span><strong>Travel Alerts &amp; Updates:</strong> Sharing flight schedule alterations, weather advisories, visa requirements, and trip vouchers.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <span><strong>Legal Compliance:</strong> Complying with immigration, tourism bureau, and financial auditing guidelines.</span>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold text-sm flex items-center justify-center shrink-0">3</span>
              <h2 className="text-2xl font-display font-bold text-slate-900">Information Sharing &amp; Third Parties</h2>
            </div>
            <div className="pl-11 text-sm text-slate-600 leading-relaxed space-y-3">
              <p>
                We only share personal information strictly on a need-to-know basis with:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-600">
                <li>Airlines, hotel partners, cruise lines, and certified destination management partners (DMCs) handling your on-ground services.</li>
                <li>Visa processing facilitators and governmental border control agencies when mandated by destination laws.</li>
                <li>Authorized payment gateways for safe checkout validation.</li>
              </ul>
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-xs flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-amber-700 shrink-0" />
                <span>We strictly prohibit our partners from utilizing your details for independent promotional or marketing ventures.</span>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold text-sm flex items-center justify-center shrink-0">4</span>
              <h2 className="text-2xl font-display font-bold text-slate-900">Data Retention &amp; Security</h2>
            </div>
            <div className="pl-11 text-sm text-slate-600 leading-relaxed space-y-3">
              <p>
                Your personal details are retained only for the duration required to deliver the agreed services and satisfy statutory tax or accounting obligations (typically up to 7 years in India for financial ledgers).
              </p>
              <p>
                We maintain role-based access limitations, server firewall monitoring, and encryption protocols across all electronic databases.
              </p>
            </div>
          </section>

          {/* Section 5 */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold text-sm flex items-center justify-center shrink-0">5</span>
              <h2 className="text-2xl font-display font-bold text-slate-900">Your Data Rights</h2>
            </div>
            <div className="pl-11 grid sm:grid-cols-2 gap-3 text-xs text-slate-700">
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#045a94]" /> Right to Access &amp; Portability
              </div>
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#045a94]" /> Right to Rectification of Errors
              </div>
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#045a94]" /> Right to Request Data Erasure
              </div>
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#045a94]" /> Right to Withdraw Consent
              </div>
            </div>
          </section>

          {/* Section 6 */}
          <section className="pt-6 border-t border-slate-100">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold text-sm flex items-center justify-center shrink-0">6</span>
              <h2 className="text-2xl font-display font-bold text-slate-900">Privacy Officer &amp; Contact</h2>
            </div>
            <div className="pl-11 text-sm text-slate-600 leading-relaxed">
              <p className="mb-4">
                For questions regarding this policy or to exercise any data rights, please contact our Data Protection Officer:
              </p>
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-slate-900 text-base">Nitin Mathur — Managing Director</h4>
                  <p className="text-xs text-slate-500">Exploration Tours, Jaipur, Rajasthan, India</p>
                  <p className="text-xs text-slate-500 mt-1">Email: <a href="mailto:info@explorationtours.com" className="text-[#045a94] font-bold underline">info@explorationtours.com</a></p>
                </div>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 bg-[#045a94] hover:bg-[#03426e] text-white px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider shadow-sm transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" /> Contact Support
                </Link>
              </div>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}
