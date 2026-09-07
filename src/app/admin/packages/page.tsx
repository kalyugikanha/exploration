import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Plus, Pencil } from 'lucide-react';
import DeleteButton from '@/components/admin/DeleteButton';
import { deletePackage } from '@/app/admin/actions';

export const dynamic = 'force-dynamic';

export default async function PackagesAdmin() {
  const packages = await prisma.package.findMany({
    include: {
      destination: true
    },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Tour Packages</h1>
        <Link href="/admin/packages/new" className="bg-[#045a94] text-white px-4 py-2 rounded-md hover:bg-[#03426e] flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Package
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="p-4 font-semibold text-gray-600">Title</th>
                <th className="p-4 font-semibold text-gray-600">Destination</th>
                <th className="p-4 font-semibold text-gray-600">Duration</th>
                <th className="p-4 font-semibold text-gray-600">Price From</th>
                <th className="p-4 font-semibold text-gray-600">Status</th>
                <th className="p-4 font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {packages.length === 0 ? (
                <tr><td colSpan={6} className="p-4 text-center text-gray-500">No packages found.</td></tr>
              ) : packages.map((pkg) => (
                <tr key={pkg.id} className="hover:bg-gray-50">
                  <td className="p-4 font-medium">{pkg.title}</td>
                  <td className="p-4">{pkg.destination?.name || '-'}</td>
                  <td className="p-4">{pkg.duration || '-'}</td>
                  <td className="p-4">${pkg.priceFrom || 0}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${pkg.isPublished ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                      {pkg.isPublished ? 'Published' : 'Draft'}
                    </span>
                    {pkg.isFeatured && (
                      <span className="ml-2 px-2 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">Featured</span>
                    )}
                  </td>
                  <td className="p-4 flex gap-2">
                    <Link href={`/admin/packages/${pkg.id}`} className="p-2 text-gray-600 hover:text-[#045a94] bg-gray-100 hover:bg-blue-50 rounded">
                      <Pencil className="w-4 h-4" />
                    </Link>
                    <DeleteButton action={deletePackage} id={pkg.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}