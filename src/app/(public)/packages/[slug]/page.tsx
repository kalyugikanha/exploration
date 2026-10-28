import { prisma } from '@/lib/prisma';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MapPin, Clock, Calendar, CheckCircle2, DollarSign, Shield, Phone, Sparkles } from 'lucide-react';
import ContactForm from '@/components/ui/ContactForm';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  try {
    const pkg = await prisma.package.findUnique({ where: { slug: params.slug } });
    if (!pkg) return { title: 'Package | Exploration Tours' };
    return {
      title: `${pkg.seoTitle || pkg.title} | Exploration Tours`,
      description: pkg.seoDesc || pkg.shortDesc
    };
  } catch (e) {
    return { title: 'Package Details | Exploration Tours' };
  }
}

export default async function PackageDetailPage({ params }: { params: { slug: string } }) {
  let pkg: any = null;
  try {
    pkg = await prisma.package.findUnique({
      where: { slug: params.slug },
      include: {
        destination: true,
        itineraries: { orderBy: { dayNumber: 'asc' } }
      }
    });
  } catch (error) {
    console.error('Error fetching package:', error);
  }

  // Fallbacks for seed/catalog packages
  const fallbackPackages: Record<string, any> = {
    'mesmerizing-maldives-retreat': {
      title: 'Mesmerizing Maldives Retreat',
      slug: 'mesmerizing-maldives-retreat',
      duration: '5 Days / 4 Nights',
      priceFrom: 1850,
      shortDesc: 'Experience luxury at its finest with pristine beaches, overwater villas, and crystal-clear waters.',
      content: '<p>Indulge in the quintessential island fantasy. Stay in an overwater villa perched above a turquoise lagoon, enjoy private sandbank breakfasts, unwind at underwater spas, and snorkel among vibrant coral reefs teeming with marine life.</p>',
      heroImage: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=1600',
      gallery: [
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800',
        'https://images.unsplash.com/photo-1512100356356-de1b84283e18?q=80&w=800',
        'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=800'
      ],
      destination: { name: 'Maldives' },
      isPublished: true,
      itineraries: [
        {
          dayNumber: 1,
          title: 'Arrival in Malé & Seaplane Transfer',
          timeOfDay: 'Afternoon',
          description: 'Arrive at Velana International Airport. Meet your luxury resort host and take a scenic seaplane transfer soaring over breathtaking atolls. Settle into your premium overwater villa and enjoy a sunset welcome dinner.',
          images: ['https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=800']
        },
        {
          dayNumber: 2,
          title: 'Private Lagoon Snorkeling & Coral Safari',
          timeOfDay: 'Morning & Afternoon',
          description: 'Embark on a guided marine safari to swim alongside sea turtles and manta rays in house reefs. Spend the afternoon relaxing at your private sundeck plunge pool.',
          images: ['https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800']
        },
        {
          dayNumber: 3,
          title: 'Sandbank Picnic & Sunset Dolphin Cruise',
          timeOfDay: 'Full Day',
          description: 'Sail via traditional Dhoni boat to a deserted white sandbank for an exclusive chef-prepared champagne picnic. In the evening, watch wild spinner dolphins leaping against golden sunset hues.',
          images: ['https://images.unsplash.com/photo-1512100356356-de1b84283e18?q=80&w=800']
        },
        {
          dayNumber: 4,
          title: 'Overwater Spa & Candlelight Beach Dinner',
          timeOfDay: 'Evening',
          description: 'Pamper yourself with bespoke Ayurvedic and aromatherapy wellness treatments. Finish the night with a five-course private candlelit dinner directly on the water’s edge.',
          images: ['https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=800']
        },
        {
          dayNumber: 5,
          title: 'Farewell Maldives & Departure',
          timeOfDay: 'Morning',
          description: 'Enjoy a leisurely breakfast over the lagoon before your scenic speedboat or seaplane transfer back to Malé for your onward flight.',
          images: []
        }
      ]
    },
    'swiss-alps-adventure': {
      title: 'Swiss Alps Adventure',
      slug: 'swiss-alps-adventure',
      duration: '7 Days / 6 Nights',
      priceFrom: 2450,
      shortDesc: 'Discover the breathtaking scenery of Switzerland with guided alpine tours, Glacier Express journeys, and premium resorts.',
      content: '<p>A masterpiece of natural grandeur. Journey through snow-kissed peaks, fairytale pine valleys, panoramic alpine cogwheel trains, and charming car-free villages nestled at the foot of the iconic Matterhorn.</p>',
      heroImage: 'https://images.unsplash.com/photo-1527668752968-14dc70a27c95?q=80&w=1600',
      gallery: [
        'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=800',
        'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800'
      ],
      destination: { name: 'Switzerland' },
      isPublished: true,
      itineraries: [
        {
          dayNumber: 1,
          title: 'Arrival in Zurich & Scenic Train to Lucerne',
          timeOfDay: 'Afternoon',
          description: 'Land in Zurich and board the premium Swiss railway along crystal blue lakes to historic Lucerne. Walk the medieval Chapel Bridge and enjoy lakefront fondue.',
          images: ['https://images.unsplash.com/photo-1527668752968-14dc70a27c95?q=80&w=800']
        },
        {
          dayNumber: 2,
          title: 'Mount Pilatus Dragon Ride & Lake Lucerne Cruise',
          timeOfDay: 'Full Day',
          description: 'Ascend the world\'s steepest cogwheel railway to the summit of Mt. Pilatus. Descend via aerial cableway and cruise back across Lake Lucerne on a historic paddle steamer.',
          images: ['https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=800']
        },
        {
          dayNumber: 3,
          title: 'Interlaken & Jungfraujoch — Top of Europe',
          timeOfDay: 'Full Day',
          description: 'Travel through the Bernese Oberland to Jungfraujoch at 3,454m altitude. Explore the Ice Palace and panoramic Sphinx Observatory overlooking the Aletsch Glacier.',
          images: ['https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800']
        },
        {
          dayNumber: 4,
          title: 'Zermatt & Matterhorn Viewpoints',
          timeOfDay: 'Full Day',
          description: 'Transfer to the car-free mountain haven of Zermatt. Ride the Gornergrat railway for unparalleled panoramas of the pyramid-shaped Matterhorn.',
          images: []
        }
      ]
    },
    'golden-triangle-india': {
      title: 'Golden Triangle India Heritage Tour',
      slug: 'golden-triangle-india',
      duration: '8 Days / 7 Nights',
      priceFrom: 1150,
      shortDesc: 'Explore the majestic history of India through Delhi, Agra, and Jaipur in this immersive cultural tour.',
      content: '<p>Witness India\'s most celebrated heritage corridor. From the monumental Mughal forts of Old Delhi and the ethereal ivory marble of the Taj Mahal in Agra, to the royal pink palaces and hilltop forts of Jaipur.</p>',
      heroImage: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=1600',
      gallery: [
        'https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=800',
        'https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=800'
      ],
      destination: { name: 'Rajasthan' },
      isPublished: true,
      itineraries: [
        {
          dayNumber: 1,
          title: 'Arrival in New Delhi & Welcome Reception',
          timeOfDay: 'Afternoon',
          description: 'Welcome to India! Meet our private chauffeur and tour manager at IGI Airport. Check in to your luxury hotel and enjoy an evening orientation dinner.',
          images: ['https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=800']
        },
        {
          dayNumber: 2,
          title: 'Old & New Delhi Heritage Circuit',
          timeOfDay: 'Full Day',
          description: 'Explore Jama Masjid, rickshaw ride through bustling Chandni Chowk spice markets, drive past India Gate and Rashtrapati Bhavan, and visit Humayun\'s Tomb.',
          images: []
        },
        {
          dayNumber: 3,
          title: 'Express Highway to Agra & Sunset Taj Mahal',
          timeOfDay: 'Morning & Evening',
          description: 'Chauffeured drive via Yamuna Expressway to Agra. In the late afternoon, experience the magical golden sunset illumination over the majestic Taj Mahal.',
          images: ['https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=800']
        },
        {
          dayNumber: 4,
          title: 'Fatehpur Sikri & Royal Arrival in Jaipur',
          timeOfDay: 'Full Day',
          description: 'Visit the red-sandstone ghost city of Fatehpur Sikri en route to Jaipur, the famed Pink City of Rajasthan. Traditional Rajasthani cultural dinner.',
          images: ['https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=800']
        },
        {
          dayNumber: 5,
          title: 'Amber Fort & City Palace of Jaipur',
          timeOfDay: 'Full Day',
          description: 'Ascend to the hilltop Amber Fort. Visit the iconic Hawa Mahal (Palace of Winds), the sprawling City Palace complex, and Jantar Mantar observatory.',
          images: []
        }
      ]
    }
  };

  if (!pkg && fallbackPackages[params.slug]) {
    pkg = fallbackPackages[params.slug];
  }

  // If still not found by exact slug, check if fallback packages contains any partial match or default
  if (!pkg) {
    const keys = Object.keys(fallbackPackages);
    const matchedKey = keys.find(k => params.slug.includes(k) || k.includes(params.slug));
    if (matchedKey) {
      pkg = fallbackPackages[matchedKey];
    }
  }

  if (!pkg) notFound();

  const itineraries = pkg.itineraries || [];

  return (
    <main className="w-full bg-slate-50 min-h-screen pb-24">
      {/* 1. HERO SECTION */}
      <section className="relative w-full h-[60vh] min-h-[500px]">
        <Image
          src={pkg.heroImage || 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1600'}
          alt={pkg.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/50 to-slate-900/20"></div>

        <div className="absolute inset-0 flex items-end pb-16">
          <div className="max-w-7xl mx-auto px-4 md:px-8 w-full">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              {pkg.destination?.name && (
                <div className="inline-flex items-center gap-1.5 bg-[#045a94] text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
                  <MapPin className="w-3.5 h-3.5" />
                  {pkg.destination.name}
                </div>
              )}
              {pkg.duration && (
                <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-xs font-bold tracking-wider">
                  <Clock className="w-3.5 h-3.5 text-brand-300" />
                  {pkg.duration}
                </div>
              )}
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 leading-tight max-w-4xl drop-shadow-md">
              {pkg.title}
            </h1>

            {pkg.priceFrom && (
              <div className="text-white/95 font-medium text-lg flex items-center gap-2">
                <span className="text-sm uppercase tracking-wider text-slate-300">Starting from</span>
                <span className="text-3xl font-display font-bold text-brand-300">${pkg.priceFrom}</span>
                <span className="text-xs text-slate-400">/ person</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 2. MAIN CONTENT + SIDEBAR GRID */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 -mt-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-10">
          
          {/* LEFT COLUMN: Overview, Day-Wise Itinerary, Gallery */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* Overview Card */}
            <div className="bg-white p-8 md:p-10 rounded-[2rem] shadow-sm border border-slate-100">
              <h2 className="text-2xl md:text-3xl font-display font-bold text-slate-900 mb-6 flex items-center gap-3">
                <Sparkles className="w-6 h-6 text-[#045a94]" /> Tour Overview
              </h2>
              <div
                className="prose prose-lg prose-slate max-w-none text-slate-600 leading-relaxed font-light"
                dangerouslySetInnerHTML={{ __html: pkg.content || pkg.shortDesc || '' }}
              />

              {/* Included Highlights */}
              <div className="mt-8 pt-8 border-t border-slate-100 grid sm:grid-cols-2 gap-4">
                {[
                  'Handpicked Luxury Accommodations',
                  'Dedicated Private Chauffeur & Transfers',
                  'Expert English-Speaking Local Guides',
                  'Curated Daily Breakfast & Special Dinners',
                  'Priority / Skip-the-Line Monument Passes',
                  '24/7 VIP Concierge & On-Ground Support'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-slate-700 font-medium text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* DAY-WISE ITINERARY PLAN SECTION */}
            <div className="bg-white p-8 md:p-10 rounded-[2rem] shadow-sm border border-slate-100">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-slate-100">
                <div>
                  <h2 className="text-2xl md:text-3xl font-display font-bold text-slate-900 flex items-center gap-3">
                    <Calendar className="w-7 h-7 text-[#045a94]" /> Day-by-Day Itinerary Plan
                  </h2>
                  <p className="text-slate-500 text-sm mt-1">
                    Carefully choreographed day-wise breakdown designed for seamless exploration.
                  </p>
                </div>
                {pkg.duration && (
                  <span className="self-start sm:self-auto bg-slate-100 text-slate-700 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                    {pkg.duration}
                  </span>
                )}
              </div>

              {itineraries.length > 0 ? (
                <div className="space-y-8 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-brand-200 before:via-slate-200 before:to-transparent">
                  {itineraries.map((day: any) => (
                    <div
                      key={day.id || day.dayNumber}
                      className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
                    >
                      {/* Day Number Badge */}
                      <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-white bg-[#045a94] text-white shadow-md shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                        <span className="font-bold text-sm">D{day.dayNumber}</span>
                      </div>

                      {/* Content Box */}
                      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-slate-50 p-6 md:p-7 rounded-2xl border border-slate-100 shadow-sm transition-all duration-300 hover:shadow-md hover:bg-white hover:border-[#045a94]/30">
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                          <h4 className="font-bold text-lg text-slate-900 leading-snug">
                            {day.title}
                          </h4>
                          {day.timeOfDay && (
                            <span className="text-xs font-bold uppercase tracking-wider text-[#045a94] bg-sky-50 px-2.5 py-1 rounded-md border border-sky-100">
                              {day.timeOfDay}
                            </span>
                          )}
                        </div>

                        {day.description && (
                          <div
                            className="prose prose-sm text-slate-600 leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: day.description }}
                          />
                        )}

                        {day.images && day.images.length > 0 && (
                          <div className="flex gap-2.5 mt-4 overflow-x-auto pb-2">
                            {day.images.map((img: string, i: number) => (
                              <div key={i} className="relative w-24 h-20 rounded-xl overflow-hidden shrink-0 border border-slate-200 shadow-sm">
                                <Image src={img} alt={`Day ${day.dayNumber} highlight`} fill className="object-cover" />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                  <p className="text-slate-500 font-medium">
                    Our travel specialists curate custom daily schedules for this package upon booking.
                  </p>
                </div>
              )}
            </div>

            {/* Gallery (if available) */}
            {pkg.gallery && pkg.gallery.length > 0 && (
              <div className="bg-white p-8 md:p-10 rounded-[2rem] shadow-sm border border-slate-100">
                <h2 className="text-2xl md:text-3xl font-display font-bold text-slate-900 mb-6">
                  Experience Gallery
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {pkg.gallery.map((img: string, idx: number) => (
                    <div key={idx} className="relative h-44 rounded-2xl overflow-hidden group">
                      <Image
                        src={img}
                        alt={`Package gallery photo ${idx + 1}`}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* RIGHT COLUMN: Sticky Booking & Inquiry Form */}
          <div className="lg:col-span-4 space-y-8">
            <div className="sticky top-28">
              
              <div className="bg-gradient-to-br from-slate-900 via-[#045a94] to-[#022238] text-white p-8 rounded-t-[2.5rem] shadow-xl relative overflow-hidden">
                <div className="relative z-10">
                  <span className="text-xs font-bold uppercase tracking-widest text-brand-300 block mb-2">
                    Bespoke Customization
                  </span>
                  <h3 className="text-2xl font-display font-bold mb-2">Book / Customize This Tour</h3>
                  <p className="text-slate-200 text-sm leading-relaxed font-light">
                    Want to modify this itinerary, adjust hotel categories, or add private excursions? Send your request below.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-b-[2.5rem] shadow-xl border border-slate-100 -mt-2 relative z-10 overflow-hidden">
                <ContactForm />
              </div>

              {/* Trust Box */}
              <div className="mt-6 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <h5 className="font-bold text-slate-900 text-sm">100% Tailored Guarantee</h5>
                  <p className="text-slate-500 text-xs mt-0.5">
                    Zero rigid schedules. Every package is fully customizable to your exact dates.
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
