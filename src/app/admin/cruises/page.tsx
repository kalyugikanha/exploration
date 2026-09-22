import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Plus, Edit, Trash2, Anchor } from 'lucide-react';
// import { deleteCruise } from '../actions'; // I will add this to actions.ts

export default async function AdminCruisesList() {
  const items = await prisma.cruise.findMany({ orderBy: { createdAt: 'desc' } });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Cruises</h1>
        <Link href="/admin/cruises/new" className="bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded font-bold flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Cruise
        </Link>
      </div>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b">
              <th className="p-4 font-semibold text-slate-600">Image</th>
              <th className="p-4 font-semibold text-slate-600">Title</th>
              <th className="p-4 font-semibold text-slate-600">Region</th>
              <th className="p-4 font-semibold text-slate-600">Status</th>
              <th className="p-4 font-semibold text-slate-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id} className="border-b hover:bg-slate-50">
                <td className="p-4">
                  {item.heroImage ? <img src={item.heroImage} className="w-16 h-12 object-cover rounded" /> : <div className="w-16 h-12 bg-slate-100 flex items-center justify-center rounded"><Anchor className="w-4 h-4 text-slate-400" /></div>}
                </td>
                <td className="p-4 font-medium">{item.title}</td>
                <td className="p-4">{item.region || '-'}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${item.isPublished ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}>
                    {item.isPublished ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="p-4 flex gap-2">
                  <Link href={`/admin/cruises/${item.id}`} className="p-2 bg-blue-50 text-brand-600 rounded hover:bg-blue-100"><Edit className="w-4 h-4" /></Link>
                  <form>
                    <button type="button" className="p-2 bg-red-50 text-red-600 rounded hover:bg-red-100"><Trash2 className="w-4 h-4" /></button>
                  </form>
                </td>
              </tr>
            ))}
            {items.length === 0 && <tr><td colSpan={5} className="p-8 text-center text-slate-500">No cruises found.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
