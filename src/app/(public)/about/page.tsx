import Image from 'next/image';
import { Compass, Users, Globe2, ShieldCheck } from 'lucide-react';

export const metadata = { title: 'About Us | Exploration Tours' };

export default function AboutPage() {
  return (
    <main className="w-full bg-slate-50 min-h-screen">
      
      {/* Hero Section */}
      <section className="relative w-full h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2000&auto=format&fit=crop" alt="Our Team" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-slate-900/60"></div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto" data-aos="fade-up">
          <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6">Our Story</h1>
          <p className="text-xl text-slate-200 font-medium">
            Redefining luxury travel with curated experiences and unparalleled service.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div data-aos="fade-right">
            <h2 className="text-4xl font-display font-bold text-slate-900 mb-6">We believe travel is a personal experience, not a mass-produced product.</h2>
            <p className="text-lg text-slate-600 mb-6 leading-relaxed editorial-text">
              Founded on the principle that every journey should be as unique as the traveler, Exploration Tours curates deeply personalized trips around the globe.
            </p>
            <p className="text-lg text-slate-600 leading-relaxed editorial-text">
              From exclusive access to remote destinations, to luxury cruises that sail the world&apos;s most pristine waters, we handle every detail so you can focus on making memories.
            </p>
          </div>
          <div className="relative h-[500px] rounded-[2rem] overflow-hidden shadow-xl" data-aos="fade-left">
            <Image src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1200&auto=format&fit=crop" alt="Luxury Travel Experiences" fill className="object-cover" />
          </div>
        </div>
      </section>

      {/* THE FOUNDER'S CUT SECTION */}
      <section className="py-24 bg-gradient-to-b from-slate-900 to-[#022238] text-white relative overflow-hidden">
        {/* Subtle decorative background circles */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#045a94]/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left: Founder Portrait & Credentials (Span 5) */}
            <div className="lg:col-span-5" data-aos="fade-right">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white/10 group">
                  <Image 
                    src="/images/founder-nitin-mathur.jpg" 
                    alt="Nitin Mathur - Founder & Managing Director, Exploration Tours" 
                    fill 
                    priority
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                  
                  {/* Founder Badge Overlay */}
                  <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
                    <p className="text-xs uppercase tracking-widest text-brand-300 font-bold mb-1">Exploration Tours Leadership</p>
                    <h3 className="text-2xl font-display font-bold text-white">Nitin Mathur</h3>
                    <p className="text-sm text-slate-300 mt-1 font-medium">Founder &amp; Managing Director</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: The Founder's Letter & Narrative (Span 7) */}
            <div className="lg:col-span-7" data-aos="fade-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-500/20 text-brand-300 border border-brand-400/30 text-xs font-bold uppercase tracking-widest mb-6">
                <span>The Founder&apos;s Cut</span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-8 leading-tight">
                &ldquo;Travel is not merely an itinerary; it is the art of unhurried wonder.&rdquo;
              </h2>

              <div className="space-y-6 text-slate-300 text-base md:text-lg editorial-text leading-relaxed font-light">
                <p>
                  When I founded <strong className="text-white font-semibold">Exploration Tours</strong>, it was born out of a deep personal realization: modern tourism had become rushed, transactional, and overly standardized. Travelers were being led through checklist destinations without the space to breathe, connect, and genuinely feel the pulse of the places they visited.
                </p>
                <p>
                  To us, genuine luxury has nothing to do with ostentation. It is the privilege of time, privacy, and thoughtful curation. It is having a private tea tasting amidst the misty rolling hills of Munnar, taking a scenic train past snow-capped Swiss peaks with loved ones, or sailing on an ocean liner where every sunset feels reserved just for you.
                </p>
                <p>
                  Every journey we craft begins with a conversation about you—your rhythm, your passions, and the memories you hope to bring home. Our dedicated team and global partners ensure that from the moment you leave your front door until you return, every detail is seamlessly orchestrated.
                </p>
              </div>

              {/* Founder Quote Card & Signoff */}
              <div className="mt-10 pt-8 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                  <h4 className="text-xl font-display font-bold text-white">Nitin Mathur</h4>
                  <p className="text-sm text-brand-300 font-medium">Founder &amp; Managing Director</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="px-5 py-2.5 rounded-full bg-white/5 border border-white/15 text-xs text-slate-300 font-mono tracking-wider">
                    EST. JAIPUR &bull; SERVING GLOBALLY
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-slate-900 mb-4">Why Choose Us</h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg">The pillars of our service that guarantee an exceptional journey.</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: Compass, title: 'Expert Guidance', desc: 'Our travel experts have first-hand experience in the destinations we offer.' },
              { icon: Globe2, title: 'Global Network', desc: 'Strong partnerships with elite hotels, airlines, and cruise lines worldwide.' },
              { icon: ShieldCheck, title: 'Total Security', desc: '24/7 on-ground support and comprehensive travel protection.' },
              { icon: Users, title: 'Personalized Service', desc: 'Every itinerary is customized to match your exact pace and passions.' }
            ].map((v, i) => (
              <div key={i} className="bg-slate-50 p-8 rounded-2xl text-center border border-slate-100 hover:shadow-lg hover:border-brand-100 transition-all">
                <div className="w-16 h-16 mx-auto bg-brand-50 text-brand-700 rounded-full flex items-center justify-center mb-6">
                  <v.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{v.title}</h3>
                <p className="text-slate-600">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}