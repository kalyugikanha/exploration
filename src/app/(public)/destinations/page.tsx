import Image from 'next/image';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { ArrowRight, Globe, Play, Star, Heart, MapPin, Search } from 'lucide-react';

export const metadata = { title: 'Destinations | Exploration Tours' };

export default async function DestinationsPage() {
  const destinations = await prisma.destination.findMany({
    where: { isPublished: true },
    include: {
      _count: {
        select: { packages: true }
      }
    },
    orderBy: { name: 'asc' }
  });

  const topSpots = destinations.slice(0, 8); // Top 8 for the capsule grid
  const iconicLocations = destinations; // All destinations for the main grid

  return (
    <main className="w-full bg-slate-50 min-h-screen overflow-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-20 px-4 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
        {/* Left Content */}
        <div className="w-full lg:w-1/2" data-aos="fade-right">
          <div className="inline-flex items-center gap-2 bg-brand-50 text-brand-700 px-4 py-2 rounded-full font-bold text-sm uppercase tracking-wider mb-6 shadow-sm border border-brand-100">
            Discover the World! <Globe className="w-4 h-4" />
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-slate-900 leading-[1.1] mb-6">
            Travel the Best <br />
            It's a Big World, <br />
            <span className="text-brand-600">Go Explore!</span> 🚀
          </h1>
          <p className="text-slate-500 text-lg md:text-xl font-light mb-10 max-w-lg leading-relaxed">
            Embark on unforgettable journeys to the most stunning destinations around the globe. Whether you're seeking adventure, relaxation, or cultural experiences, the world is yours to explore.
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <Link href="/contact" className="bg-slate-900 text-white px-8 py-4 rounded-full font-bold hover:bg-brand-600 transition-colors shadow-xl hover:shadow-brand-600/30 flex items-center gap-2 hover:scale-105 duration-300">
              Get Started <ArrowRight className="w-4 h-4" />
            </Link>
            <button className="flex items-center gap-3 text-slate-700 font-bold hover:text-brand-600 transition-colors group">
              <span className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play className="w-4 h-4 text-brand-600 ml-1" />
              </span>
              Watch Demo
            </button>
          </div>
        </div>

        {/* Right Content - Hero Image Composition */}
        <div className="w-full lg:w-1/2 relative" data-aos="fade-left" data-aos-delay="200">
          <div className="relative w-full aspect-square max-w-[600px] mx-auto">
            {/* Background Blob/Circle */}
            <div className="absolute inset-4 bg-brand-600 rounded-full opacity-10 blur-3xl animate-pulse-slow"></div>
            <div className="absolute inset-8 bg-gradient-to-tr from-brand-600 to-blue-300 rounded-full shadow-2xl overflow-hidden">
              <Image 
                src="https://images.unsplash.com/photo-1527631505399-be13cfa0181b?q=80&w=1600&auto=format&fit=crop" 
                alt="Traveler exploring" 
                fill 
                className="object-cover object-top scale-110"
                priority
              />
            </div>
            
            {/* Floating Review Badge */}
            <div className="absolute bottom-10 left-0 bg-white p-4 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] flex items-center gap-4 animate-bounce-slow border border-slate-100 z-10">
              <div className="flex -space-x-3">
                <Image src="https://i.pravatar.cc/150?img=32" alt="User" width={40} height={40} className="rounded-full border-2 border-white shadow-sm" />
                <Image src="https://i.pravatar.cc/150?img=12" alt="User" width={40} height={40} className="rounded-full border-2 border-white shadow-sm" />
                <Image src="https://i.pravatar.cc/150?img=47" alt="User" width={40} height={40} className="rounded-full border-2 border-white shadow-sm" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800">Our Happy Customers</p>
                <div className="flex items-center gap-1 text-xs font-bold text-slate-500">
                  <Star className="w-3 h-3 text-amber-400 fill-amber-400" /> 4.9 <span className="font-normal">(10.2k Reviews)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. LOGOS BANNER */}
      <section className="border-y border-slate-200 bg-white py-10" data-aos="fade-up">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-center gap-10 md:gap-20 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
          <div className="text-2xl font-display font-bold">tripadvisor</div>
          <div className="text-2xl font-display font-bold">Expedia</div>
          <div className="text-2xl font-display font-bold">airbnb</div>
          <div className="text-2xl font-display font-bold font-serif italic">ORBITZ</div>
          <div className="text-2xl font-display font-bold">Booking.com</div>
        </div>
      </section>

      {/* 3. TOP SEARCHED SPOTS */}
      <section className="py-24 bg-slate-50 relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-4">
              Explore Top Searched Spots 🔥
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              Uncover the top travel destinations that are trending right now. These popular spots offer something for every traveler, from adventure to relaxation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {topSpots.map((spot, idx) => (
              <Link 
                key={spot.id} 
                href={`/destinations/${spot.slug}`}
                className="bg-white rounded-2xl p-4 flex items-center justify-between border border-slate-100 shadow-sm hover:shadow-xl hover:border-brand-200 transition-all group"
                data-aos="zoom-in"
                data-aos-delay={idx * 50}
              >
                <div className="flex items-center gap-4">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden shrink-0">
                    <Image src={spot.heroImage || 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=400&auto=format&fit=crop'} alt={spot.name} fill className="object-cover group-hover:scale-125 transition-transform duration-700" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 group-hover:text-brand-600 transition-colors">{spot.name}</h4>
                    <p className="text-xs font-medium text-slate-400">{spot._count.packages} Tours Available</p>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-brand-50 group-hover:text-brand-600 transition-colors text-slate-400">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. ICONIC LOCATIONS GRID */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-4">
              Explore Iconic Locations ✈️
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              Discover the world's top destinations that promise unforgettable experiences. From scenic wonders to cultural hotspots, these places are waiting for you to explore.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {iconicLocations.map((dest, idx) => (
              <div 
                key={dest.id} 
                className="bg-white rounded-[2rem] p-4 border border-slate-100 shadow-[0_10px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(4,90,148,0.08)] transition-all duration-500 group flex flex-col"
                data-aos="fade-up"
                data-aos-delay={idx * 100}
              >
                {/* Image Area */}
                <div className="relative w-full aspect-[4/3] rounded-[1.5rem] overflow-hidden mb-6">
                  <Image src={dest.heroImage || 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=800&auto=format&fit=crop'} alt={dest.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                  
                  {/* Rating Badge Overlay */}
                  <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-md border border-white/40 text-white px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs font-bold">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" /> 5.0
                  </div>

                  {/* Heart Icon Overlay */}
                  <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white hover:bg-white hover:text-red-500 transition-colors">
                    <Heart className="w-5 h-5" />
                  </button>
                </div>

                {/* Content Area */}
                <div className="px-2 flex-1 flex flex-col">
                  <h3 className="text-2xl font-display font-bold text-slate-900 mb-2 group-hover:text-brand-600 transition-colors">
                    {dest.name}
                  </h3>
                  <p className="text-slate-500 text-sm line-clamp-2 leading-relaxed mb-6 flex-1">
                    {dest.shortDesc || `Escape to ${dest.name} for crystal-clear waters, luxurious resorts, and unparalleled relaxation.`}
                  </p>
                  
                  {/* Footer Area */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
                    <div>
                      <span className="text-slate-400 text-xs block mb-0.5">Starting from</span>
                      <div className="text-xl font-bold text-slate-900">$360 <span className="text-xs font-normal text-slate-400">/ person</span></div>
                    </div>
                    <Link href={`/destinations/${dest.slug}`} className="bg-slate-900 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-brand-600 transition-colors shadow-md group-hover:shadow-brand-600/30">
                      See More
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FAQ SECTION */}
      <section className="py-24 bg-slate-50 border-t border-slate-200" data-aos="fade-up">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-brand-600 font-display italic text-2xl mb-2 block">Got Questions?</span>
            <h2 className="text-4xl font-display font-bold text-slate-900">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-6">
            {[
              { q: 'How do I choose the best destination for my trip?', a: 'Our expert travel consultants can help you select a destination based on your preferences, budget, and travel dates. Reach out to us for a free consultation.' },
              { q: 'Are your tours customizable?', a: 'Absolutely! All our itineraries can be fully customized to match your exact interests, whether you want more relaxation, adventure, or cultural immersion.' },
              { q: 'Do you assist with visas and flights?', a: 'Yes, we provide end-to-end travel solutions, including flight bookings and visa assistance for most international destinations.' }
            ].map((faq, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <h4 className="font-bold text-slate-900 text-lg mb-2 flex items-start gap-3">
                  <span className="text-brand-600">Q.</span> {faq.q}
                </h4>
                <p className="text-slate-600 pl-7">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CTA SECTION */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-brand-900 z-0"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 z-0"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center" data-aos="zoom-in">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">Ready for your dream trip?</h2>
          <p className="text-brand-100 text-lg md:text-xl mb-10 font-light max-w-2xl mx-auto">
            Contact our travel experts today and let us craft a personalized itinerary just for you. Your adventure awaits!
          </p>
          <Link href="/contact" className="inline-flex items-center gap-3 bg-white text-brand-700 px-10 py-4 rounded-xl font-bold uppercase tracking-wide hover:bg-brand-50 hover:scale-105 transition-all shadow-xl">
            Talk To An Expert <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

    </main>
  );
}