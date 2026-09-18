import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import ContactForm from '@/components/ui/ContactForm'; // Assuming we have one, otherwise we'll just put raw form

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Contact Us | Exploration Tours' };

export default async function ContactPage() {
  const globalSetting = await prisma.setting.findUnique({ where: { key: 'global_settings' } });
  const global = globalSetting ? JSON.parse(globalSetting.value) : { phone: '+91 99999 99999', email: 'info@explorationtours.com', address: 'Jaipur, Rajasthan' };
  
  const setting = await prisma.setting.findUnique({ where: { key: 'page_contact' } });
  const data = setting ? JSON.parse(setting.value) : {
    title: 'Get In Touch',
    subtitle: 'Ready to plan your trip? Contact our travel experts today.',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14234.34!2d75.82!3d26.91!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDU0JzM2LjAiTiA3NcKwNDknMTIuMCJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin'
  };

  return (
    <main className="w-full bg-slate-50 min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-display text-slate-900 mb-4">{data.title}</h1>
          <p className="text-lg text-slate-600">{data.subtitle}</p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Details */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex gap-4">
              <div className="w-12 h-12 bg-blue-50 text-[#045a94] rounded-full flex items-center justify-center shrink-0"><Phone /></div>
              <div><h3 className="text-xl font-bold mb-1">Phone</h3><p className="text-slate-600">{global.phone}</p></div>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex gap-4">
              <div className="w-12 h-12 bg-blue-50 text-[#045a94] rounded-full flex items-center justify-center shrink-0"><Mail /></div>
              <div><h3 className="text-xl font-bold mb-1">Email</h3><p className="text-slate-600">{global.email}</p></div>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex gap-4">
              <div className="w-12 h-12 bg-blue-50 text-[#045a94] rounded-full flex items-center justify-center shrink-0"><MapPin /></div>
              <div><h3 className="text-xl font-bold mb-1">Office Address</h3><p className="text-slate-600">{global.address}</p></div>
            </div>
          </div>
          
          {/* Contact Form OR Map */}
          <div className="bg-white p-2 rounded-2xl shadow-sm border border-slate-100 overflow-hidden h-[500px]">
            <iframe src={data.mapUrl} width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"></iframe>
          </div>
        </div>
      </div>
    </main>
  );
}