import { prisma } from '@/lib/prisma';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Frequently Asked Questions | Exploration Tours',
  description: 'Find answers to common questions about booking, travel arrangements, and our bespoke tour packages.',
};

export default async function FaqsPage() {
  const faqs = await prisma.faq.findMany({
    where: { isActive: true },
    orderBy: { order: 'asc' },
  });

  return (
    <main className="min-h-screen bg-slate-50 pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-display font-bold text-slate-900 mb-6">Frequently Asked Questions</h1>
          <p className="text-lg text-slate-600 font-medium max-w-2xl mx-auto">
            Find answers to common questions about our services, booking process, and travel experiences.
          </p>
        </div>

        {faqs.length > 0 ? (
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details key={faq.id} className="group bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex items-center justify-between p-6 cursor-pointer select-none">
                  <h3 className="text-lg font-bold text-slate-900 pr-4">{faq.question}</h3>
                  <div className="w-8 h-8 rounded-full bg-brand-50 text-brand-700 flex items-center justify-center shrink-0 group-open:-rotate-180 transition-transform duration-300">
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </summary>
                <div className="px-6 pb-6 text-slate-600 font-medium whitespace-pre-wrap leading-relaxed border-t border-slate-50 pt-4">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        ) : (
          <div className="text-center bg-white p-12 rounded-3xl shadow-sm border border-slate-100">
            <p className="text-slate-500 font-medium text-lg">Check back later for updated FAQs.</p>
          </div>
        )}

        <div className="mt-16 text-center bg-brand-700 rounded-3xl p-12 text-white shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2000&auto=format&fit=crop')] opacity-10 bg-cover bg-center"></div>
          <div className="relative z-10">
            <h2 className="text-3xl font-display font-bold mb-4">Still have questions?</h2>
            <p className="text-brand-100 mb-8 font-medium max-w-xl mx-auto">Our travel experts are ready to assist you in planning your perfect journey. Don't hesitate to reach out.</p>
            <Link href="/contact" className="inline-block bg-white text-brand-900 font-bold px-8 py-4 rounded-xl hover:bg-brand-50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              Contact Us Today
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
