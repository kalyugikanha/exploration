import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import PackageForm from '../PackageForm';

export const dynamic = 'force-dynamic';

export default async function AdminPackageEditPage({ params }: { params: { id: string } }) {
  const isNew = params.id === 'new';
  let pkg: any = null;

  if (!isNew) {
    try {
      pkg = await prisma.package.findUnique({
        where: { id: params.id },
        include: { itineraries: { orderBy: { dayNumber: 'asc' } } }
      });
    } catch (e) {
      console.error('Error fetching package for edit:', e);
    }
  }

  let destinations: any[] = [];
  try {
    destinations = await prisma.destination.findMany({
      orderBy: { name: 'asc' },
      select: { id: true, name: true }
    });
  } catch (e) {
    console.error('Error fetching destinations:', e);
  }

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="mb-8">
        <Link href="/admin/packages" className="text-brand-600 hover:underline text-sm font-bold mb-2 inline-block">
          &larr; Back to Packages
        </Link>
        <h1 className="text-3xl font-bold text-slate-900">
          {isNew ? 'Create New Tour Package' : `Edit Package: ${pkg?.title || ''}`}
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Manage package overview, destination links, gallery, and day-wise itineraries.
        </p>
      </div>

      <PackageForm pkg={pkg} isNew={isNew} destinations={destinations} />
    </div>
  );
}
