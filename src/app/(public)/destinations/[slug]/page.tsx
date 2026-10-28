import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { Heart, Facebook, Twitter, Instagram, MapPin, Clock, Sun, Play, MoreHorizontal, Calendar, Sparkles, Send, Shield } from 'lucide-react';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  try {
    const dest = await prisma.destination.findUnique({ where: { slug: params.slug } });
    if (!dest) return { title: 'Not Found' };
    return { title: `${dest.name} | Exploration Tours`, description: dest.seoDesc || dest.shortDesc };
  } catch (e) {
    return { title: 'Exploration Tours' };
  }
}

export default async function DestinationDetailPage({ params }: { params: { slug: string } }) {
  let dest = null;
  try {
    dest = await prisma.destination.findUnique({
      where: { slug: params.slug },
      include: { packages: { where: { isPublished: true } } }
    });
  } catch (e) {
    console.error('Error fetching destination:', e);
  }

  const fallbackDestinationsMap: Record<string, any> = {
    'kerala-gods-own-country': { name: 'Kerala', country: 'India', region: 'domestic', shortDesc: 'Tranquil emerald backwaters, misty tea plantations of Munnar, and serene Ayurvedic sanctuaries.', heroImage: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1080' },
    'rajasthan-royal-heritage': { name: 'Rajasthan', country: 'India', region: 'domestic', shortDesc: 'Imperial palaces of Jaipur, romantic lake pavilions of Udaipur, and starlit golden dunes of Jaisalmer.', heroImage: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=1080' },
    'kashmir-paradise-on-earth': { name: 'Kashmir', country: 'India', region: 'domestic', shortDesc: 'Snow-capped peaks, shikara cruises across Dal Lake, and blooming meadows of Gulmarg and Pahalgam.', heroImage: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?q=80&w=1080' },
    'north-east-seven-sisters': { name: 'North East', country: 'India', region: 'domestic', shortDesc: 'Living root bridges of Meghalaya, serene monasteries of Sikkim, and rich tribal heritage of Nagaland.', heroImage: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?q=80&w=1080' },
    'himalayan-hill-retreat': { name: 'Himalayan Hill Retreat', country: 'India', region: 'domestic', shortDesc: 'Peaceful colonial hideaways, cedar forests, and panoramic Himalayan vistas across Shimla, Manali & Mussoorie.', heroImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1080' },
    'south-india-nature-trail': { name: 'South India Nature', country: 'India', region: 'domestic', shortDesc: 'Dense rainforests of Wayanad, coffee plantations of Coorg, and the lush wildlife sanctuaries of the Western Ghats.', heroImage: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1080' },
    'japan-tokyo-kyoto': { name: 'Japan', country: 'Japan', region: 'international', shortDesc: 'Timeless Kyoto shrines, neon-lit Tokyo avenues, bullet trains, and breathtaking views of Mount Fuji.', heroImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1080' },
    'south-korea-seoul-jeju': { name: 'South Korea', country: 'South Korea', region: 'international', shortDesc: 'Historic Joseon dynasty palaces, vibrant Seoul street culture, and volcanic natural wonders of Jeju Island.', heroImage: 'https://images.unsplash.com/photo-1538485399081-7191377e8241?q=80&w=1080' },
    'vietnam-ha-long-bay': { name: 'Vietnam', country: 'Vietnam', region: 'international', shortDesc: 'Limestone karsts of Ha Long Bay, lantern-lit streets of Hoi An, and the vibrant heritage of Hanoi.', heroImage: 'https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=1080' },
    'singapore-urban-oasis': { name: 'Singapore', country: 'Singapore', region: 'international', shortDesc: 'Futuristic Gardens by the Bay, world-renowned shopping on Orchard Road, and luxury marina lifestyle.', heroImage: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=1080' },
    'indonesia-bali-escapes': { name: 'Indonesia', country: 'Indonesia', region: 'international', shortDesc: 'Sacred water temples, lush terraced hillsides of Ubud, and luxurious cliffside beach clubs in Bali.', heroImage: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1080' },
    'philippines-palawan-boracay': { name: 'Philippines', country: 'Philippines', region: 'international', shortDesc: 'Crystal-clear turquoise lagoons of El Nido, powdery white beaches of Boracay, and tropical reef diving.', heroImage: 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?q=80&w=1080' },
    'switzerland-alps-lakes': { name: 'Switzerland', country: 'Switzerland', region: 'international', shortDesc: 'Iconic Glacier Express journeys, the majestic Matterhorn, and crystal-clear lakes of Lucerne & Geneva.', heroImage: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=1080' },
    'france-paris-riviera': { name: 'France', country: 'France', region: 'international', shortDesc: 'The romantic streets of Paris, sun-drenched vineyards of Bordeaux, and glamour of the French Riviera.', heroImage: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1080' },
    'greece-santorini-athens': { name: 'Greece', country: 'Greece', region: 'international', shortDesc: 'Whitewashed cliffside villas of Santorini, ancient ruins of Athens, and azure waters of Mykonos.', heroImage: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=1080' },
    'finland-lapland-aurora': { name: 'Finland', country: 'Finland', region: 'international', shortDesc: 'Magical glass igloo stays under the Northern Lights, reindeer sleigh rides, and pristine Arctic wilderness.', heroImage: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?q=80&w=1080' },
    'norway-fjords-adventure': { name: 'Norway', country: 'Norway', region: 'international', shortDesc: 'Dramatic Geirangerfjord cliffs, the midnight sun, and scenic coastal voyages past cascading waterfalls.', heroImage: 'https://images.unsplash.com/photo-1507272931001-fc06c17e4f43?q=80&w=1080' },
    'croatia-dubrovnik-coast': { name: 'Croatia', country: 'Croatia', region: 'international', shortDesc: 'Historic walled city of Dubrovnik, crystal waterfalls of Plitvice Lakes, and sailing the Adriatic coast.', heroImage: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1080' },
    'bali-indonesia': { name: 'Bali', country: 'Indonesia', region: 'international', shortDesc: 'Tropical paradise known for its forested volcanic mountains, iconic rice paddies, and coral reefs.', heroImage: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1080' },
    'switzerland-alps': { name: 'Switzerland', country: 'Switzerland', region: 'international', shortDesc: 'Majestic Alps, crystal clear lakes, and picture-perfect alpine villages.', heroImage: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=1080' },
  };

  if (!dest && fallbackDestinationsMap[params.slug]) {
    const f = fallbackDestinationsMap[params.slug];
    dest = {
      id: `dest-${params.slug}`,
      slug: params.slug,
      name: f.name,
      country: f.country,
      region: f.region,
      shortDesc: f.shortDesc,
      heroImage: f.heroImage,
      content: `<p>Experience the timeless charm, cultural treasures, and extraordinary natural beauty of ${f.name}. Exploration Tours offers bespoke travel planning with private guides, handpicked luxury accommodations, and seamless transfers throughout.</p>`,
      gallery: [f.heroImage, 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=800', 'https://images.unsplash.com/photo-1529154036614-a60975f5c760?q=80&w=800', 'https://images.unsplash.com/photo-1525874684015-58379d421a52?q=80&w=800'],
      whyVisit: `World-renowned hospitality, distinctive local traditions, and unforgettable scenic vistas that make ${f.name} one of the world's most desired destinations.`,
      bestTime: 'October through April',
      packages: [],
      isPublished: true,
    };
  }

  if (!dest || !dest.isPublished) notFound();

  // Fallback images for gallery
  const defaultImages = [
    'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1529154036614-a60975f5c760?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1525874684015-58379d421a52?q=80&w=800&auto=format&fit=crop'
  ];
  
  const g1 = dest.gallery?.[0] || defaultImages[0];
  const g2 = dest.gallery?.[1] || defaultImages[1];
  const g3 = dest.gallery?.[2] || defaultImages[2];
  const g4 = dest.gallery?.[3] || defaultImages[3];

  return (
    <main className="w-full bg-white min-h-screen">
      
      {/* 1. HERO BENTO GALLERY */}
      <section className="w-full h-[60vh] min-h-[500px] flex flex-col md:flex-row pt-[72px]">
        {/* Main Large Image */}
        <div className="w-full md:w-2/3 h-full relative group overflow-hidden">
          <Image src={dest.heroImage || defaultImages[0]} alt={dest.name} fill className="object-cover group-hover:scale-105 transition-transform duration-1000" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none"></div>
          <div className="absolute bottom-10 left-10 right-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-2 leading-tight">
              {dest.name}: <br className="hidden md:block"/> {dest.shortDesc || 'New in Town'}
            </h1>
          </div>
        </div>
        {/* Side Grid Images */}
        <div className="hidden md:grid w-1/3 h-full grid-cols-2 grid-rows-2">
          <div className="relative w-full h-full group overflow-hidden">
            <Image src={g1} alt="Gallery 1" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-14 h-14 rounded-full border-2 border-white flex items-center justify-center text-white backdrop-blur-sm cursor-pointer shadow-lg">
                <Play className="w-6 h-6 ml-1" />
              </div>
            </div>
          </div>
          <div className="relative w-full h-full overflow-hidden group">
            <Image src={g2} alt="Gallery 2" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
          </div>
          <div className="relative w-full h-full overflow-hidden group border-t-4 border-l-4 border-white">
            <Image src={g3} alt="Gallery 3" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
          </div>
          <div className="relative w-full h-full overflow-hidden group border-t-4 border-white">
            <Image src={g4} alt="Gallery 4" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
          </div>
        </div>
      </section>

      {/* 2. MAIN CONTENT LAYOUT */}
      <section className="max-w-7xl mx-auto px-4 py-16 flex flex-col lg:flex-row gap-16">
        
        {/* LEFT COLUMN */}
        <div className="w-full lg:w-[70%]">
          
          {/* Intro Text */}
          <div className="prose prose-lg prose-slate max-w-none text-slate-600 font-medium leading-relaxed mb-8">
            {dest.content ? (
              <div dangerouslySetInnerHTML={{ __html: dest.content }} />
            ) : (
              <p>In the city where ancient artifacts and glorious artworks are hidden around every corner, falling in love with {dest.name} at first sight is practically guaranteed. Sweep past ancient ruins and beautiful fountains. Enjoy local cuisine in elegant plazas and discover glorious architecture.</p>
            )}
          </div>

          {/* Action Bar (Like & Share) */}
          <div className="border-y border-slate-200 py-6 mb-16 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <button className="w-12 h-12 rounded-full bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors shadow-sm">
                <Heart className="w-5 h-5 fill-current" />
              </button>
              <div>
                <p className="text-slate-800 font-bold text-sm">You and 203 other people likes this</p>
                <p className="text-slate-400 text-xs">Notifications: ON</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="w-12 h-12 rounded-full border border-slate-200 text-slate-600 flex items-center justify-center hover:border-[#045a94] hover:text-[#045a94] transition-colors"><Facebook className="w-5 h-5" /></button>
              <button className="w-12 h-12 rounded-full border border-slate-200 text-slate-600 flex items-center justify-center hover:border-[#045a94] hover:text-[#045a94] transition-colors"><Twitter className="w-5 h-5" /></button>
              <button className="w-12 h-12 rounded-full border border-slate-200 text-slate-600 flex items-center justify-center hover:border-[#045a94] hover:text-[#045a94] transition-colors"><Instagram className="w-5 h-5" /></button>
              <button className="w-12 h-12 rounded-full border border-slate-200 text-slate-600 flex items-center justify-center hover:border-[#045a94] hover:text-[#045a94] transition-colors"><MoreHorizontal className="w-5 h-5" /></button>
            </div>
          </div>

          {/* PACKAGES & ITINERARY SECTION */}
          <div className="mb-12">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#045a94] bg-sky-50 px-3 py-1 rounded-full mb-2 inline-block">
                  Curated Experiences
                </span>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-slate-900">
                  Tour Packages for {dest.name}
                </h2>
              </div>
              <Link
                href={`/contact?destination=${encodeURIComponent(dest.name)}`}
                className="self-start sm:self-auto inline-flex items-center gap-2 text-sm font-bold text-[#045a94] hover:text-[#03426e] hover:underline"
              >
                <span>Custom Itinerary Request</span>
                <Send className="w-3.5 h-3.5" />
              </Link>
            </div>

            {dest.packages && dest.packages.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {dest.packages.map((pkg: any) => (
                  <div key={pkg.id} className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group">
                    <Link href={`/packages/${pkg.slug}`} className="relative w-full aspect-[4/3] block overflow-hidden">
                      <Image 
                        src={pkg.heroImage || defaultImages[0]} 
                        alt={pkg.title} 
                        fill 
                        className="object-cover group-hover:scale-110 transition-transform duration-700" 
                      />
                      {pkg.duration && (
                        <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" /> {pkg.duration}
                        </div>
                      )}
                    </Link>
                    <div className="p-6 flex flex-col flex-1">
                      <Link href={`/packages/${pkg.slug}`}>
                        <h4 className="font-bold text-slate-900 text-lg mb-2 group-hover:text-[#045a94] transition-colors leading-tight">
                          {pkg.title}
                        </h4>
                      </Link>
                      <p className="text-slate-500 text-xs line-clamp-2 mb-6 leading-relaxed">
                        {pkg.shortDesc || 'Discover handcrafted day-wise plans designed for memorable exploration.'}
                      </p>
                      
                      <div className="grid grid-cols-2 gap-2 mt-auto">
                        <Link 
                          href={`/packages/${pkg.slug}`} 
                          className="text-center bg-slate-50 text-[#045a94] font-bold py-2.5 rounded-lg hover:bg-[#045a94] hover:text-white transition-colors uppercase tracking-wider text-xs border border-slate-200"
                        >
                          Day-Wise Plan
                        </Link>
                        <Link 
                          href={`/contact?destination=${encodeURIComponent(dest.name)}&package=${encodeURIComponent(pkg.title)}`} 
                          className="text-center bg-[#045a94] text-white font-bold py-2.5 rounded-lg hover:bg-[#03426e] transition-colors uppercase tracking-wider text-xs shadow-sm"
                        >
                          Enquire Now
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-gradient-to-br from-slate-900 to-[#045a94] rounded-3xl p-8 md:p-10 text-white relative overflow-hidden shadow-lg">
                <div className="relative z-10 max-w-2xl">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-brand-300 bg-white/10 px-3 py-1 rounded-full mb-4">
                    <Sparkles className="w-3.5 h-3.5" /> Tailored Private Tours
                  </span>
                  <h3 className="text-2xl md:text-3xl font-display font-bold mb-4 leading-tight">
                    Design a Bespoke Holiday in {dest.name}
                  </h3>
                  <p className="text-slate-200 text-sm md:text-base leading-relaxed mb-8 font-light">
                    Whether you are seeking boutique luxury resorts, private guided cultural walks, or scenic leisure journeys, our destination managers curate complete day-by-day itineraries customized to your dates and preferences.
                  </p>
                  <Link
                    href={`/contact?destination=${encodeURIComponent(dest.name)}`}
                    className="inline-flex items-center gap-2 bg-white text-[#045a94] hover:bg-slate-100 font-bold px-8 py-3.5 rounded-xl shadow-lg transition-transform hover:-translate-y-0.5 text-sm uppercase tracking-wider"
                  >
                    <span>Plan My {dest.name} Journey</span>
                    <Send className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN (SIDEBAR) */}
        <div className="w-full lg:w-[30%] space-y-10">
          
          {/* Quick Destination Enquire CTA Card */}
          <div className="bg-gradient-to-br from-slate-900 to-[#022238] text-white p-7 rounded-2xl shadow-lg border border-slate-800">
            <span className="text-[10px] font-bold uppercase tracking-widest text-brand-300 block mb-2">Tailored Holiday</span>
            <h4 className="text-xl font-display font-bold mb-2">Visit {dest.name}</h4>
            <p className="text-slate-300 text-xs leading-relaxed mb-6 font-light">
              Connect with our destination specialist to plan an exclusive private holiday with verified accommodations and transfers.
            </p>
            <Link
              href={`/contact?destination=${encodeURIComponent(dest.name)}`}
              className="block w-full text-center bg-[#045a94] hover:bg-[#03426e] text-white font-bold py-3.5 rounded-xl transition-all shadow-md text-xs uppercase tracking-wider"
            >
              Enquire About {dest.name}
            </Link>
          </div>

          {/* Map Widget */}
          <div className="rounded-2xl overflow-hidden shadow-md relative w-full aspect-[4/3] border border-slate-200">
            <Image src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=600&auto=format&fit=crop" alt="Map Location" fill className="object-cover opacity-80" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 rounded-full bg-red-500/10 border border-red-500 flex items-center justify-center animate-pulse">
                <div className="bg-red-500 p-2 rounded-full shadow-lg text-white">
                  <MapPin className="w-5 h-5 fill-current" />
                </div>
              </div>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 mt-12 font-bold text-red-500 drop-shadow-md text-sm">{dest.name}</div>
            
            {/* Map Controls */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-px bg-white rounded-md shadow-md overflow-hidden border border-slate-200">
              <button className="w-8 h-8 flex items-center justify-center text-slate-600 hover:bg-slate-100 font-bold text-xl">+</button>
              <div className="w-full h-px bg-slate-200"></div>
              <button className="w-8 h-8 flex items-center justify-center text-slate-600 hover:bg-slate-100 font-bold text-2xl leading-none">-</button>
            </div>
          </div>

          {/* Ask your friends */}
          <div>
            <h3 className="text-xl font-bold text-slate-700 mb-6">Ask your friends who visited</h3>
            <div className="flex flex-wrap gap-3 mb-4">
              {[12,32,45,68,22,17].map(img => (
                <div key={img} className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm cursor-pointer hover:-translate-y-1 transition-transform">
                  <Image src={`https://i.pravatar.cc/150?img=${img}`} alt="Friend" fill className="object-cover" />
                </div>
              ))}
            </div>
            <p className="text-slate-400 text-sm font-medium">Last: 36 days ago</p>
          </div>

          {/* Latest Travel Tips */}
          <div>
            <h3 className="text-xl font-bold text-slate-700 mb-8">Latest Travel Tips</h3>
            
            <div className="relative border-l-2 border-slate-100 ml-5 space-y-10">
              {[
                { name: 'Eva', time: '9 min', img: 44 },
                { name: 'Alma Matthews', time: '20 min', img: 49 }
              ].map((tip, i) => (
                <div key={i} className="relative pl-10">
                  {/* Avatar dot on timeline */}
                  <div className="absolute -left-6 top-0 w-12 h-12 rounded-full overflow-hidden border-4 border-white shadow-md bg-white">
                    <Image src={`https://i.pravatar.cc/150?img=${tip.img}`} alt={tip.name} fill className="object-cover" />
                  </div>
                  
                  <div className="flex items-center justify-between mb-3 pt-1">
                    <h4 className="font-bold text-slate-700 text-lg">{tip.name}</h4>
                    <span className="flex items-center gap-1 text-sm font-bold text-[#045a94]">
                      <MapPin className="w-3.5 h-3.5" /> {tip.time}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 leading-relaxed font-medium">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been.
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}