import { prisma } from '@/lib/prisma';
import { saveDestination } from '../../actions';
import Link from 'next/link';

export default async function DestinationFormPage({ params }: { params: { id: string } }) {
  const isNew = params.id === 'new';
  let dest = null;

  if (!isNew) {
    dest = await prisma.destination.findUnique({ where: { id: params.id } });
  }

  return (
    <div className="max-w-3xl">
      <div className="mb-6">
        <Link href="/admin/destinations" className="text-brand-600 hover:underline text-sm mb-2 inline-block">&larr; Back to Destinations</Link>
        <h1 className="text-3xl font-bold text-gray-900">{isNew ? 'Add New Destination' : 'Edit Destination'}</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
        <form action={saveDestination} className="space-y-6">
          <input type="hidden" name="id" value={params.id} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Destination Name *</label>
              <input required type="text" name="name" defaultValue={dest?.name || ''} className="w-full px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-brand-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Region *</label>
              <select name="region" defaultValue={dest?.region || 'international'} className="w-full px-4 py-2 border rounded-md outline-none bg-white focus:ring-2 focus:ring-brand-500">
                <option value="domestic">Domestic (India)</option>
                <option value="international">International</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
            <input type="text" name="country" defaultValue={dest?.country || ''} className="w-full px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-brand-500" placeholder="e.g. UAE, France, India" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Hero Image URL</label>
            <input type="text" name="heroImage" defaultValue={dest?.heroImage || ''} className="w-full px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-brand-500" placeholder="https://example.com/image.jpg" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
            <textarea name="shortDesc" defaultValue={dest?.shortDesc || ''} rows={3} className="w-full px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-brand-500" placeholder="Brief summary for listing cards..."></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Detailed Content</label>
            <textarea name="content" defaultValue={dest?.content || ''} rows={8} className="w-full px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-brand-500" placeholder="Full destination details..."></textarea>
          </div>

          <div className="flex items-center gap-6 pt-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" name="isPublished" defaultChecked={isNew ? true : dest?.isPublished} className="w-5 h-5 text-brand-600 rounded" />
              <span className="text-gray-700 font-medium">Publish immediately</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" name="isFeatured" defaultChecked={dest?.isFeatured} className="w-5 h-5 text-brand-600 rounded" />
              <span className="text-gray-700 font-medium">Show in Featured on Homepage</span>
            </label>
          </div>

          <div className="pt-6 border-t border-gray-100 flex justify-end">
            <button type="submit" className="bg-brand-500 hover:bg-brand-600 text-white font-medium py-2 px-8 rounded-md transition">
              Save Destination
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}