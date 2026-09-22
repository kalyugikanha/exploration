import { prisma } from '@/lib/prisma';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MapPin, Clock, Anchor, CheckCircle2 } from 'lucide-react';
import ContactForm from '@/components/ui/ContactForm';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const cruise = await prisma.cruise.findUnique({ where: { slug: params.slug } });
  if (!cruise) return { title: 'Not Found' };
  return { title: `${cruise.seoTitle || cruise.title} | Exploration Tours`, description: cruise.seoDesc || cruise.shortDesc };
}

export default async function CruiseDetailPage({ params }: { params: { slug: string } }) {
  const cruise = await prisma.cruise.findUnique({
    where: { slug: params.slug },
    include: { itineraries: { orderBy: { dayNumber: 'asc' } } }
  });

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
