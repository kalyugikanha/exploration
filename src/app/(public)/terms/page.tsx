import Link from 'next/link';
import { FileText, CheckCircle2, AlertTriangle, ShieldCheck, Scale, MapPin, Mail, ChevronRight } from 'lucide-react';

export const metadata = {
  title: 'Terms & Conditions | Exploration Tours',
  description: 'Terms and conditions governing travel planning and bookings with Exploration Tours.'
};

export default function TermsPage() {
  return (
    <main className="w-full bg-slate-50 min-h-screen pt-28 pb-24">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        
        {/* Header Hero */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100 mb-10">
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100">
            <div className="w-16 h-16 bg-brand-50 text-[#045a94] rounded-2xl flex items-center justify-center shrink-0">
              <Scale className="w-8 h-8" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#045a94] bg-sky-50 px-3 py-1 rounded-full mb-1 inline-block">
                Client Agreement
              </span>
              <h1 className="text-3xl md:text-5xl font-display font-bold text-slate-900">
                Terms &amp; Conditions
              </h1>
              <p className="text-slate-400 text-sm mt-1">Last Updated: October 2026 &bull; Exploration Tours</p>
            </div>
          </div>

          <p className="text-slate-600 leading-relaxed text-base md:text-lg font-light">
            Welcome to <strong className="font-semibold text-slate-900">Exploration Tours</strong>. These terms constitute a legally binding agreement between you (&quot;Client&quot;, &quot;Traveler&quot;) and Exploration Tours. By requesting an itinerary, making a deposit, or purchasing a tour package, you acknowledge and accept these terms in full.
          </p>

          {/* Key Principle Badges */}
          <div className="grid sm:grid-cols-3 gap-4 mt-8 pt-6 border-t border-slate-100">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <div className="font-bold text-slate-900 text-sm mb-1 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Transparent Pricing
              </div>
              <p className="text-xs text-slate-500">
                All mandatory taxes and scheduled inclusions are itemized with zero hidden fees.
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <div className="font-bold text-slate-900 text-sm mb-1 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#045a94]" /> Verified Partners
              </div>
              <p className="text-xs text-slate-500">
                We only partner with vetted airlines, certified hotels, and premium cruise lines.
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <div className="font-bold text-slate-900 text-sm mb-1 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-brand-600" /> Jaipur Jurisdiction
              </div>
              <p className="text-xs text-slate-500">
                Governed under Indian laws with exclusive jurisdiction in Jaipur, Rajasthan.
              </p>
            </div>
          </div>
        </div>

        {/* Structured Clauses */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100 space-y-12">
          
          {/* 1. Services */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold text-sm flex items-center justify-center shrink-0">1</span>
              <h2 className="text-2xl font-display font-bold text-slate-900">Scope of Travel Services</h2>
            </div>
            <div className="pl-11 space-y-3 text-sm text-slate-600 leading-relaxed">
              <p>
                1.1 Exploration Tours operates as an experiential travel designer and curator. Our services encompass customized day-by-day itinerary planning, accommodation reservations, private transfers, domestic/international flight bookings, cruise cabin reservations, and local sightseeing coordination.
              </p>
              <p>
                1.2 While we exercise rigorous diligence in choosing suppliers, third-party operators (such as airlines, rail corporations, independent resorts, and local ship crews) operate under their individual terms of carriage and property policies.
              </p>
            </div>
          </section>

          {/* 2. Bookings & Payments */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold text-sm flex items-center justify-center shrink-0">2</span>
              <h2 className="text-2xl font-display font-bold text-slate-900">Bookings, Pricing &amp; Payment Schedule</h2>
            </div>
            <div className="pl-11 space-y-3 text-sm text-slate-600 leading-relaxed">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <h4 className="font-bold text-slate-900 text-sm mb-1">2.1 Quotation Validity &amp; Price Fluctuations</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Quoted prices remain provisional until formal receipt of the booking deposit. In rare cases of sudden currency revaluations, airline fuel surcharge revisions, or newly imposed governmental entrance taxes, prices may be adjusted prior to final ticketing.
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <h4 className="font-bold text-slate-900 text-sm mb-1">2.2 Standard Payment Milestones</h4>
                <ul className="list-disc pl-5 text-xs text-slate-600 space-y-1 mt-1">
                  <li><strong>Initial Token / Deposit:</strong> 25% of total tour package cost upon itinerary confirmation.</li>
                  <li><strong>Interim Payment:</strong> 50% due 45 days prior to scheduled departure date (or sooner for high-demand cruises and peak holidays).</li>
                  <li><strong>Balance Settlement:</strong> 100% final payment due 21 days prior to travel departure.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 3. Traveler Responsibilities */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold text-sm flex items-center justify-center shrink-0">3</span>
              <h2 className="text-2xl font-display font-bold text-slate-900">Traveler Responsibilities &amp; Documentation</h2>
            </div>
            <div className="pl-11 space-y-3 text-sm text-slate-600 leading-relaxed">
              <p>
                3.1 <strong>Passports &amp; Visas:</strong> The client is solely responsible for possessing a passport valid for at least 6 months beyond the intended return date, along with necessary tourist visas, transit visas, and health clearances.
              </p>
              <p>
                3.2 <strong>Accuracy of Names:</strong> Traveler names provided at the time of booking must match the exact spelling on government-issued passports. Reissuance charges incurred due to incorrect spelling will be borne by the client.
              </p>
              <p>
                3.3 <strong>Conduct &amp; Local Laws:</strong> Travelers are expected to respect local customs, laws, and regulations of host nations. Unlawful conduct may result in immediate termination of travel services without compensation.
              </p>
            </div>
          </section>

          {/* 4. Travel Insurance */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold text-sm flex items-center justify-center shrink-0">4</span>
              <h2 className="text-2xl font-display font-bold text-slate-900">Mandatory Travel Insurance Recommendation</h2>
            </div>
            <div className="pl-11">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl text-blue-950 text-xs leading-relaxed flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#045a94] shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-bold mb-1 text-sm">Comprehensive Coverage Advised</h5>
                  Exploration Tours strongly mandates all guests to secure comprehensive international travel insurance covering emergency medical evacuation, trip cancellation, baggage loss, and flight interruption. Exploration Tours bears no liability for uninsurable personal losses.
                </div>
              </div>
            </div>
          </section>

          {/* 5. Force Majeure & Delays */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold text-sm flex items-center justify-center shrink-0">5</span>
              <h2 className="text-2xl font-display font-bold text-slate-900">Modifications, Delays &amp; Force Majeure</h2>
            </div>
            <div className="pl-11 space-y-3 text-sm text-slate-600 leading-relaxed">
              <p>
                5.1 In the event of circumstances beyond human control (&quot;Force Majeure&quot;)—including extreme weather conditions, volcanic eruptions, strikes, civil unrest, or governmental border restrictions—Exploration Tours will assist with alternative logistical arrangements.
              </p>
              <p>
                5.2 Any additional expenses arising from unscheduled hotel overnights, charter rerouting, or medical contingencies remain the traveler&apos;s financial responsibility.
              </p>
            </div>
          </section>

          {/* 6. Jurisdiction */}
          <section className="pt-6 border-t border-slate-100">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold text-sm flex items-center justify-center shrink-0">6</span>
              <h2 className="text-2xl font-display font-bold text-slate-900">Governing Law &amp; Dispute Resolution</h2>
            </div>
            <div className="pl-11 space-y-4 text-sm text-slate-600 leading-relaxed">
              <p>
                These Terms and Conditions and any non-contractual obligations arising out of them shall be governed by and construed in accordance with the substantive laws of India.
              </p>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-xs">
                <strong>Jurisdiction:</strong> Any legal action, dispute, or proceedings arising out of this agreement shall fall within the exclusive jurisdiction of the competent courts of <strong>Jaipur, Rajasthan, India</strong>.
              </div>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/cancellation-and-refund-policies.html"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#045a94] hover:underline"
                >
                  <span>Review Cancellation &amp; Refund Slabs</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/privacy"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#045a94] hover:underline"
                >
                  <span>Review Privacy Policy</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}
