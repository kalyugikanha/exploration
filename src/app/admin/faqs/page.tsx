import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { deleteFaq } from '../actions';

export default async function AdminFaqsList() {
  const items = await prisma.faq.findMany({ orderBy: { order: 'asc' } });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage FAQs</h1>
        <Link href="/admin/faqs/new" className="bg-brand-700 hover:bg-brand-800 text-white px-4 py-2 rounded font-bold flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add FAQ
        </Link>
      </div>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b">
              <th className="p-4 font-semibold text-slate-600">Order</th>
              <th className="p-4 font-semibold text-slate-600">Question</th>
              <th className="p-4 font-semibold text-slate-600">Status</th>
              <th className="p-4 font-semibold text-slate-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id} className="border-b hover:bg-slate-50">
                <td className="p-4">{item.order}</td>
                <td className="p-4 font-medium">{item.question}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${item.isActive ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}>
                    {item.isActive ? 'Active' : 'Hidden'}
                  </span>
                </td>
                <td className="p-4 flex gap-2">
                  <Link href={`/admin/faqs/${item.id}`} className="p-2 bg-brand-50 text-brand-700 rounded hover:bg-brand-100"><Edit className="w-4 h-4" /></Link>
                  <form action={deleteFaq.bind(null, item.id)}>
                    <button type="submit" className="p-2 bg-red-50 text-red-600 rounded hover:bg-red-100"><Trash2 className="w-4 h-4" /></button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

