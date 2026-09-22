import { prisma } from '@/lib/prisma';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import DestinationsFilter from '@/components/ui/DestinationsFilter';

export const metadata = {
  title: 'Our Destinations | Exploration Tours',
  description: 'Explore our handpicked domestic and international travel destinations.',
};

export default async function DestinationsPage() {
  const destinations = await prisma.destination.findMany({
    where: { isPublished: true },
    orderBy: { name: 'asc' },
    select: {
      id: true, slug: true, name: true, region: true, shortDesc: true, heroImage: true,
      _count: { select: { packages: true } }
    }
  });

  const topSpots = destinations.filter(d => d._count.packages > 0).slice(0, 4);

  return (
    <main className="w-full bg-slate-50 min-h-screen">
      
      {/* 1. HERO SECTION */}
      <section className="relative w-full h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1488085061387-422e29b40080?q=80&w=2000&auto=format&fit=crop" alt="Destinations" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-slate-900/50"></div>
        <div className="relative z-10 text-center px-4" data-aos="fade-up">
          <span className="text-white font-display italic text-2xl mb-4 block">Where to next?</span>
          <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6">Our Destinations</h1>
          <p className="text-lg text-slate-200 max-w-2xl mx-auto font-medium">
            From the serene beaches of Maldives to the majestic mountains of Switzerland, find your perfect escape.
          </p>
        </div>
      </section>

      {/* 2. TOP SPOTS GRID */}
      {topSpots.length > 0 && (
        <section className="py-16 bg-slate-50 -mt-24 relative z-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {topSpots.map((spot, idx) => (
                <Link 
                  key={spot.id} 
                  href={/destinations/}
                  className="bg-white rounded-2xl p-4 flex items-center justify-between border border-slate-100 shadow-sm hover:shadow-xl hover:border-brand-200 transition-all group"
                  data-aos="zoom-in"
                  data-aos-delay={idx * 50}
                >
                  <div className="flex items-center gap-4">
                    <div className="relative w-14 h-14 rounded-full overflow-hidden shrink-0">
                      <Image src={spot.heroImage || '/placeholder.jpg'} alt={spot.name} fill className="object-cover group-hover:scale-125 transition-transform duration-700" />
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
      )}

      {/* 3. ALL DESTINATIONS & FILTER */}
      <section className="py-24 bg-slate-50 relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-4">
              Explore All Locations ✨
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              Discover the world's top destinations that promise unforgettable experiences.
            </p>
          </div>

          <DestinationsFilter destinations={destinations} />
        </div>
      </section>

      {/* 4. CTA SECTION */}
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
