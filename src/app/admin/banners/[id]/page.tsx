import { prisma } from '@/lib/prisma';
import { saveBanner } from '../../actions';
import Link from 'next/link';

export default async function BannerFormPage({ params }: { params: { id: string } }) {
  const isNew = params.id === 'new';
  let banner = null;

  if (!isNew) {
    banner = await prisma.banner.findUnique({ where: { id: params.id } });
  }

  return (
    <div className="max-w-3xl">
      <div className="mb-6">
        <Link href="/admin/banners" className="text-brand-600 hover:underline text-sm mb-2 inline-block">&larr; Back to Banners</Link>
        <h1 className="text-3xl font-bold text-gray-900">{isNew ? 'Add New Banner' : 'Edit Banner'}</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
        <form action={saveBanner} className="space-y-6">
          <input type="hidden" name="id" value={params.id} />
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Headline / Title *</label>
            <input required type="text" name="title" defaultValue={banner?.title || ''} className="w-full px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-brand-500" placeholder="Discover Your Next Great Adventure" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
            <input type="text" name="subtitle" defaultValue={banner?.subtitle || ''} className="w-full px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-brand-500" placeholder="21 years of crafting unforgettable experiences..." />
          </div>

          <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg">
            <label className="block text-sm font-medium text-gray-900 mb-1">Background Image URL *</label>
            <input required type="text" name="image" defaultValue={banner?.image || ''} className="w-full px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-brand-500 bg-white" placeholder="/images/hero-banner.jpg or https://..." />
            <p className="mt-2 text-xs text-blue-800 font-medium">
              💡 Recommended Size: 1920x1080px (16:9 ratio). Keep the main subject centered so it crops perfectly on mobile devices.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">CTA Button Text</label>
              <input type="text" name="ctaText" defaultValue={banner?.ctaText || ''} className="w-full px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-brand-500" placeholder="Explore Destinations" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">CTA Button Link</label>
              <input type="text" name="ctaLink" defaultValue={banner?.ctaLink || ''} className="w-full px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-brand-500" placeholder="/destinations" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Display Order</label>
              <input type="number" name="order" defaultValue={banner?.order || 0} className="w-full px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-brand-500" placeholder="0" />
            </div>
          </div>

          <div className="flex items-center gap-6 pt-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" name="isActive" defaultChecked={isNew ? true : banner?.isActive} className="w-5 h-5 text-brand-600 rounded" />
              <span className="text-gray-700 font-medium">Set as Active</span>
            </label>
          </div>

          <div className="pt-6 border-t border-gray-100 flex justify-end">
            <button type="submit" className="bg-brand-500 hover:bg-brand-600 text-white font-medium py-2 px-8 rounded-md transition">
              Save Banner
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}