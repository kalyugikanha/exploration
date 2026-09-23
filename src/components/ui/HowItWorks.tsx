export default function HowItWorks() {
  const steps = [
    { num: '01', title: 'Tell Us Your Ideas', desc: 'Share your destination, dates, interests and preferences.' },
    { num: '02', title: 'We Design Your Journey', desc: 'Our experts create a personalised itinerary around you.' },
    { num: '03', title: 'Refine & Confirm', desc: 'We fine-tune every detail together until perfect.' },
    { num: '04', title: 'Travel With Confidence', desc: 'We take care of the arrangements while you enjoy your journey.' }
  ];

  return (
    <section className="py-24 bg-white overflow-hidden relative border-t border-slate-100">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-50/50 blur-[120px] rounded-full pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-20" data-aos="fade-up">
          <span className="text-brand-600 font-bold tracking-widest uppercase text-sm mb-3 block">How It Works</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900">Your Journey Starts Here</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-4">
          {steps.map((step, i) => (
            <div key={i} data-aos="fade-up" data-aos-delay={i * 150} className="relative group">
              {/* Connector Line (hidden on mobile/last item) */}
              {i !== steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[60%] w-full h-[2px] bg-slate-100 group-hover:bg-brand-100 transition-colors duration-500"></div>
              )}
              
              <div className="flex flex-col items-center text-center px-4">
                <div className="w-24 h-24 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center mb-6 text-3xl font-display font-bold text-brand-700 group-hover:scale-110 group-hover:bg-brand-600 group-hover:text-white transition-all duration-500 group-hover:border-brand-600 relative z-10 shadow-sm group-hover:shadow-xl group-hover:shadow-brand-600/20">
                  {step.num}
                </div>
                <h3 className="text-xl font-bold mb-3 font-display text-slate-900">{step.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}