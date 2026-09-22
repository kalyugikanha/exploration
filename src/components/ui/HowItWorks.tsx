export default function HowItWorks() {
  const steps = [
    { num: '01', title: 'Tell Us Your Ideas', desc: 'Share your destination, dates, interests and preferences.' },
    { num: '02', title: 'We Design Your Journey', desc: 'Our experts create a personalised itinerary around you.' },
    { num: '03', title: 'Refine & Confirm', desc: 'We fine-tune every detail together until perfect.' },
    { num: '04', title: 'Travel With Confidence', desc: 'We take care of the arrangements while you enjoy your journey.' }
  ];

  return (
    <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[#045a94]/10 blur-[120px] rounded-full pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16" data-aos="fade-up">
          <span className="text-blue-400 font-bold tracking-widest uppercase text-sm mb-2 block">How It Works</span>
          <h2 className="text-3xl md:text-5xl font-display font-bold">Your Journey Starts Here</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
          {steps.map((step, i) => (
            <div key={i} data-aos="fade-up" data-aos-delay={i * 150} className="relative group">
              {/* Connector Line (hidden on mobile/last item) */}
              {i !== steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-1/2 w-full h-[1px] bg-gradient-to-r from-brand-600/50 to-transparent"></div>
              )}
              
              <div className="flex flex-col items-center text-center px-4">
                <div className="w-24 h-24 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center mb-6 text-3xl font-display font-bold text-blue-400 group-hover:scale-110 group-hover:bg-[#045a94] group-hover:text-white transition-all duration-500 group-hover:border-[#045a94] relative z-10 shadow-xl">
                  {step.num}
                </div>
                <h3 className="text-xl font-bold mb-3 font-display">{step.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
