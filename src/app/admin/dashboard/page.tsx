import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect('/admin/login');
  }

  const [totalLeads, newLeads, totalDestinations, totalPackages] = await Promise.all([
    prisma.lead.count(),
    prisma.lead.count({ where: { status: 'new' } }),
    prisma.destination.count(),
    prisma.package.count(),
  ]);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-sm font-medium text-gray-500">Total Leads</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">{totalLeads}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-brand-100 ring-1 ring-brand-500/20">
          <h3 className="text-sm font-medium text-brand-600">New Enquiries</h3>
          <p className="text-3xl font-bold text-brand-700 mt-2">{newLeads}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-sm font-medium text-gray-500">Destinations</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">{totalDestinations}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-sm font-medium text-gray-500">Packages</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">{totalPackages}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Welcome back, {session.user?.name}</h2>
        <p className="text-gray-600">
          Use the sidebar to manage your destinations, packages, website content, and view customer enquiries.
        </p>
      </div>
    </div>
  );
}
