import { prisma } from '@/lib/prisma';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import DestinationsFilter from '@/components/ui/DestinationsFilter';

export const metadata = {
  title: 'Our Destinations | Exploration Tours',
  description: 'Explore our handpicked domestic and international travel destinations.',
};

export const dynamic = 'force-dynamic';

const fallbackDestinations = [
  // Domestic
  { id: 'dest-kerala', slug: 'kerala-gods-own-country', name: 'Kerala', region: 'domestic', country: 'India', shortDesc: 'Tranquil emerald backwaters, misty tea plantations of Munnar, and serene Ayurvedic sanctuaries.', heroImage: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1080', _count: { packages: 4 } },
  { id: 'dest-rajasthan', slug: 'rajasthan-royal-heritage', name: 'Rajasthan', region: 'domestic', country: 'India', shortDesc: 'Imperial palaces of Jaipur, romantic lake pavilions of Udaipur, and starlit golden dunes of Jaisalmer.', heroImage: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=1080', _count: { packages: 5 } },
  { id: 'dest-kashmir', slug: 'kashmir-paradise-on-earth', name: 'Kashmir', region: 'domestic', country: 'India', shortDesc: 'Snow-capped peaks, shikara cruises across Dal Lake, and blooming meadows of Gulmarg and Pahalgam.', heroImage: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?q=80&w=1080', _count: { packages: 3 } },
  { id: 'dest-northeast', slug: 'north-east-seven-sisters', name: 'North East', region: 'domestic', country: 'India', shortDesc: 'Living root bridges of Meghalaya, serene monasteries of Sikkim, and rich tribal heritage of Nagaland.', heroImage: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?q=80&w=1080', _count: { packages: 2 } },
  { id: 'dest-himalayan', slug: 'himalayan-hill-retreat', name: 'Himalayan Hill Retreat', region: 'domestic', country: 'India', shortDesc: 'Peaceful colonial hideaways, cedar forests, and panoramic Himalayan vistas across Shimla, Manali & Mussoorie.', heroImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1080', _count: { packages: 3 } },
  { id: 'dest-southindia', slug: 'south-india-nature-trail', name: 'South India Nature', region: 'domestic', country: 'India', shortDesc: 'Dense rainforests of Wayanad, coffee plantations of Coorg, and the lush wildlife sanctuaries of the Western Ghats.', heroImage: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1080', _count: { packages: 3 } },

  // Asia & The Far East
  { id: 'dest-japan', slug: 'japan-tokyo-kyoto', name: 'Japan', region: 'international', country: 'Japan', shortDesc: 'Timeless Kyoto shrines, neon-lit Tokyo avenues, bullet trains, and breathtaking views of Mount Fuji.', heroImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1080', _count: { packages: 4 } },
  { id: 'dest-korea', slug: 'south-korea-seoul-jeju', name: 'South Korea', region: 'international', country: 'South Korea', shortDesc: 'Historic Joseon dynasty palaces, vibrant Seoul street culture, and volcanic natural wonders of Jeju Island.', heroImage: 'https://images.unsplash.com/photo-1538485399081-7191377e8241?q=80&w=1080', _count: { packages: 3 } },
  { id: 'dest-vietnam', slug: 'vietnam-ha-long-bay', name: 'Vietnam', region: 'international', country: 'Vietnam', shortDesc: 'Limestone karsts of Ha Long Bay, lantern-lit streets of Hoi An, and the vibrant heritage of Hanoi.', heroImage: 'https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=1080', _count: { packages: 4 } },
  { id: 'dest-singapore', slug: 'singapore-urban-oasis', name: 'Singapore', region: 'international', country: 'Singapore', shortDesc: 'Futuristic Gardens by the Bay, world-renowned shopping on Orchard Road, and luxury marina lifestyle.', heroImage: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=1080', _count: { packages: 3 } },
  { id: 'dest-indonesia', slug: 'indonesia-bali-escapes', name: 'Indonesia', region: 'international', country: 'Indonesia', shortDesc: 'Sacred water temples, lush terraced hillsides of Ubud, and luxurious cliffside beach clubs in Bali.', heroImage: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1080', _count: { packages: 5 } },
  { id: 'dest-philippines', slug: 'philippines-palawan-boracay', name: 'Philippines', region: 'international', country: 'Philippines', shortDesc: 'Crystal-clear turquoise lagoons of El Nido, powdery white beaches of Boracay, and tropical reef diving.', heroImage: 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?q=80&w=1080', _count: { packages: 2 } },

  // Europe
  { id: 'dest-switzerland', slug: 'switzerland-alps-lakes', name: 'Switzerland', region: 'international', country: 'Switzerland', shortDesc: 'Iconic Glacier Express journeys, the majestic Matterhorn, and crystal-clear lakes of Lucerne & Geneva.', heroImage: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=1080', _count: { packages: 5 } },
  { id: 'dest-france', slug: 'france-paris-riviera', name: 'France', region: 'international', country: 'France', shortDesc: 'The romantic streets of Paris, sun-drenched vineyards of Bordeaux, and glamour of the French Riviera.', heroImage: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1080', _count: { packages: 4 } },
  { id: 'dest-greece', slug: 'greece-santorini-athens', name: 'Greece', region: 'international', country: 'Greece', shortDesc: 'Whitewashed cliffside villas of Santorini, ancient ruins of Athens, and azure waters of Mykonos.', heroImage: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=1080', _count: { packages: 4 } },
  { id: 'dest-finland', slug: 'finland-lapland-aurora', name: 'Finland', region: 'international', country: 'Finland', shortDesc: 'Magical glass igloo stays under the Northern Lights, reindeer sleigh rides, and pristine Arctic wilderness.', heroImage: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?q=80&w=1080', _count: { packages: 3 } },
  { id: 'dest-norway', slug: 'norway-fjords-adventure', name: 'Norway', region: 'international', country: 'Norway', shortDesc: 'Dramatic Geirangerfjord cliffs, the midnight sun, and scenic coastal voyages past cascading waterfalls.', heroImage: 'https://images.unsplash.com/photo-1507272931001-fc06c17e4f43?q=80&w=1080', _count: { packages: 3 } },
  { id: 'dest-croatia', slug: 'croatia-dubrovnik-coast', name: 'Croatia', region: 'international', country: 'Croatia', shortDesc: 'Historic walled city of Dubrovnik, crystal waterfalls of Plitvice Lakes, and sailing the Adriatic coast.', heroImage: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1080', _count: { packages: 3 } },
];

export default async function DestinationsPage() {
  let destinations: any[] = [];
  try {
    destinations = await prisma.destination.findMany({
      where: { isPublished: true },
      orderBy: { name: 'asc' },
      select: {
        id: true, slug: true, name: true, region: true, country: true, shortDesc: true, heroImage: true,
        _count: { select: { packages: true } }
      }
    });
  } catch (error) {
    console.error('Database connection error in DestinationsPage:', error);
  }

  // Merge with or use fallbacks if DB is empty or disconnected
  const finalDestinations = destinations.length > 0 ? destinations : fallbackDestinations;
  const topSpots = finalDestinations.filter(d => d._count && d._count.packages > 0).slice(0, 4);
  const safeDest = JSON.parse(JSON.stringify(finalDestinations));

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
                  href={`/destinations/${spot.slug}`}
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

          <DestinationsFilter destinations={safeDest} />
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
