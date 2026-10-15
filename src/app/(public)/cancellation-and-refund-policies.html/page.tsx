import { ShieldCheck } from 'lucide-react';

export const metadata = {
  title: 'Cancellation and Refund Policies | Exploration Tours',
  description: 'Our comprehensive cancellation and refund policies.',
};

export default function CancellationPolicyPage() {
  return (
    <main className="min-h-screen bg-slate-50 pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 md:p-12">
          
          <div className="flex items-center gap-4 mb-8 pb-8 border-b border-slate-100">
            <div className="w-16 h-16 bg-brand-50 text-brand-700 rounded-full flex items-center justify-center shrink-0">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-2">Cancellation & Refund Policy</h1>
              <p className="text-slate-500 font-medium text-sm md:text-base">Last Updated: October 2026</p>
            </div>
          </div>

          <div className="prose prose-slate max-w-none text-slate-600">
            
            <p className="lead text-lg editorial-text leading-relaxed text-slate-700">
              At Exploration Tours, we strive to deliver transparent, reliable, and fair travel planning services. We recognize that unforeseen circumstances can sometimes affect your travel schedule. Below are our explicit and standard terms governing cancellations, adjustments, and refunds.
            </p>

            <h2 className="text-2xl font-bold font-display text-slate-900 mt-10 mb-4 pb-2 border-b border-slate-100">
              1. General Cancellation Rules
            </h2>
            <ul className="list-disc pl-6 space-y-3 mb-8 editorial-text leading-relaxed">
              <li>All cancellation requests must be formally submitted in writing via email to our official support team at <a href="mailto:info@explorationtours.com" className="text-brand-700 font-bold hover:underline">info@explorationtours.com</a>.</li>
              <li>The official date of email receipt in Indian Standard Time (IST) will serve as the exact timestamp for calculating the applicable cancellation charges.</li>
              <li>Verbal, WhatsApp, or telephone communications will not be considered formal cancellation notices unless verified in writing by our reservations department.</li>
              <li>Failure to arrive at the designated departure point, airport, cruise terminal, or hotel (&quot;No-show&quot;) will attract a 100% cancellation fee, and no refund will be payable under any circumstance.</li>
            </ul>

            <h2 className="text-2xl font-bold font-display text-slate-900 mt-10 mb-4 pb-2 border-b border-slate-100">
              2. Standard Tour Cancellation Slab &amp; Charges
            </h2>
            <p className="text-slate-600 mb-4 editorial-text leading-relaxed">
              Cancellation fees are calculated based on the number of calendar days between formal cancellation receipt and the scheduled departure date:
            </p>
            <div className="overflow-x-auto mb-8 rounded-2xl border border-slate-200 shadow-sm">
              <table className="min-w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-900 text-sm font-bold uppercase tracking-wider">
                    <th className="py-4 px-6">Notice Period Before Tour Departure</th>
                    <th className="py-4 px-6">Cancellation Fee Payable (% of Total Tour Cost)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm font-medium">
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-6 text-slate-800">45 Days or more prior to departure</td>
                    <td className="py-4 px-6 text-brand-700 font-bold">25% (Registration &amp; Booking Token Fee)</td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-6 text-slate-800">30 to 44 Days prior to departure</td>
                    <td className="py-4 px-6 text-brand-700 font-bold">50% of the total tour cost</td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-6 text-slate-800">15 to 29 Days prior to departure</td>
                    <td className="py-4 px-6 text-brand-700 font-bold">75% of the total tour cost</td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors bg-red-50/30">
                    <td className="py-4 px-6 text-slate-900 font-semibold">Less than 15 Days or No-Show</td>
                    <td className="py-4 px-6 text-red-600 font-bold">100% (Strictly Non-refundable)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-2xl font-bold font-display text-slate-900 mt-10 mb-4 pb-2 border-b border-slate-100">
              3. Flights, Cruises, and Third-Party Supplier Policies
            </h2>
            <ul className="list-disc pl-6 space-y-3 mb-8 editorial-text leading-relaxed">
              <li><strong>Domestic and International Airline Tickets:</strong> Issued flight tickets are subject to the specific fare rules and cancellation penalty levied directly by the operating airline, plus applicable airline ticketing facilitation fees.</li>
              <li><strong>Luxury Ocean &amp; River Cruises:</strong> Cabins booked on Disney Cruise Line, Royal Caribbean, Norwegian Cruise Line, or regional liners adhere strictly to the cruise operator&apos;s contractual cancellation timeline. Non-refundable cruise deposits cannot be refunded.</li>
              <li><strong>Peak Season / High Demand Bookings:</strong> For festival periods (Christmas, New Year, Diwali, Cherry Blossom, Golden Week), strict zero-refund policies may apply depending on resort contracts.</li>
            </ul>

            <h2 className="text-2xl font-bold font-display text-slate-900 mt-10 mb-4 pb-2 border-b border-slate-100">
              4. Refund Processing &amp; Timeline
            </h2>
            <ul className="list-disc pl-6 space-y-3 mb-8 editorial-text leading-relaxed">
              <li>All approved refund amounts will be processed within <strong>10 to 14 business days</strong> following formal audit and confirmation of vendor waivers.</li>
              <li>Refunds will be credited exclusively back to the original bank account, debit/credit card, or payment gateway used during the initial transaction. Cash refunds are not permitted.</li>
              <li>Bank transaction fees, credit card surcharges, and payment gateway deductions are non-refundable.</li>
            </ul>

            <div className="bg-gradient-to-r from-brand-50 to-slate-50 p-8 rounded-2xl border border-brand-100 mt-12 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="font-bold text-slate-900 font-display text-xl mb-1">Need assistance or have questions?</h3>
                <p className="text-slate-600 text-sm">
                  Our customer support desk is available to assist you with rescheduling, date adjustments, or waiver requests.
                </p>
              </div>
              <a href="mailto:info@explorationtours.com" className="inline-flex items-center justify-center shrink-0 bg-[#045a94] hover:bg-[#03426e] text-white font-bold px-6 py-3 rounded-full text-sm transition-all shadow-md">
                Contact Reservations
              </a>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
