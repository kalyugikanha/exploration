import Image from 'next/image';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { ChevronRight, MapPin, Clock } from 'lucide-react';

export const metadata = { title: 'Tour Packages | Exploration Tours' };

export default async function PackagesPage() {
  const dbPackages = await prisma.package.findMany({
    where: { isPublished: true },
    include: { destination: true },
    orderBy: { createdAt: 'desc' }
  });

  const dummyPackages = [
    {
      id: 'dummy-1', title: 'Mesmerizing Maldives Retreat', shortDesc: 'Experience luxury at its finest with pristine beaches, overwater villas, and crystal-clear waters.', heroImage: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=800', duration: '5 Days / 4 Nights', destination: { name: 'Maldives' }
    },
    {
      id: 'dummy-2', title: 'Swiss Alps Adventure', shortDesc: 'Discover the breathtaking scenery of Switzerland with guided alpine tours and premium resorts.', heroImage: 'https://images.unsplash.com/photo-1527668752968-14dc70a27c95?q=80&w=800', duration: '7 Days / 6 Nights', destination: { name: 'Switzerland' }
    },
    {
      id: 'dummy-3', title: 'Bali Cultural Discovery', shortDesc: 'Immerse yourself in the rich culture, stunning temples, and lush landscapes of beautiful Bali.', heroImage: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=800', duration: '6 Days / 5 Nights', destination: { name: 'Indonesia' }
    },
    {
      id: 'dummy-4', title: 'Golden Triangle India', shortDesc: 'Explore the majestic history of India through Delhi, Agra, and Jaipur in this immersive cultural tour.', heroImage: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=800', duration: '8 Days / 7 Nights', destination: { name: 'India' }
    },
    {
      id: 'dummy-5', title: 'Enchanting Paris Getaway', shortDesc: 'Fall in love with the City of Lights. Visit the Eiffel Tower, Louvre Museum, and enjoy romantic Seine cruises.', heroImage: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=800', duration: '4 Days / 3 Nights', destination: { name: 'France' }
    },
    {
      id: 'dummy-6', title: 'Dubai Desert Safari & City', shortDesc: 'Experience the perfect blend of modern luxury and traditional desert adventures in spectacular Dubai.', heroImage: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=800', duration: '5 Days / 4 Nights', destination: { name: 'UAE' }
    }
  ];

  const displayPackages = dbPackages.length > 0 ? dbPackages : dummyPackages;

  return (
    <main className="w-full bg-[#fafafa] min-h-screen pb-24 font-sans">
      
      {/* HERO SECTION */}
      <section className="relative w-full h-[50vh] min-h-[400px] flex items-center justify-center pt-20 max-w-full mx-auto overflow-hidden shadow-sm">
        <div className="absolute inset-0 bg-[#0f172a]"></div>
        <Image src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1600&auto=format&fit=crop" alt="Tour Packages" fill className="object-cover opacity-40 mix-blend-overlay" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <span className="text-[#045a94] font-medium tracking-[0.2em] uppercase text-sm mb-4 block bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full inline-block">Explore The World</span>
          <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 drop-shadow-lg leading-tight">
            Our Tour Packages
          </h1>
          <p className="text-white/90 font-medium text-lg md:text-xl drop-shadow-md">
            Discover carefully curated itineraries designed for unforgettable experiences.
          </p>
        </div>
      </section>

      {/* PACKAGES GRID */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 mt-16 md:mt-24">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayPackages.map((pkg: any, index: number) => (
            <div key={pkg.id} data-aos="fade-up" data-aos-delay={(index % 3) * 100} className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col group">
              <div className="relative w-full aspect-[4/3] overflow-hidden">
                <Image src={pkg.heroImage || 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=800'} alt={pkg.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                {pkg.destination && (
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-[#045a94] text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" /> {pkg.destination.name}
                  </div>
                )}
                {pkg.duration && (
                  <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md text-white text-xs font-bold px-4 py-2 rounded-full tracking-wider shadow-sm flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" /> {pkg.duration}
                  </div>
                )}
              </div>
              <div className="p-8 flex flex-col flex-1">
                <h3 className="text-2xl font-display font-bold text-slate-900 mb-4 group-hover:text-[#045a94] transition-colors leading-tight">
                  {pkg.title}
                </h3>
                <p className="text-slate-500 text-sm mb-8 line-clamp-3 leading-relaxed">
                  {pkg.shortDesc || 'Experience the journey of a lifetime with our carefully crafted itinerary tailored for you.'}
                </p>
                <Link href="/contact" className="block w-full text-center bg-slate-50 text-[#045a94] font-bold py-4 rounded-xl group-hover:bg-[#045a94] group-hover:text-white transition-colors mt-auto uppercase tracking-wide text-sm border border-slate-100 group-hover:border-transparent">
                  Get Package
                </Link>
              </div>
            </div>
          ))}
        </div>

      </section>
    </main>
  );
}