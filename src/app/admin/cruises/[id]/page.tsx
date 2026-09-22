import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import CruiseForm from '../CruiseForm';

export default async function AdminCruiseFormPage({ params }: { params: { id: string } }) {
  const isNew = params.id === 'new';
  let cruise = null;

  if (!isNew) {
    cruise = await prisma.cruise.findUnique({ 
      where: { id: params.id },
      include: { itineraries: { orderBy: { dayNumber: 'asc' } } }
    });
  }

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="mb-8">
        <Link href="/admin/cruises" className="text-brand-600 hover:underline text-sm font-bold mb-2 inline-block">&larr; Back to Cruises</Link>
        <h1 className="text-3xl font-bold text-slate-900">{isNew ? 'Create New Cruise' : 'Edit Cruise'}</h1>
      </div>
      <CruiseForm cruise={cruise} isNew={isNew} />
    </div>
  );
}
