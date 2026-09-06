import { prisma } from '@/lib/prisma';
import { savePageSettings } from '../../actions';

export const dynamic = 'force-dynamic';

export default async function AdminHomePage() {
  const setting = await prisma.setting.findUnique({ where: { key: 'page_home' } });
  const data = setting ? JSON.parse(setting.value) : {
    heroTitle: 'Discover Your Next Great Adventure',
    heroSubtitle: '21 years of crafting unforgettable bespoke travel experiences across the globe.',
    heroImage: '/images/hero-banner.jpg',
    heroAlign: 'center',
    heroShowSubtitle: 'on',
    heroBtn1Text: 'Plan Your Trip',
    heroBtn1Link: '/contact',
    heroShowBtn1: 'on',
    statsTitle: 'The Exploration Tours Difference',
    statsYears: '21+',
    statsDestinations: '50+',
    statsTravellers: '10k+',
  };

  return (
    <div className="max-w-4xl pb-20">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Edit Home Page</h1>
        <p className="text-gray-500 mt-2">Manage the content and layout of your public homepage section by section.</p>
      </div>

      <form action={savePageSettings} className="space-y-8">
        <input type="hidden" name="pageKey" value="page_home" />
        
        {/* HERO SECTION */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-slate-50 px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-bold text-slate-800">1. Hero Section</h2>
          </div>
          <div className="p-6 space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Background Image URL</label>
                <input type="text" name="heroImage" defaultValue={data.heroImage} className="w-full px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-brand-500" />
                <p className="mt-1 text-xs text-gray-500">Recommended: 1920x1080px (16:9). Keep subject centered.</p>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Main Title</label>
                <input type="text" name="heroTitle" defaultValue={data.heroTitle} className="w-full px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-brand-500 text-lg font-bold" />
              </div>

              <div className="md:col-span-2 border border-gray-100 p-4 rounded-lg bg-gray-50/50">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">Subtitle</label>
                  <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                    <input type="checkbox" name="heroShowSubtitle" defaultChecked={data.heroShowSubtitle === 'on'} className="rounded text-brand-600" />
                    Show Subtitle
                  </label>
                </div>
                <textarea name="heroSubtitle" defaultValue={data.heroSubtitle} rows={2} className="w-full px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-brand-500" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Text Alignment</label>
                <select name="heroAlign" defaultValue={data.heroAlign} className="w-full px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-brand-500 bg-white">
                  <option value="left">Left Aligned</option>
                  <option value="center">Center Aligned</option>
                  <option value="right">Right Aligned</option>
                </select>
              </div>

              <div className="border border-gray-100 p-4 rounded-lg bg-gray-50/50">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">Primary Button</label>
                  <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                    <input type="checkbox" name="heroShowBtn1" defaultChecked={data.heroShowBtn1 === 'on'} className="rounded text-brand-600" />
                    Show Button
                  </label>
                </div>
                <div className="space-y-3">
                  <input type="text" name="heroBtn1Text" defaultValue={data.heroBtn1Text} placeholder="Button Text" className="w-full px-3 py-1.5 border rounded-md text-sm" />
                  <input type="text" name="heroBtn1Link" defaultValue={data.heroBtn1Link} placeholder="Link (e.g. /contact)" className="w-full px-3 py-1.5 border rounded-md text-sm" />
                </div>
              </div>
            </div>
            
          </div>
        </div>

        {/* STATS SECTION */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-slate-50 px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-bold text-slate-800">2. Stats / Why Choose Us Section</h2>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">Section Title</label>
              <input type="text" name="statsTitle" defaultValue={data.statsTitle} className="w-full px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-brand-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Years of Expertise</label>
              <input type="text" name="statsYears" defaultValue={data.statsYears} className="w-full px-4 py-2 border rounded-md outline-none font-bold text-xl text-center" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Global Destinations</label>
              <input type="text" name="statsDestinations" defaultValue={data.statsDestinations} className="w-full px-4 py-2 border rounded-md outline-none font-bold text-xl text-center" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Happy Travellers</label>
              <input type="text" name="statsTravellers" defaultValue={data.statsTravellers} className="w-full px-4 py-2 border rounded-md outline-none font-bold text-xl text-center" />
            </div>
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 md:left-64 bg-white border-t p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-40 flex justify-end">
          <button type="submit" className="bg-brand-600 hover:bg-brand-700 text-white font-bold py-2.5 px-8 rounded-md transition">
            Save Home Page Settings
          </button>
        </div>
      </form>
    </div>
  );
}