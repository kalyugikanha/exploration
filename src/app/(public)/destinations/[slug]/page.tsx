import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { Heart, Facebook, Twitter, Instagram, MapPin, Clock, Sun, Play, MoreHorizontal } from 'lucide-react';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const dest = await prisma.destination.findUnique({ where: { slug: params.slug } });
  if (!dest) return { title: 'Not Found' };
  return { title: `${dest.name} | Exploration Tours`, description: dest.seoDesc || dest.shortDesc };
}

export default async function DestinationDetailPage({ params }: { params: { slug: string } }) {
  const dest = await prisma.destination.findUnique({
    where: { slug: params.slug },
    include: { packages: { where: { isPublished: true } } }
  });

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

          {/* TIMELINE SECTION (Packages/Tours) */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-400 mb-8 uppercase tracking-widest">DAY 1</h2>
            
            <div className="relative border-l-2 border-slate-200 pl-8 pb-12 ml-6">
              {/* Timeline Icon */}
              <div className="absolute -left-[25px] top-0 w-12 h-12 rounded-full bg-[#045a94] text-white flex items-center justify-center shadow-lg border-4 border-white">
                <Sun className="w-5 h-5" />
              </div>
              
              <h3 className="text-2xl font-display font-bold text-slate-900 mb-4 pt-1">Morning</h3>
              <p className="text-slate-500 mb-10 leading-relaxed font-medium">
                Save hours of time on a skip-the-line walking tour of the highlights. With your guide leading the way, toss a coin in the fountain, climb the hills, and people watch at the plazas. You can even check out the sights by Segway!
              </p>

              {/* Package Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {dest.packages.length > 0 ? (
                  dest.packages.map(pkg => (
                    <div key={pkg.id} className="bg-white border border-slate-100 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow flex flex-col group">
                      <Link href={`/packages/${pkg.slug}`} className="relative w-full aspect-[4/3] block overflow-hidden">
                        <Image src={pkg.heroImage || defaultImages[0]} alt={pkg.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                        <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5">
                          <Heart className="w-3.5 h-3.5" /> 4.5k
                        </div>
                      </Link>
                      <div className="p-6 flex flex-col flex-1">
                        <h4 className="font-bold text-[#045a94] text-xl mb-4 group-hover:text-slate-900 transition-colors">{pkg.title}</h4>
                        <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider mb-6 flex-1">
                          <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> Here</span>
                          <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {pkg.duration || '2 - 3 Hours'}</span>
                        </div>
                        <Link href="/contact" className="block w-full text-center bg-[#045a94] text-white font-bold py-3.5 rounded-full hover:bg-[#03426e] transition-colors shadow-lg hover:shadow-[#045a94]/40 mt-auto uppercase tracking-wide text-sm">Get Package</Link>
                      </div>
                    </div>
                  ))
                ) : (
                  // Mock Data if no packages
                  <>
                    <div className="bg-white border border-slate-100 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow flex flex-col group">
                      <div className="relative w-full aspect-[4/3] cursor-pointer overflow-hidden">
                        <Image src={defaultImages[1]} alt="Tour 1" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                        <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5"><Heart className="w-3.5 h-3.5" /> 4.5k</div>
                      </div>
                      <div className="p-6 flex flex-col flex-1">
                        <h4 className="font-bold text-[#045a94] text-xl mb-4 group-hover:text-slate-900 transition-colors">Colosseum, Roman Forum</h4>
                        <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider mb-6 flex-1">
                          <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> Here</span>
                          
                        </div>
                        <Link href="/contact" className="block w-full text-center bg-[#045a94] text-white font-bold py-3.5 rounded-full hover:bg-[#03426e] transition-colors shadow-lg hover:shadow-[#045a94]/40 mt-auto uppercase tracking-wide text-sm">Get Package</Link>
                      </div>
                    </div>
                    <div className="bg-white border border-slate-100 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow flex flex-col group">
                      <div className="relative w-full aspect-[4/3] cursor-pointer overflow-hidden">
                        <Image src={defaultImages[2]} alt="Tour 2" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                        <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5"><Heart className="w-3.5 h-3.5" /> 4.5k</div>
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                          <div className="w-14 h-14 rounded-full border-2 border-white flex items-center justify-center text-white backdrop-blur-md shadow-2xl group-hover:scale-110 transition-transform"><Play className="w-6 h-6 ml-1" /></div>
                        </div>
                      </div>
                      <div className="p-6 flex flex-col flex-1">
                        <h4 className="font-bold text-[#045a94] text-xl mb-4 group-hover:text-slate-900 transition-colors">Segway Tour</h4>
                        <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider mb-6 flex-1">
                          <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> Here</span>
                          
                        </div>
                        <Link href="/contact" className="block w-full text-center bg-[#045a94] text-white font-bold py-3.5 rounded-full hover:bg-[#03426e] transition-colors shadow-lg hover:shadow-[#045a94]/40 mt-auto uppercase tracking-wide text-sm">Get Package</Link>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (SIDEBAR) */}
        <div className="w-full lg:w-[30%] space-y-12">
          
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