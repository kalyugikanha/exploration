import Image from 'next/image';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'About Us | Exploration Tours' };

export default async function AboutPage() {
  const setting = await prisma.setting.findUnique({ where: { key: 'page_about' } });
  const data = setting ? JSON.parse(setting.value) : {
    title: 'About Exploration Tours',
    headerImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1920&auto=format&fit=crop',
    content: '<p>Welcome to Exploration Tours. We craft bespoke journeys...</p>',
    mission: 'To deliver unforgettable travel experiences.',
    vision: 'To be the world\'s leading bespoke travel agency.'
  };

  return (
    <main className="w-full bg-slate-50 min-h-screen">
      <div className="relative w-full h-[50vh] min-h-[400px]">
        <Image src={data.headerImage} alt={data.title} fill className="object-cover" />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white font-display">{data.title}</h1>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 py-20">
        <div className="prose prose-lg max-w-none mb-16" dangerouslySetInnerHTML={{ __html: data.content }}></div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-2xl font-bold mb-4 font-display text-[#045a94]">Our Mission</h3>
            <p className="text-slate-600">{data.mission}</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-2xl font-bold mb-4 font-display text-[#045a94]">Our Vision</h3>
            <p className="text-slate-600">{data.vision}</p>
          </div>
        </div>
      </div>
    </main>
  );
}