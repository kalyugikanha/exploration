import Image from 'next/image';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import TestimonialSection from '@/components/ui/TestimonialSection';
import TrustStrip from '@/components/ui/TrustStrip';
import TravelYourWay from '@/components/ui/TravelYourWay';
import HowItWorks from '@/components/ui/HowItWorks';
import OurStory from '@/components/ui/OurStory';
import WhyChooseUs from '@/components/ui/WhyChooseUs';
import { Clock, ChevronRight, Star, MapPin } from 'lucide-react';

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
    heroSubtitle: 'Crafting unforgettable bespoke travel experiences across the globe.',
    heroImage: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=1920&auto=format&fit=crop',
    heroAlign: 'center',
  };

  const alignClass = data.heroAlign === 'left' ? 'items-start text-left' : data.heroAlign === 'right' ? 'items-end text-right' : 'items-center text-center';

  // Combine destinations for the Explore section
  const allDests = [...domesticDests, ...internationalDests].slice(0, 8);

  return (
    <main className="w-full min-h-screen bg-white">
      
      {/* 1. HERO SECTION */}
      <section className="relative w-full h-[90vh] min-h-[600px] overflow-hidden">
        <Image src={data.heroImage} alt="Hero" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <div className={`relative z-20 h-full flex flex-col justify-center px-6 md:px-16 ${alignClass}`}>
          <div className="max-w-4xl" data-aos="fade-up">
            <span className="text-white/90 font-semibold tracking-[0.2em] uppercase text-sm mb-4 block">Exploration Tours</span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 font-display leading-[1.1]">
              {data.heroTitle}
            </h1>
            <p className="text-lg md:text-2xl text-white/90 mb-10 max-w-2xl font-light">
              {data.heroSubtitle}
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <Link href="/contact" className="bg-[#045a94] hover:bg-white text-white hover:text-[#045a94] px-8 py-4 rounded-full font-bold transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl shadow-lg">
                Plan Your Trip
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUST STRIP */}
      <TrustStrip />

      {/* 3. EXPLORE DESTINATIONS */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16" data-aos="fade-up">
            <span className="text-[#045a94] font-bold tracking-widest uppercase text-sm mb-2 block">Our Destinations</span>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900">Explore The World</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {allDests.map((dest, i) => (
              <Link href={`/destinations/${dest.slug}`} key={dest.id} data-aos="fade-up" data-aos-delay={i * 100} 
                    className="group relative h-[380px] rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
                <Image src={dest.heroImage || '/placeholder.jpg'} alt={dest.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform transition-transform duration-300">
                  <h3 className="text-2xl font-display font-bold mb-1">{dest.name}</h3>
                  <p className="text-sm text-white/80 line-clamp-2">{dest.shortDesc}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/destinations" className="inline-flex items-center gap-2 text-[#045a94] font-bold hover:text-[#03426e] transition-colors">
              View All Destinations <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. TRAVEL YOUR WAY */}
      <TravelYourWay />

      {/* 5. WHY EXPLORATION TOURS */}
      <WhyChooseUs />

      {/* 6. FEATURED JOURNEYS (Packages) */}
      <section className="py-24 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16" data-aos="fade-up">
            <span className="text-[#045a94] font-bold tracking-widest uppercase text-sm mb-2 block">Curated Itineraries</span>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900">Featured Journeys</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPackages.map((pkg, i) => (
              <div key={pkg.id} data-aos="fade-up" data-aos-delay={i * 100} className="group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="relative h-60 w-full overflow-hidden">
                  <Image src={pkg.heroImage || '/placeholder.jpg'} alt={pkg.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  {pkg.priceFrom > 0 && (
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full text-sm font-bold text-slate-900 shadow-sm">
                      From ${pkg.priceFrom}
                    </div>
                  )}
                </div>
                <div className="p-6 md:p-8">
                  <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {pkg.destination?.name || 'Multi-City'}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {pkg.duration}</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 font-display line-clamp-2">{pkg.title}</h3>
                  <p className="text-slate-600 text-sm mb-6 line-clamp-2">{pkg.shortDesc}</p>
                  <Link href="/contact" className="block w-full text-center bg-slate-50 hover:bg-[#045a94] text-[#045a94] hover:text-white border border-[#045a94]/20 font-bold py-3 rounded-xl transition-colors">
                    Get Package
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. HOW IT WORKS */}
      <HowItWorks />

      {/* 8. TESTIMONIALS */}
      <TestimonialSection testimonials={testimonials} />

      {/* 9. OUR STORY / TEAM */}
      <OurStory />

      {/* 10. TRAVEL INSPIRATION (Blogs) */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6" data-aos="fade-up">
            <div>
              <span className="text-[#045a94] font-bold tracking-widest uppercase text-sm mb-2 block">Travel Inspiration</span>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900">Latest From Our Blog</h2>
            </div>
            <Link href="/blog" className="inline-flex items-center gap-2 text-[#045a94] font-bold hover:bg-blue-50 px-6 py-3 rounded-full transition-colors">
              Read All Articles <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recentBlogs.slice(0, 3).map((post, i) => (
              <Link href={`/blog/${post.slug}`} key={post.id} data-aos="fade-up" data-aos-delay={i * 100} className="group block">
                <div className="relative h-64 rounded-3xl overflow-hidden mb-6">
                  <Image src={post.featuredImage || '/placeholder.jpg'} alt={post.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full text-xs font-bold text-[#045a94]">
                    {post.category || 'Travel'}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 font-display group-hover:text-[#045a94] transition-colors line-clamp-2">{post.title}</h3>
                <p className="text-slate-500 text-sm line-clamp-2">{post.introText}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 11. FINAL CTA */}
      <section className="py-24 bg-[#045a94] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=1920')] bg-cover bg-center"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10" data-aos="zoom-in">
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">Ready to Start Planning?</h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto font-light">
            Contact our travel experts today and let us craft a bespoke itinerary tailored perfectly to your preferences.
          </p>
          <Link href="/contact" className="inline-flex items-center justify-center bg-white text-[#045a94] hover:bg-slate-50 px-10 py-4 rounded-full font-bold text-lg shadow-xl hover:-translate-y-1 transition-all duration-300">
            Plan Your Trip Now
          </Link>
        </div>
      </section>

    </main>
  );
}
