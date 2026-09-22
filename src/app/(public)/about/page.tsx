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
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
              Founded on the principle that every journey should be as unique as the traveler, Exploration Tours curates deeply personalized trips around the globe.
            </p>
            <p className="text-lg text-slate-600 leading-relaxed">
              From exclusive access to remote destinations, to luxury cruises that sail the world's most pristine waters, we handle every detail so you can focus on making memories.
            </p>
          </div>
          <div className="relative h-[500px] rounded-[2rem] overflow-hidden shadow-xl" data-aos="fade-left">
            <Image src="https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?q=80&w=800&auto=format&fit=crop" alt="Traveler" fill className="object-cover" />
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