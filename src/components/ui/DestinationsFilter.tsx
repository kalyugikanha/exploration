'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, Heart, ArrowRight } from 'lucide-react';

type Destination = {
  id: string;
  slug: string;
  name: string;
  region: string;
  shortDesc: string | null;
  heroImage: string | null;
};

export default function DestinationsFilter({ destinations }: { destinations: Destination[] }) {
  const [filter, setFilter] = useState<'all' | 'domestic' | 'international'>('all');

  const filtered = destinations.filter(d => {
    if (filter === 'all') return true;
    return d.region.toLowerCase() === filter;
  });

  return (
    <div>
      <div className="flex justify-center mb-12">
        <div className="inline-flex bg-white p-1 rounded-xl shadow-sm border border-slate-100">
          <button 
            onClick={() => setFilter('all')} 
            className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${filter === 'all' ? 'bg-brand-600 text-white shadow-md' : 'text-slate-600 hover:text-brand-600 hover:bg-slate-50'}`}
          >
            All Destinations
          </button>
          <button 
            onClick={() => setFilter('domestic')} 
            className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${filter === 'domestic' ? 'bg-brand-600 text-white shadow-md' : 'text-slate-600 hover:text-brand-600 hover:bg-slate-50'}`}
          >
            Domestic
          </button>
          <button 
            onClick={() => setFilter('international')} 
            className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${filter === 'international' ? 'bg-brand-600 text-white shadow-md' : 'text-slate-600 hover:text-brand-600 hover:bg-slate-50'}`}
          >
            International
          </button>
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((dest, idx) => (
            <div 
              key={dest.id} 
              className="bg-white rounded-[2rem] p-4 border border-slate-100 shadow-[0_10px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(4,90,148,0.08)] transition-all duration-500 group flex flex-col"
            >
              <div className="relative w-full aspect-[4/3] rounded-[1.5rem] overflow-hidden mb-6">
                <Image src={dest.heroImage || '/placeholder.jpg'} alt={dest.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-md border border-white/40 text-white px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider">
                  {dest.region}
                </div>
              </div>

              <div className="px-2 flex-1 flex flex-col">
                <h3 className="text-2xl font-display font-bold text-slate-900 mb-2 group-hover:text-brand-600 transition-colors">
                  {dest.name}
                </h3>
                <p className="text-slate-500 text-sm line-clamp-2 leading-relaxed mb-6 flex-1">
                  {dest.shortDesc || `Escape to ${dest.name} for an unforgettable journey.`}
                </p>
                
                <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
                  <div className="flex items-center gap-2 text-amber-500 font-bold text-sm">
                    <Star className="w-4 h-4 fill-current" /> 5.0
                  </div>
                  <Link href={`/destinations/${dest.slug}`} className="bg-slate-900 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-brand-600 transition-colors shadow-md group-hover:shadow-brand-600/30">
                    Explore Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-white rounded-3xl border border-slate-100">
          <h3 className="text-2xl font-bold text-slate-900 mb-2">No destinations found</h3>
          <p className="text-slate-500">Try changing your filters.</p>
        </div>
      )}
    </div>
  );
}
