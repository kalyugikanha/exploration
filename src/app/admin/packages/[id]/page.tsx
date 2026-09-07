import { prisma } from '@/lib/prisma';
import { savePackage } from '@/app/admin/actions';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function PackageForm({ params }: { params: { id: string } }) {
  const isNew = params.id === 'new';
  let pkg: any = null;
  
  if (!isNew) {
    pkg = await prisma.package.findUnique({ where: { id: params.id } });
  }

  const destinations = await prisma.destination.findMany({
    orderBy: { name: 'asc' }
  });

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{isNew ? 'Create New Package' : 'Edit Package'}</h1>
        <Link href="/admin/packages" className="text-gray-500 hover:text-gray-700">Cancel</Link>
      </div>

      <form action={savePackage} className="space-y-8 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <input type="hidden" name="id" value={isNew ? 'new' : pkg?.id} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input 
              type="text" 
              name="title" 
              defaultValue={pkg?.title} 
              required 
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#045a94] focus:border-[#045a94]" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
            <select 
              name="destinationId" 
              defaultValue={pkg?.destinationId || ''} 
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#045a94] focus:border-[#045a94]"
            >
              <option value="">-- Select Destination --</option>
              {destinations.map(d => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Duration (e.g. 5 Days / 4 Nights)</label>
            <input 
              type="text" 
              name="duration" 
              defaultValue={pkg?.duration} 
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#045a94] focus:border-[#045a94]" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price From (USD)</label>
            <input 
              type="number" 
              step="0.01"
              name="priceFrom" 
              defaultValue={pkg?.priceFrom} 
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#045a94] focus:border-[#045a94]" 
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Hero Image URL</label>
          <input 
            type="url" 
            name="heroImage" 
            defaultValue={pkg?.heroImage} 
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#045a94] focus:border-[#045a94]" 
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
          <textarea 
            name="shortDesc" 
            rows={3}
            defaultValue={pkg?.shortDesc} 
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#045a94] focus:border-[#045a94]" 
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Detailed Content (HTML allowed)</label>
          <textarea 
            name="content" 
            rows={8}
            defaultValue={pkg?.content} 
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#045a94] focus:border-[#045a94] font-mono text-sm" 
          />
        </div>

        <div className="flex gap-6 pt-4 border-t border-gray-100">
          <label className="flex items-center gap-2 cursor-pointer">
            <input 
              type="checkbox" 
              name="isPublished" 
              defaultChecked={isNew ? true : pkg?.isPublished} 
              className="w-4 h-4 text-[#045a94] rounded focus:ring-[#045a94]" 
            />
            <span className="text-sm font-medium">Published</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input 
              type="checkbox" 
              name="isFeatured" 
              defaultChecked={pkg?.isFeatured} 
              className="w-4 h-4 text-[#045a94] rounded focus:ring-[#045a94]" 
            />
            <span className="text-sm font-medium">Featured Package</span>
          </label>
        </div>

        <div className="pt-6">
          <button type="submit" className="bg-[#045a94] text-white px-6 py-2.5 rounded-md hover:bg-[#03426e] font-medium w-full md:w-auto">
            {isNew ? 'Create Package' : 'Update Package'}
          </button>
        </div>
      </form>
    </div>
  );
}