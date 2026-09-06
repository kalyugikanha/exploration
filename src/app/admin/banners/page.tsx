import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { deleteBanner } from '../actions';
import Image from 'next/image';
import DeleteButton from '@/components/admin/DeleteButton';

export const dynamic = 'force-dynamic';

export default async function BannersPage() {
  const banners = await prisma.banner.findMany({
    orderBy: { order: 'asc' }
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Hero Banners</h1>
        <Link 
          href="/admin/banners/new" 
          className="bg-brand-500 hover:bg-brand-600 text-white px-4 py-2 rounded-md font-medium transition"
        >
          + Add New Banner
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 text-sm uppercase tracking-wider">
              <th className="p-4 font-medium">Preview</th>
              <th className="p-4 font-medium">Title</th>
              <th className="p-4 font-medium">Order</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm">
            {banners.length > 0 ? banners.map(banner => (
              <tr key={banner.id} className="hover:bg-gray-50 transition">
                <td className="p-4">
                  <div className="relative w-32 h-16 bg-gray-200 rounded overflow-hidden">
                    {banner.image && <Image src={banner.image} alt="Banner" fill className="object-cover" />}
                  </div>
                </td>
                <td className="p-4 font-medium text-gray-900">{banner.title}</td>
                <td className="p-4 text-gray-600">{banner.order}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${banner.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                    {banner.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="p-4 text-right space-x-4">
                  <Link href={`/admin/banners/${banner.id}`} className="text-blue-600 hover:underline">Edit</Link>
                  <form action={deleteBanner.bind(null, banner.id)} className="inline">
                    <DeleteButton />
                  </form>
                </td>
              </tr>
            )) : (
              <tr><td colSpan={5} className="p-8 text-center text-gray-500">No banners found. A default fallback banner is currently showing on the homepage.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}