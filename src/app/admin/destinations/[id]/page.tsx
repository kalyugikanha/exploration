import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import DestinationForm from '../DestinationForm';

export default async function DestinationFormPage({ params }: { params: { id: string } }) {
  const isNew = params.id === 'new';
  let dest = null;

  if (!isNew) {
    dest = await prisma.destination.findUnique({ 
      where: { id: params.id },
      include: { itineraries: { orderBy: { dayNumber: 'asc' } } }
    });
  }

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="mb-8">
        <Link href="/admin/destinations" className="text-brand-600 hover:underline text-sm font-bold mb-2 inline-block">&larr; Back to Destinations</Link>
        <h1 className="text-3xl font-bold text-slate-900">{isNew ? 'Create New Destination' : 'Edit Destination'}</h1>
        <p className="text-slate-500 mt-2">Manage the details, image gallery, and day-by-day itineraries for this destination.</p>
      </div>

      <DestinationForm dest={dest} isNew={isNew} />
    </div>
  );
}