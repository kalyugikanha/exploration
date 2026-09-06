import Image from 'next/image';
import Link from 'next/link';
import { ShieldCheck, Users, Trophy, Compass, MapPin, Heart, ArrowRight } from 'lucide-react';

export default function AboutPage() {
  return (
    <main className="w-full">
      {/* HERO SECTION */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <Image 
          src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1920&auto=format&fit=crop" 
          alt="About Exploration Tours" 
          fill 
          className="object-cover" 
          priority 
        />
        <div className="absolute inset-0 bg-slate-900/50"></div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-20">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6 drop-shadow-lg">
            About Exploration Tours
          </h1>
          <p className="text-lg md:text-xl text-slate-200 font-light drop-shadow-md">
            Over 21 years of crafting unforgettable bespoke journeys and connecting travelers with the world's most exotic destinations.
          </p>
        </div>
      </section>

      {/* INTRODUCTION / 21 YEARS */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-16">
          <div className="w-full md:w-1/2 relative">
            <div className="relative w-full aspect-square rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(4,90,148,0.15)] z-10">
              <Image src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1600&auto=format&fit=crop" alt="Our Team" fill className="object-cover" />
            </div>
            <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-brand-600 rounded-full flex flex-col items-center justify-center text-white shadow-xl z-20 animate-float border-4 border-white">
              <span className="text-5xl font-display font-bold mb-1">21+</span>
              <span className="text-sm font-medium uppercase tracking-wider text-brand-50">Years Exp.</span>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <span className="text-brand-600 font-display italic text-2xl mb-4 block">Who We Are</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-6 leading-tight">
              A Legacy of Unforgettable Travel Experiences
            </h2>
            <p className="text-slate-600 mb-6 text-lg leading-relaxed font-light">
              Founded on a passion for discovery and a commitment to excellence, Exploration Tours has been a pioneer in the luxury travel industry for over two decades. We believe that travel is not just about visiting a place, but about experiencing its soul.
            </p>
            <p className="text-slate-600 mb-10 leading-relaxed">
              Our expert travel designers handcraft every itinerary, ensuring that each journey is as unique as the traveler embarking upon it. From the secluded beaches of the Maldives to the rich cultural tapestry of Kyoto, we provide seamless, end-to-end travel solutions that leave you with nothing but breathtaking memories.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-brand-50 flex items-center justify-center text-brand-600 shrink-0">
                  <Globe2Icon className="w-6 h-6" />
                </div>
                <div className="font-bold text-slate-900">Global Reach</div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-brand-50 flex items-center justify-center text-brand-600 shrink-0">
                  <StarIcon className="w-6 h-6" />
                </div>
                <div className="font-bold text-slate-900">5-Star Service</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VISION & MISSION */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="bg-white p-12 rounded-[2rem] shadow-[0_10px_30px_rgba(0,0,0,0.03)] border border-slate-100 hover:shadow-[0_20px_40px_rgba(4,90,148,0.08)] transition-all duration-500">
            <Compass className="w-12 h-12 text-brand-600 mb-6" />
            <h3 className="text-3xl font-display font-bold text-slate-900 mb-4">Our Vision</h3>
            <p className="text-slate-600 leading-relaxed font-light text-lg">
              To be the world's most trusted and innovative luxury travel partner, inspiring people to explore the extraordinary and fostering a deeper understanding of diverse cultures across the globe.
            </p>
          </div>
          <div className="bg-brand-900 p-12 rounded-[2rem] shadow-[0_10px_30px_rgba(0,0,0,0.1)] text-white hover:-translate-y-2 transition-transform duration-500 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-800 rounded-full blur-3xl opacity-50 -mr-20 -mt-20 pointer-events-none"></div>
            <MapPin className="w-12 h-12 text-brand-300 mb-6 relative z-10" />
            <h3 className="text-3xl font-display font-bold mb-4 relative z-10">Our Mission</h3>
            <p className="text-brand-100 leading-relaxed font-light text-lg relative z-10">
              To craft personalized, meticulously planned travel experiences that exceed our clients' expectations. We strive for excellence in service, sustainability in our practices, and unparalleled authenticity in every destination we offer.
            </p>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-brand-600 font-display italic text-2xl mb-2 block">Our Advantages</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900">Why Customers Choose Us</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: ShieldCheck, title: 'Trusted Security', desc: 'Your safety and investment are fully protected with our certified travel partners.' },
              { icon: Users, title: 'Expert Guides', desc: 'Travel with seasoned locals and experts who bring destinations to life.' },
              { icon: Trophy, title: 'Award Winning', desc: 'Recognized globally for our exceptional service and bespoke luxury itineraries.' },
              { icon: Heart, title: 'Personalized Care', desc: '24/7 dedicated support ensuring a flawless experience from start to finish.' },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center p-8 rounded-2xl hover:bg-slate-50 transition-colors group">
                <div className="w-16 h-16 rounded-full bg-brand-50 flex items-center justify-center text-brand-600 mb-6 group-hover:scale-110 group-hover:bg-brand-600 group-hover:text-white transition-all duration-300">
                  <item.icon className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-slate-900 text-xl mb-3">{item.title}</h4>
                <p className="text-slate-500 leading-relaxed text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-brand-900 z-0"></div>
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] z-0"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">Ready to Start Your Journey?</h2>
          <p className="text-brand-100 text-lg mb-10 max-w-2xl mx-auto font-light">
            Contact our travel experts today to begin planning your next unforgettable adventure. We'll handle the details; you just pack your bags.
          </p>
          <Link href="/contact" className="inline-flex items-center gap-3 bg-white text-brand-700 px-10 py-4 rounded-xl font-bold uppercase tracking-wide hover:bg-brand-50 hover:scale-105 transition-all shadow-xl">
            Enquire Now <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </main>
  );
}

function Globe2Icon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
  )
}
function StarIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
  )
}