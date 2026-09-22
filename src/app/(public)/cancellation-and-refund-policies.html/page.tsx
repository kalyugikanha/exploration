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
            
            <p className="lead text-lg">
              At Exploration Tours, we strive to provide the most transparent and fair booking experience. Below is our standard policy regarding cancellations and refunds.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">1. General Cancellation Rules</h2>
            <ul className="list-disc pl-6 space-y-2 mb-8">
              <li>Cancellations must be made in writing and sent to our official email address.</li>
              <li>The date of receipt of the email will be considered for calculating the cancellation charges.</li>
              <li>No-shows will incur a 100% cancellation fee, and no refunds will be issued.</li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">2. Cancellation Charges</h2>
            <div className="overflow-x-auto mb-8">
              <table className="min-w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-y border-slate-200">
                    <th className="py-4 px-6 font-bold text-slate-900">Days before Departure</th>
                    <th className="py-4 px-6 font-bold text-slate-900">Cancellation Fee</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr><td className="py-4 px-6">45 Days or more</td><td className="py-4 px-6">25% of total tour cost</td></tr>
                  <tr><td className="py-4 px-6">30 - 44 Days</td><td className="py-4 px-6">50% of total tour cost</td></tr>
                  <tr><td className="py-4 px-6">15 - 29 Days</td><td className="py-4 px-6">75% of total tour cost</td></tr>
                  <tr><td className="py-4 px-6">Less than 15 Days</td><td className="py-4 px-6">100% of total tour cost</td></tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">3. Flight and Third-Party Cancellations</h2>
            <ul className="list-disc pl-6 space-y-2 mb-8">
              <li>Flight tickets are subject to the cancellation policy of the respective airline.</li>
              <li>Any non-refundable deposits made to third-party vendors (e.g., luxury cruise lines, specific resorts) will be deducted from your refund.</li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">4. Refund Process</h2>
            <ul className="list-disc pl-6 space-y-2 mb-8">
              <li>Eligible refunds will be processed within 10-15 business days after cancellation confirmation.</li>
              <li>Refunds will be credited to the original mode of payment used during booking.</li>
            </ul>

            <div className="bg-brand-50 p-6 rounded-xl border border-brand-100 mt-12">
              <h3 className="font-bold text-brand-900 mb-2">Need Further Assistance?</h3>
              <p className="text-brand-800 text-sm">
                If you have any questions about our policies, please contact our support team at <a href="mailto:info@explorationtours.com" className="font-bold underline">info@explorationtours.com</a>.
              </p>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
