import { prisma } from '@/lib/prisma';
import Image from 'next/image';
import Link from 'next/link';
import { Anchor, ArrowRight, Clock } from 'lucide-react';

export const metadata = {
  title: 'Luxury Cruises | Exploration Tours',
  description: 'Set sail on an unforgettable journey across the world\'s most beautiful oceans and rivers.',
};

export default async function CruisesPage() {
  const cruises = await prisma.cruise.findMany({
    where: { isPublished: true },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <main className="w-full bg-slate-50 min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-display font-bold text-slate-900 mb-6 relative inline-block">
            Luxury Cruises
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-brand-600 rounded-full"></div>
          </h1>
          <p className="text-lg text-slate-600 font-medium max-w-2xl mx-auto mt-8">
            Experience the ultimate freedom of the open seas. Discover our handpicked selection of premium ocean and river cruises.
          </p>
        </div>

        {/* Cruise Grid */}
        {cruises.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cruises.map(cruise => (
              <Link href={`/cruises/${cruise.slug}`} key={cruise.id} className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-slate-100 flex flex-col">
                <div className="relative h-64 overflow-hidden">
                  <Image src={cruise.heroImage || '/placeholder.jpg'} alt={cruise.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full text-xs font-bold text-brand-700 uppercase tracking-wider flex items-center gap-1">
                    <Anchor className="w-3 h-3" />
                    {cruise.region || 'Worldwide'}
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold font-display text-slate-900 mb-3 group-hover:text-brand-600 transition-colors line-clamp-2">{cruise.title}</h3>
                  <div className="flex items-center gap-2 text-slate-500 text-sm font-medium mb-4">
                    <Clock className="w-4 h-4 text-brand-600" />
                    {cruise.duration || 'Flexible Duration'}
                  </div>
                  <p className="text-slate-600 text-sm line-clamp-3 mb-6 flex-grow leading-relaxed">
                    {cruise.shortDesc}
                  </p>
                  <div className="flex items-center text-brand-600 font-bold text-sm uppercase tracking-wider mt-auto group-hover:translate-x-2 transition-transform">
                    View Itinerary <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center bg-white p-16 rounded-[2rem] shadow-sm border border-slate-100">
            <Anchor className="w-16 h-16 text-slate-200 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-slate-900 mb-2">No cruises available right now</h3>
            <p className="text-slate-500">Check back later for exciting new sailing itineraries.</p>
          </div>
        )}
      </div>
    </main>
  );
}
