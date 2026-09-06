import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { deleteDestination } from '../actions';
import DeleteButton from '@/components/admin/DeleteButton';

export const dynamic = 'force-dynamic';

export default async function DestinationsPage() {
  const destinations = await prisma.destination.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Destinations</h1>
        <Link 
          href="/admin/destinations/new" 
          className="bg-brand-500 hover:bg-brand-600 text-white px-4 py-2 rounded-md font-medium transition"
        >
          + Add New Destination
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 text-sm uppercase tracking-wider">
              <th className="p-4 font-medium">Name</th>
              <th className="p-4 font-medium">Region</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium">Featured</th>
              <th className="p-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm">
            {destinations.length > 0 ? destinations.map(dest => (
              <tr key={dest.id} className="hover:bg-gray-50 transition">
                <td className="p-4 font-medium text-gray-900">{dest.name}</td>
                <td className="p-4 text-gray-600 capitalize">{dest.region}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${dest.isPublished ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                    {dest.isPublished ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="p-4 text-gray-600">{dest.isFeatured ? 'Yes' : 'No'}</td>
                <td className="p-4 text-right space-x-4">
                  <Link href={`/admin/destinations/${dest.id}`} className="text-blue-600 hover:underline">Edit</Link>
                  <form action={deleteDestination.bind(null, dest.id)} className="inline">
                    <DeleteButton />
                  </form>
                </td>
              </tr>
            )) : (
              <tr><td colSpan={5} className="p-8 text-center text-gray-500">No destinations found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}