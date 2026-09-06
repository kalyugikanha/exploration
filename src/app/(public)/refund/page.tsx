export const metadata = { title: 'Refund & Cancellation | Exploration Tours' };

export default function RefundPolicy() {
  return (
    <main className="w-full bg-slate-50 min-h-screen py-32 px-4">
      <div className="max-w-4xl mx-auto bg-white p-10 md:p-16 rounded-[2rem] shadow-sm border border-slate-100">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-8">Cancellation & Refund Policy</h1>
        <div className="prose prose-slate max-w-none">
          <p>We understand that travel plans can change. Please review our cancellation and refund policy below.</p>
          <h3>1. Cancellation by You</h3>
          <p>Cancellations must be made in writing. The following cancellation fees typically apply (unless specified otherwise in your package):</p>
          <ul>
            <li>More than 60 days before departure: Loss of deposit.</li>
            <li>30-59 days before departure: 50% of total tour cost.</li>
            <li>Less than 30 days before departure: 100% of total tour cost.</li>
          </ul>
          <h3>2. Cancellation by Us</h3>
          <p>If we cancel a tour prior to departure, you will receive a full refund of all payments made to Exploration Tours.</p>
          <h3>3. Refunds</h3>
          <p>Eligible refunds will be processed within 14-21 business days back to the original method of payment.</p>
        </div>
      </div>
    </main>
  );
}