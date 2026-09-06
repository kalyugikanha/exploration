import { prisma } from '@/lib/prisma';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function LeadsAdminPage() {
  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: 'desc' }
  });

  const statusColors: Record<string, string> = {
    new: 'bg-blue-100 text-blue-800',
    contacted: 'bg-yellow-100 text-yellow-800',
    'follow-up': 'bg-orange-100 text-orange-800',
    qualified: 'bg-purple-100 text-purple-800',
    converted: 'bg-green-100 text-green-800',
    closed: 'bg-gray-100 text-gray-800'
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Lead Management</h1>
        <a 
          href="/api/admin/leads/export" 
          target="_blank"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition"
        >
          Export to Excel
        </a>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 text-sm uppercase tracking-wider">
                <th className="p-4 font-medium">Date</th>
                <th className="p-4 font-medium">Name</th>
                <th className="p-4 font-medium">Contact</th>
                <th className="p-4 font-medium">Destination</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {leads.length > 0 ? leads.map(lead => (
                <tr key={lead.id} className="hover:bg-gray-50 transition">
                  <td className="p-4 whitespace-nowrap text-gray-500">{formatDate(lead.createdAt)}</td>
                  <td className="p-4 font-medium text-gray-900">{lead.name}</td>
                  <td className="p-4">
                    <div className="text-gray-900">{lead.phone}</div>
                    <div className="text-gray-500 text-xs">{lead.email}</div>
                  </td>
                  <td className="p-4 text-gray-700">{lead.destination || '-'}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${statusColors[lead.status] || 'bg-gray-100'}`}>
                      {lead.status.replace('-', ' ')}
                    </span>
                  </td>
                  <td className="p-4">
                    <Link href={`/admin/leads/${lead.id}`} className="text-brand-600 hover:text-brand-800 font-medium">
                      View Details
                    </Link>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-500">No leads found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}