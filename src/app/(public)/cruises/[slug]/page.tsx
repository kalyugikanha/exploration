import { prisma } from '@/lib/prisma';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MapPin, Clock, Anchor, CheckCircle2 } from 'lucide-react';
import ContactForm from '@/components/ui/ContactForm';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  try {
    const cruise = await prisma.cruise.findUnique({ where: { slug: params.slug } });
    if (!cruise) return { title: 'Not Found' };
    return { title: `${cruise.seoTitle || cruise.title} | Exploration Tours`, description: cruise.seoDesc || cruise.shortDesc };
  } catch (e) {
    return { title: 'Exploration Tours' };
  }
}

export default async function CruiseDetailPage({ params }: { params: { slug: string } }) {
  const fallbackCruiseDetails: Record<string, any> = {
    'disney-cruise-bahamas-caribbean': {
      id: 'cruise-disney',
      slug: 'disney-cruise-bahamas-caribbean',
      title: 'Disney Cruise Line — Bahamian & Caribbean Magic',
      region: 'Bahamas & Caribbean',
      duration: '5 Days / 4 Nights',
      shortDesc: 'Enchanting family voyages featuring world-class Broadway-style Disney entertainment, fireworks at sea, and exclusive calls at the private island paradise Castaway Cay.',
      content: '<p>Step aboard a realm where fantasy becomes reality. Disney Cruise Line blends legendary Disney storytelling, magnificent Broadway-quality musical productions, and immersive themed restaurants with the relaxation of a luxury ocean vacation. Sail to Disney\'s private island paradise, Castaway Cay, where powdery white-sand beaches, crystal lagoons, and exclusive adult retreats await.</p>',
      heroImage: 'https://images.unsplash.com/photo-1599640842225-85d111c60e6b?q=80&w=1600',
      gallery: [
        'https://images.unsplash.com/photo-1548574505-5e239809ee19?q=80&w=800',
        'https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?q=80&w=800',
        'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=800'
      ],
      isPublished: true,
      itineraries: [
        { dayNumber: 1, title: 'Port Canaveral (Orlando)', timeOfDay: 'Afternoon', description: 'Embark on the magnificent vessel. Attend the Sail-Away deck party with iconic Disney characters, settle into your stateroom, and enjoy your first rotational dining experience.', images: ['https://images.unsplash.com/photo-1548574505-5e239809ee19?q=80&w=800'] },
        { dayNumber: 2, title: 'Day at Sea in the Atlantic', timeOfDay: 'Full Day', description: 'Experience the exhilarating AquaDuck water coaster, relax at the Quiet Cove adult-only pool, indulge in Senses Spa treatments, and enjoy a Broadway-caliber Disney live show.', images: ['https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=800'] },
        { dayNumber: 3, title: 'Disney Castaway Cay (Private Island)', timeOfDay: 'Morning & Afternoon', description: 'Drop anchor at Disney\'s exclusive Bahamian private island. Snorkel in crystal lagoons, cycle along beachfront nature trails, and feast on an open-air barbecue buffet.', images: ['https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?q=80&w=800'] },
        { dayNumber: 4, title: 'Nassau, The Bahamas', timeOfDay: 'Full Day', description: 'Explore colorful colonial architecture, historic stone fortresses, vibrant straw markets, or enjoy private excursions to the Atlantis resort.', images: ['https://images.unsplash.com/photo-1540202404-b7111422898b?q=80&w=800'] }
      ]
    },
    'royal-caribbean-ultimate-voyager': {
      id: 'cruise-royal-caribbean',
      slug: 'royal-caribbean-ultimate-voyager',
      title: 'Royal Caribbean — Oasis & Icon Class Expeditions',
      region: 'Western Caribbean & Mediterranean',
      duration: '7 Days / 6 Nights',
      shortDesc: 'Sail aboard the globe’s most magnificent cruise vessels featuring neighborhood concepts, surf simulators, live Broadway musicals, and Perfect Day at CocoCay.',
      content: '<p>Royal Caribbean redefines high-seas adventure with the world\'s most innovative mega-ships. Featuring groundbreaking neighborhoods including Central Park with real living plants, the AquaTheater high-diving shows, ice-skating rinks, and multi-deck waterslides. Anchor at Perfect Day at CocoCay to conquer record-breaking waterslides or unwind in luxury overwater cabanas.</p>',
      heroImage: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?q=80&w=1600',
      gallery: [
        'https://images.unsplash.com/photo-1599640842225-85d111c60e6b?q=80&w=800',
        'https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?q=80&w=800',
        'https://images.unsplash.com/photo-1533682805518-48d1f5b8cb3a?q=80&w=800'
      ],
      isPublished: true,
      itineraries: [
        { dayNumber: 1, title: 'Miami Port Departure', timeOfDay: 'Evening', description: 'Board the floating architectural marvel in Miami. Take in breathtaking skyline views as we sail out into the Caribbean sunset.', images: ['https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=800'] },
        { dayNumber: 2, title: 'Perfect Day at CocoCay', timeOfDay: 'Full Day', description: 'Spend an adrenaline-pumping or deeply relaxing day on Royal Caribbean\'s private Bahamian island. Experience the tallest waterslide in North America or chill at the Coco Beach Club.', images: ['https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?q=80&w=800'] },
        { dayNumber: 3, title: 'Cruising the Western Caribbean', timeOfDay: 'Sea Day', description: 'Stroll through Central Park with over 20,000 live plants, catch an ice skating show, and dine at world-class specialty restaurants curated by celebrity chefs.', images: ['https://images.unsplash.com/photo-1533682805518-48d1f5b8cb3a?q=80&w=800'] },
        { dayNumber: 4, title: 'Cozumel, Mexico', timeOfDay: 'Full Day', description: 'Discover ancient Mayan ruins of San Gervasio, snorkel the Palancar Reef system, or relax at pristine beach resorts.', images: ['https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?q=80&w=800'] }
      ]
    },
    'norwegian-cruise-line-freestyle': {
      id: 'cruise-norwegian',
      slug: 'norwegian-cruise-line-freestyle',
      title: 'Norwegian Cruise Line — Alaska Glaciers & European Fjords',
      region: 'Alaska & European Fjords',
      duration: '8 Days / 7 Nights',
      shortDesc: 'Embrace the unmatched freedom of Freestyle Cruising. Sail past soaring Alaskan icebergs and dramatic Norwegian Fjords while enjoying VIP access in The Haven suites.',
      content: '<p>Feel the pure thrill of Freestyle Cruising with Norwegian Cruise Line. With no fixed dining times, no pre-assigned seating, and relaxed dress codes, you dictate the rhythm of your holiday. Take in panoramic 360-degree views of towering glaciers and rugged wilderness from the expansive Observation Lounge, or relax in The Haven, a private enclave of ultra-luxury suites.</p>',
      heroImage: 'https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?q=80&w=1600',
      gallery: [
        'https://images.unsplash.com/photo-1548574505-5e239809ee19?q=80&w=800',
        'https://images.unsplash.com/photo-1599640842225-85d111c60e6b?q=80&w=800',
        'https://images.unsplash.com/photo-1507272931001-fc06c17e4f43?q=80&w=800'
      ],
      isPublished: true,
      itineraries: [
        { dayNumber: 1, title: 'Seattle, Washington', timeOfDay: 'Afternoon', description: 'Board the state-of-the-art vessel at Pier 66 in downtown Seattle with sweeping views of Puget Sound.', images: ['https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?q=80&w=800'] },
        { dayNumber: 2, title: 'Scenic Cruising: Inside Passage', timeOfDay: 'Full Day', description: 'Glide past towering coastal rainforests, remote islands, and tranquil fjords. Keep watch for humpback whales, orcas, and bald eagles from the observation deck.', images: ['https://images.unsplash.com/photo-1507272931001-fc06c17e4f43?q=80&w=800'] },
        { dayNumber: 3, title: 'Juneau, Alaska', timeOfDay: 'Full Day', description: 'Visit Alaska’s capital city. Take a helicopter flight to walk upon Mendenhall Glacier, or embark on a guided whale-watching catamaran.', images: ['https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?q=80&w=800'] },
        { dayNumber: 4, title: 'Skagway & White Pass Summit', timeOfDay: 'Full Day', description: 'Step into Gold Rush history. Ride the vintage White Pass & Yukon Route narrow-gauge railroad climbing 3,000 feet past cliffs and gorges.', images: ['https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=800'] }
      ]
    }
  };

  if (!cruise && fallbackCruiseDetails[params.slug]) {
    cruise = fallbackCruiseDetails[params.slug];
  }

  if (!cruise || !cruise.isPublished) notFound();

  return (
    <main className="w-full bg-slate-50 min-h-screen pb-24">
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] min-h-[500px]">
        <Image src={cruise.heroImage || '/placeholder.jpg'} alt={cruise.title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent"></div>
        <div className="absolute inset-0 flex items-end pb-16">
          <div className="max-w-7xl mx-auto px-4 w-full">
            <div className="inline-flex items-center gap-2 bg-brand-600/90 backdrop-blur text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
              <Anchor className="w-4 h-4" />
              {cruise.region || 'Worldwide Cruise'}
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 leading-tight max-w-4xl">
              {cruise.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-white/90 font-medium">
              <div className="flex items-center gap-2"><Clock className="w-5 h-5 text-brand-400" /> {cruise.duration}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Content & Form Grid */}
      <section className="max-w-7xl mx-auto px-4 -mt-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12">
          
          <div className="lg:col-span-8 space-y-12">
            {/* Overview */}
            <div className="bg-white p-8 md:p-10 rounded-[2rem] shadow-sm border border-slate-100">
              <h2 className="text-3xl font-display font-bold text-slate-900 mb-6">Overview</h2>
              <div className="prose prose-lg prose-slate max-w-none text-slate-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: cruise.content || cruise.shortDesc || '' }} />
            </div>

            {/* Gallery */}
            {cruise.gallery && cruise.gallery.length > 0 && (
              <div className="bg-white p-8 md:p-10 rounded-[2rem] shadow-sm border border-slate-100">
                <h2 className="text-3xl font-display font-bold text-slate-900 mb-8">Vessel & Experience</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {cruise.gallery.map((img, idx) => (
                    <div key={idx} className="relative h-48 rounded-xl overflow-hidden group">
                      <Image src={img} alt={`Gallery image ${idx + 1}`} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Itinerary */}
            {cruise.itineraries.length > 0 && (
              <div className="bg-white p-8 md:p-10 rounded-[2rem] shadow-sm border border-slate-100">
                <h2 className="text-3xl font-display font-bold text-slate-900 mb-8">Voyage Itinerary</h2>
                <div className="space-y-8 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
                  {cruise.itineraries.map((day, idx) => (
                    <div key={day.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                      <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-white bg-brand-100 text-brand-600 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                        <span className="font-bold text-sm">{day.dayNumber}</span>
                      </div>
                      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-slate-50 p-6 rounded-2xl border border-slate-100 shadow-sm transition-all duration-300 hover:shadow-md hover:bg-white hover:border-brand-100">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-bold text-lg text-slate-900">{day.title}</h4>
                          {day.timeOfDay && <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-2 py-1 rounded-md">{day.timeOfDay}</span>}
                        </div>
                        <div className="prose prose-sm text-slate-600" dangerouslySetInnerHTML={{ __html: day.description || '' }} />
                        {day.images && day.images.length > 0 && (
                          <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                            {day.images.map((img, i) => (
                              <img key={i} src={img} alt="Day highlight" className="w-20 h-20 rounded-lg object-cover shrink-0" />
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-4 space-y-8">
            <div className="sticky top-32">
              <div className="bg-brand-900 text-white p-8 rounded-t-[2rem] text-center border-b border-brand-800">
                <Anchor className="w-12 h-12 mx-auto mb-4 text-brand-400" />
                <h3 className="text-2xl font-display font-bold mb-2">Ready to Set Sail?</h3>
                <p className="text-brand-200 text-sm">Send us your details and our cruise specialists will contact you to customize this voyage.</p>
              </div>
              <div className="bg-white rounded-b-[2rem] shadow-xl border border-slate-100 -mt-2 relative z-10 overflow-hidden">
                <ContactForm />
              </div>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
