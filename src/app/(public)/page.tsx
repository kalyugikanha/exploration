import Image from 'next/image';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import TestimonialSection from '@/components/ui/TestimonialSection';
import { Clock, HeartHandshake, ShieldCheck, Globe2, ChevronRight, Star, MapPin, Users, Trophy, Plane, Camera, Ticket, Compass, Map } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const [setting, domesticDests, internationalDests, testimonials, recentBlogs, featuredPackages] = await Promise.all([
    prisma.setting.findUnique({ where: { key: 'page_home' } }),
    prisma.destination.findMany({ where: { region: 'domestic', isPublished: true }, take: 8 }),
    prisma.destination.findMany({ where: { region: 'international', isPublished: true }, take: 8 }),
    prisma.testimonial.findMany({ where: { isActive: true }, take: 10 }),
    prisma.blogPost.findMany({ where: { isPublished: true }, orderBy: { publishedAt: 'desc' }, take: 4 }),
    prisma.package.findMany({ where: { isFeatured: true, isPublished: true }, include: { destination: true }, take: 6 })
  ]);

  const data = setting ? JSON.parse(setting.value) : {
    heroTitle: 'Discover Your Next Great Adventure',
    heroSubtitle: '21 years of crafting unforgettable bespoke travel experiences across the globe.',
    heroImage: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=1920&auto=format&fit=crop',
    heroAlign: 'center',
    heroShowSubtitle: 'on',
    heroShowBtn1: 'on', heroBtn1Text: 'Plan Your Trip', heroBtn1Link: '/contact',
    statsTitle: 'Why Choose Exploration Tours',
    statsYears: '30k+', statsDestinations: '25+', statsTravellers: '5480+',
  };

  const alignClass = data.heroAlign === 'left' ? 'items-start text-left' : data.heroAlign === 'right' ? 'items-end text-right' : 'items-center text-center';

  return (
    <main className="flex min-h-screen flex-col w-full bg-white">
      
      {/* HERO BANNER */}
      <section className="relative w-full h-[100vh] min-h-[700px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src={data.heroImage} alt="Hero Background" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-slate-900/40 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/20 to-white/90"></div>
        </div>
        
        <div className={`relative z-10 w-full max-w-7xl mx-auto px-4 flex flex-col ${alignClass} pt-20`} data-aos="fade-up" data-aos-delay="200">

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white mb-6 drop-shadow-lg max-w-5xl leading-[1.1]">
            {data.heroTitle}
          </h1>
          
          {data.heroShowSubtitle === 'on' && (
            <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-2xl drop-shadow-md font-light leading-relaxed">
              {data.heroSubtitle}
            </p>
          )}
          
          <div className="flex flex-wrap items-center gap-4">
            {data.heroShowBtn1 === 'on' && (
              <Link href={data.heroBtn1Link || '/contact'} className="bg-[#045a94] hover:bg-[#03426e] text-white px-8 py-4 rounded-full font-bold transition-all duration-300 shadow-[0_10px_40px_rgba(4,90,148,0.4)] hover:-translate-y-1 hover:shadow-[0_15px_50px_rgba(4,90,148,0.6)] active:scale-95 hover-shine flex items-center gap-2 overflow-hidden">
                {data.heroBtn1Text || 'Plan Your Trip'} <ChevronRight className="w-5 h-5" />
              </Link>
            )}
            <Link href="/destinations" className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white border border-white/30 px-8 py-4 rounded-full font-bold transition-all duration-300 flex items-center gap-2 hover:-translate-y-1 active:scale-95 hover-shine overflow-hidden">
               <Plane className="w-5 h-5" /> Explore Destinations
            </Link>
          </div>
        </div>
      </section>

      {/* POPULAR DESTINATIONS */}
      <section data-aos="fade-up" className="w-full py-24 bg-white mt-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <span data-aos="fade-up" className="text-[#045a94] font-medium tracking-[0.2em] uppercase text-sm mb-3 block">Top Destinations</span>
            <h2 data-aos="fade-up" data-aos-delay="100" className="text-4xl md:text-5xl font-display font-bold text-slate-900">Explore The World</h2>
          </div>
          
          <div className="mb-16">
            <div className="flex justify-between items-end mb-6">
              <h3 className="text-2xl font-display font-bold text-slate-800">International Getaways</h3>
              <Link href="/destinations?region=international" className="text-sm font-semibold text-[#045a94] hover:underline">View All</Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {internationalDests.length > 0 ? internationalDests.map(dest => (
                <Link href={`/destinations/${dest.slug}`} key={dest.id} data-aos="zoom-in-up" data-aos-delay="100" className="group relative h-[350px] rounded-[2rem] overflow-hidden border border-[#045a94]/10 shadow-[0_15px_35px_rgba(4,90,148,0.25)] hover:shadow-[0_25px_60px_rgba(4,90,148,0.7)] hover:border-[#045a94]/40 transition-all duration-300 hover:-translate-y-2">
                  <Image src={dest.heroImage || ''} alt={dest.name} fill className="object-cover group-hover:scale-110 transition-all duration-700 ease-out" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
                  <h4 className="absolute bottom-6 left-6 text-2xl font-display font-bold text-white drop-shadow-md">{dest.name}</h4>
                </Link>
              )) : <div className="col-span-4 p-8 text-center text-gray-400 border border-dashed rounded-2xl">Add International Destinations in Admin</div>}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-end mb-6">
              <h3 className="text-2xl font-display font-bold text-slate-800">Incredible India</h3>
              <Link href="/destinations?region=domestic" className="text-sm font-semibold text-[#045a94] hover:underline">View All</Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {domesticDests.length > 0 ? domesticDests.map(dest => (
                <Link href={`/destinations/${dest.slug}`} key={dest.id} data-aos="zoom-in-up" data-aos-delay="100" className="group relative h-[350px] rounded-[2rem] overflow-hidden border border-[#045a94]/10 shadow-[0_15px_35px_rgba(4,90,148,0.25)] hover:shadow-[0_25px_60px_rgba(4,90,148,0.7)] hover:border-[#045a94]/40 transition-all duration-300 hover:-translate-y-2">
                  <Image src={dest.heroImage || ''} alt={dest.name} fill className="object-cover group-hover:scale-110 transition-all duration-700 ease-out" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
                  <h4 className="absolute bottom-6 left-6 text-2xl font-display font-bold text-white drop-shadow-md">{dest.name}</h4>
                </Link>
              )) : <div className="col-span-4 p-8 text-center text-gray-400 border border-dashed rounded-2xl">Add Domestic Destinations in Admin</div>}
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US / SERVICES */}
      <section data-aos="fade-up" className="w-full py-24 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')]"></div>

        <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-center gap-16">
          <div className="w-full lg:w-1/2 relative h-[500px] md:h-[650px]">
            <div data-aos="fade-right" className="absolute left-0 bottom-0 w-[80%] md:w-[85%] h-[400px] md:h-[550px] rounded-t-[12rem] rounded-b-[2.5rem] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.08)] z-10 bg-slate-100 border-4 border-white">
              <Image src="https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1600&auto=format&fit=crop" alt="Luxury Resort" fill className="object-cover hover:scale-105 transition-transform duration-700" />
            </div>
            <div data-aos="fade-left" data-aos-delay="200" className="absolute right-0 top-4 md:top-12 w-[55%] md:w-[60%] h-[250px] md:h-[320px] rounded-[2rem] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.08)] z-20 border-[8px] md:border-[10px] border-white bg-slate-100">
              <Image src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1600&auto=format&fit=crop" alt="Luxury Experience" fill className="object-cover hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="absolute bottom-10 md:bottom-20 -right-2 md:-right-6 z-30 bg-white rounded-2xl p-3 md:p-4 shadow-[0_10px_40px_rgba(0,0,0,0.06)] flex items-center gap-3 md:gap-4 animate-float-slow">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#045a94]/10 flex items-center justify-center">
                <Trophy className="w-6 h-6 text-[#045a94] transition-colors duration-300 group-hover:text-white" />
              </div>
              <div>
                <p className="font-bold text-slate-900 text-sm md:text-base">Award Winning</p>
                <p className="text-slate-500 text-xs md:text-sm">Travel Agency</p>
              </div>
            </div>
          </div>

          <div data-aos="fade-up" className="w-full lg:w-1/2 flex flex-col pt-8 lg:pt-0">
            <span className="text-[#045a94] font-display italic text-2xl mb-2">Why Choose Us</span>
            <h2 data-aos="fade-up" data-aos-delay="100" className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-6 leading-tight">
              {data.statsTitle}
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed mb-10">
              We specialize in curating bespoke travel experiences tailored perfectly to your desires. From hidden gems to world-class luxury, your journey is our masterpiece.
            </p>
            
            <div className="space-y-6">
              <div data-aos="fade-right" data-aos-delay="200" className="flex gap-4 group cursor-pointer">
                <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center shrink-0 border border-slate-100 transition-all duration-300 group-hover:bg-[#045a94] group-hover:scale-110 group-hover:shadow-md"><Globe2 className="w-6 h-6 text-[#045a94] transition-colors duration-300 group-hover:text-white" /></div>
                <div className="transition-transform duration-300 group-hover:translate-x-2"> <h4 className="text-xl font-bold text-slate-900 mb-2">Global Network</h4>
                  <p className="text-slate-500">Access to exclusive accommodations and experiences worldwide.</p>
                </div>
              </div>
              <div data-aos="fade-right" data-aos-delay="200" className="flex gap-4 group cursor-pointer">
                <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center shrink-0 border border-slate-100 transition-all duration-300 group-hover:bg-[#045a94] group-hover:scale-110 group-hover:shadow-md"><ShieldCheck className="w-6 h-6 text-[#045a94] transition-colors duration-300 group-hover:text-white" /></div>
                <div className="transition-transform duration-300 group-hover:translate-x-2"> <h4 className="text-xl font-bold text-slate-900 mb-2">Trusted & Safe</h4>
                  <p className="text-slate-500">Your safety is our top priority with 24/7 on-ground support.</p>
                </div>
              </div>
              <div data-aos="fade-right" data-aos-delay="200" className="flex gap-4 group cursor-pointer">
                <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center shrink-0 border border-slate-100 transition-all duration-300 group-hover:bg-[#045a94] group-hover:scale-110 group-hover:shadow-md"><HeartHandshake className="w-6 h-6 text-[#045a94] transition-colors duration-300 group-hover:text-white" /></div>
                <div className="transition-transform duration-300 group-hover:translate-x-2"> <h4 className="text-xl font-bold text-slate-900 mb-2">Personalized Service</h4>
                  <p className="text-slate-500">Dedicated travel experts crafting itineraries just for you.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      
      {/* FEATURED PACKAGES SECTION */}
      <section className="w-full py-24 md:py-32 bg-[#fafafa]">
        <div className="max-w-7xl mx-auto px-4">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div className="max-w-2xl">
              <span data-aos="fade-up" className="text-[#045a94] font-medium tracking-[0.2em] uppercase text-sm mb-3 block">Handpicked Journeys</span>
              <h2 data-aos="fade-up" data-aos-delay="100" className="text-4xl md:text-5xl font-display font-bold text-slate-900">Featured Tour Packages</h2>
            </div>
            <Link href="/packages" className="hidden md:flex items-center text-slate-600 hover:text-[#045a94] font-medium uppercase tracking-wide text-sm transition">
              View All Packages <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(featuredPackages.length > 0 ? featuredPackages : [
              {
                id: 'dummy-1', title: 'Mesmerizing Maldives Retreat', shortDesc: 'Experience luxury at its finest with pristine beaches, overwater villas, and crystal-clear waters.', heroImage: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=800', destination: { name: 'Maldives' }
              },
              {
                id: 'dummy-2', title: 'Swiss Alps Adventure', shortDesc: 'Discover the breathtaking scenery of Switzerland with guided alpine tours and premium resorts.', heroImage: 'https://images.unsplash.com/photo-1527668752968-14dc70a27c95?q=80&w=800', destination: { name: 'Switzerland' }
              },
              {
                id: 'dummy-3', title: 'Bali Cultural Discovery', shortDesc: 'Immerse yourself in the rich culture, stunning temples, and lush landscapes of beautiful Bali.', heroImage: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=800', destination: { name: 'Indonesia' }
              }
            ]).map((pkg: any, index: number) => (
              <div key={pkg.id} data-aos="fade-up" data-aos-delay={index * 100} className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col group">
                <div className="relative w-full aspect-[4/3] overflow-hidden">
                  <Image src={pkg.heroImage || 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=800'} alt={pkg.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                  {pkg.destination && (
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-[#045a94] text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wider shadow-sm">
                      {pkg.destination.name}
                    </div>
                  )}
                </div>
                <div className="p-8 flex flex-col flex-1">
                  <h3 className="text-2xl font-display font-bold text-slate-900 mb-4 group-hover:text-[#045a94] transition-colors leading-tight">
                    {pkg.title}
                  </h3>
                  <p className="text-slate-500 text-sm mb-8 line-clamp-2 leading-relaxed">
                    {pkg.shortDesc || 'Experience the journey of a lifetime with our carefully crafted itinerary tailored for you.'}
                  </p>
                  <Link href="/contact" className="block w-full text-center bg-slate-50 text-[#045a94] font-bold py-4 rounded-xl group-hover:bg-[#045a94] group-hover:text-white transition-colors mt-auto uppercase tracking-wide text-sm">
                    Get Package
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center md:hidden">
            <Link href="/packages" className="inline-flex items-center text-[#045a94] font-bold uppercase tracking-wide text-sm">
              View All Packages <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

        </div>
      </section>
{/* TESTIMONIALS */}
      <TestimonialSection testimonials={testimonials} />

      {/* BLOG */}
      <section data-aos="fade-up" className="w-full py-24 bg-slate-50 relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div className="max-w-2xl">
              <span data-aos="fade-up" className="text-[#045a94] font-medium tracking-[0.2em] uppercase text-sm mb-3 block">Travel Tips & Stories</span>
              <h2 data-aos="fade-up" data-aos-delay="100" className="text-4xl md:text-5xl font-display font-bold text-slate-900">Latest From Our Blog</h2>
            </div>
            <Link href="/blog" className="hidden md:flex items-center text-slate-600 hover:text-[#045a94] font-medium uppercase tracking-wide text-sm transition">
              Read All Posts <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          {recentBlogs.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Featured Post (1st Post) */}
              {recentBlogs[0] && (
                <Link href={`/blog/${recentBlogs[0].slug}`} data-aos="fade-right" className="group flex flex-col items-start bg-white rounded-[2rem] transition-all hover:bg-white hover:shadow-xl hover:-translate-y-2 border border-slate-100 overflow-hidden">
                  <div className="relative w-full h-[300px] overflow-hidden">
                    <Image src={recentBlogs[0].coverImageUrl || recentBlogs[0].featuredImage || ''} alt={recentBlogs[0].title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                    {recentBlogs[0].category && (
                      <div className="absolute top-6 left-6 bg-[#045a94] text-white text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest">{recentBlogs[0].category}</div>
                    )}
                  </div>
                  <div className="p-8 w-full flex flex-col">
                    <h3 className="text-2xl md:text-3xl font-display font-bold text-slate-900 mb-4 group-hover:text-[#045a94] transition-colors leading-tight">
                      {recentBlogs[0].title}
                    </h3>
                    <p className="text-slate-500 text-lg leading-relaxed mb-8 line-clamp-3">
                      {recentBlogs[0].introText || 'Explore the nuances of world travel, picking up vital tips and discovering breathtaking destinations.'}
                    </p>
                    <div className="flex items-center justify-between mt-auto w-full pt-6 border-t border-slate-100">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden relative bg-slate-200 shrink-0">
                           <Image src={`https://i.pravatar.cc/150?u=${recentBlogs[0].id}`} alt="Author" fill className="object-cover" />
                        </div>
                        <div className="transition-transform duration-300 group-hover:translate-x-2"> <h4 className="font-bold text-slate-900 text-sm">{recentBlogs[0].author || 'Author'}</h4>
                          <span className="text-slate-400 text-xs">{new Date(recentBlogs[0].publishedAt || recentBlogs[0].createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                        </div>
                      </div>
                      <span className="text-[#045a94] font-bold text-sm uppercase tracking-wider flex items-center group-hover:gap-2 transition-all">
                        Read <ChevronRight className="w-4 h-4 ml-1" />
                      </span>
                    </div>
                  </div>
                </Link>
              )}

              {/* Grid Posts (Next 3) */}
              <div className="flex flex-col gap-6">
                {recentBlogs.slice(1, 4).map((post) => (
                  <Link href={`/blog/${post.slug}`} key={post.id} data-aos="fade-left" className="group flex items-center bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-slate-100 h-[160px]">
                    <div className="relative w-1/3 h-full overflow-hidden shrink-0">
                      <Image src={post.featuredImage || post.coverImageUrl || ''} alt={post.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                    </div>
                    <div className="p-6 w-2/3 flex flex-col justify-center">
                      {post.category && (
                        <span className="text-[#045a94] text-xs font-bold uppercase tracking-wider mb-2 block">{post.category}</span>
                      )}
                      <h3 className="text-xl font-display font-bold text-slate-900 mb-3 group-hover:text-[#045a94] transition-colors line-clamp-2 leading-tight">
                        {post.title}
                      </h3>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-slate-400 font-medium">{new Date(post.publishedAt || post.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

            </div>
          ) : (
            <div className="text-center py-20 border border-dashed border-gray-200 rounded-3xl bg-white">
              <p className="text-gray-400">Add blog posts in the admin panel to see them here.</p>
            </div>
          )}
        </div>
      </section>

      {/* BOTTOM ENQUIRY CTA (LUXURY REDESIGN) */}
      <section data-aos="fade-up" className="w-full py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="relative w-full bg-[#045a94] rounded-[3rem] overflow-hidden pt-16 pb-32 md:pb-16 px-6 md:px-16 flex flex-col md:flex-row items-center shadow-[0_30px_60px_rgba(4,90,148,0.3)]">
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
            
            <div className="absolute bottom-0 left-0 w-full flex items-end justify-start space-x-1 sm:space-x-2 opacity-100 h-24 sm:h-32 overflow-hidden pointer-events-none px-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-end space-x-1 sm:space-x-2 shrink-0">
                  <div className="w-10 h-12 bg-white rounded-t-sm"></div>
                  <div className="w-14 h-20 bg-white rounded-t-md relative">
                     <div className="absolute top-2 w-full flex justify-center space-x-1"><div className="w-2 h-4 bg-[#045a94]"></div><div className="w-2 h-4 bg-[#045a94]"></div></div>
                  </div>
                  <div className="w-8 h-32 bg-white rounded-t-md relative flex justify-center">
                     <div className="absolute top-3 w-4 h-4 rounded-full bg-[#045a94]"></div>
                  </div>
                  <div className="w-12 h-16 bg-white"></div>
                  <div className="w-0 h-0 border-l-[30px] border-l-transparent border-r-[30px] border-r-transparent border-b-[60px] border-b-white mx-1"></div>
                  <div className="w-20 h-24 bg-white rounded-t-full relative overflow-hidden flex flex-col items-center pt-6 space-y-2">
                     <div className="w-full flex justify-around px-2"><div className="w-3 h-6 bg-[#045a94] rounded-t-full"></div><div className="w-3 h-6 bg-[#045a94] rounded-t-full"></div><div className="w-3 h-6 bg-[#045a94] rounded-t-full"></div></div>
                  </div>
                  <div className="w-12 h-14 bg-white"></div>
                  <div className="w-6 h-28 bg-white mx-1"></div>
                  <div className="w-12 h-20 bg-white rounded-t-lg mx-1 rotate-6 origin-bottom relative flex justify-center">
                     <div className="absolute top-2 w-8 border-b-2 border-[#045a94]"></div>
                     <div className="absolute top-6 w-8 border-b-2 border-[#045a94]"></div>
                  </div>
                  <div className="w-14 h-12 bg-white"></div>
                </div>
              ))}
            </div>

            <div className="w-full md:w-1/2 relative z-10 mb-12 md:mb-0 text-center md:text-left mt-8 md:mt-0">
              <span data-aos="fade-up" className="text-white font-display italic text-2xl mb-3 block drop-shadow-md">30% offer for Tour</span>
              <h2 data-aos="fade-up" data-aos-delay="100" className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-8 leading-[1.15] drop-shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
                Start your Journey With a Single Click
              </h2>
              <Link href="/contact" data-aos="zoom-in" data-aos-delay="200" className="inline-block bg-white text-[#045a94] hover:bg-slate-50 px-10 py-4 rounded-xl font-bold uppercase tracking-wide transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.15)] hover:-translate-y-1 active:scale-95 hover-shine overflow-hidden">
                Start Booking
              </Link>
            </div>

            <div className="w-full md:w-1/2 flex justify-center md:justify-end relative z-10 h-[400px] md:h-[450px]">
              <div className="relative w-full max-w-[450px] h-full mt-4 md:mt-0">
                <svg className="absolute top-10 left-0 w-32 h-32 opacity-80 pointer-events-none hidden md:block" viewBox="0 0 100 100" fill="none">
                   <path d="M100 100 Q 50 50 10 0" stroke="white" strokeWidth="2" strokeDasharray="4 4" />
                </svg>
                <Plane className="absolute top-8 -left-2 w-6 h-6 text-white rotate-[-45deg] opacity-100 hidden md:block" />
                <svg className="absolute bottom-20 left-10 w-24 h-24 opacity-80 pointer-events-none hidden md:block" viewBox="0 0 100 100" fill="none">
                   <path d="M0 100 Q 50 50 100 10" stroke="white" strokeWidth="2" strokeDasharray="4 4" />
                </svg>
                <Plane className="absolute bottom-20 left-10 w-6 h-6 text-white rotate-[45deg] opacity-100 hidden md:block" />

                <div className="absolute top-4 left-4 md:left-2 w-36 h-36 md:w-44 md:h-44 rounded-full border-[6px] border-white overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.08)] z-20 transform hover:scale-105 transition-transform duration-500">
                   <Image src="https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?q=80&w=1600&auto=format&fit=crop" alt="Group Travel" fill className="object-cover" />
                </div>
                <div className="absolute bottom-20 left-12 md:left-12 w-28 h-28 md:w-36 md:h-36 rounded-full border-[6px] border-white overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.08)] z-30 transform hover:scale-105 transition-transform duration-500">
                   <Image src="https://images.unsplash.com/photo-1498307833015-e7b400441eb8?q=80&w=1600&auto=format&fit=crop" alt="Hot Air Balloons" fill className="object-cover" />
                </div>
                <div className="absolute top-12 right-0 md:-right-4 w-52 h-52 md:w-64 md:h-64 rounded-full border-[8px] border-white overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] z-10 transform hover:scale-105 transition-transform duration-500 bg-white">
                   <Image src="https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=1600&auto=format&fit=crop" alt="Travel Girl" fill className="object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}