import { prisma } from '@/lib/prisma';
import { formatDate } from '@/lib/utils';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export default async function LeadDetailPage({ params }: { params: { id: string } }) {
  const lead = await prisma.lead.findUnique({
    where: { id: params.id }
  });

  if (!lead) return notFound();

  // Basic styling mapping for status tags
  const statusColors: Record<string, string> = {
    new: 'bg-blue-100 text-blue-800',
    contacted: 'bg-yellow-100 text-yellow-800',
    'follow-up': 'bg-orange-100 text-orange-800',
    qualified: 'bg-purple-100 text-purple-800',
    converted: 'bg-green-100 text-green-800',
    closed: 'bg-gray-100 text-gray-800'
  };

  return (
    <div className="max-w-4xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <Link href="/admin/leads" className="text-brand-600 hover:underline text-sm mb-2 inline-block">&larr; Back to Leads</Link>
          <h1 className="text-3xl font-bold text-gray-900">Lead Details</h1>
        </div>
        <span className={`px-4 py-1.5 rounded-full text-sm font-semibold capitalize ${statusColors[lead.status] || 'bg-gray-100'}`}>
          {lead.status.replace('-', ' ')}
        </span>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8">
        <div className="p-6 border-b border-gray-100 bg-gray-50/50">
          <h2 className="text-lg font-semibold text-gray-900">Customer Information</h2>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-500 mb-1">Full Name</p>
            <p className="font-medium text-gray-900">{lead.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Email</p>
            <p className="font-medium text-gray-900"><a href={`mailto:${lead.email}`} className="text-brand-600 hover:underline">{lead.email}</a></p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Phone / WhatsApp</p>
            <p className="font-medium text-gray-900"><a href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="text-brand-600 hover:underline">{lead.phone}</a></p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Submitted On</p>
            <p className="font-medium text-gray-900">{formatDate(lead.createdAt)}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8">
        <div className="p-6 border-b border-gray-100 bg-gray-50/50">
          <h2 className="text-lg font-semibold text-gray-900">Travel Requirements</h2>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-500 mb-1">Travel Type</p>
            <p className="font-medium text-gray-900">{lead.travelType || 'N/A'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Destination</p>
            <p className="font-medium text-gray-900">{lead.destination || 'N/A'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Travel Date</p>
            <p className="font-medium text-gray-900">{lead.travelDate || 'N/A'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Travellers</p>
            <p className="font-medium text-gray-900">{lead.numTravellers || 'N/A'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Budget</p>
            <p className="font-medium text-gray-900">{lead.budget || 'N/A'}</p>
          </div>
        </div>
        {lead.message && (
          <div className="p-6 pt-0 border-t border-gray-100 mt-6">
            <p className="text-sm text-gray-500 mb-2 mt-6">Message / Requirements</p>
            <div className="bg-gray-50 p-4 rounded-lg text-gray-700 whitespace-pre-wrap">{lead.message}</div>
          </div>
        )}
      </div>
      
      {/* Todo: Add Status Update & Notes Form Here */}
    </div>
  );
}