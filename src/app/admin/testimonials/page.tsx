import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Plus, Edit, Trash2, Star } from 'lucide-react';
import { deleteTestimonial } from '../actions';

export default async function AdminTestimonialsList() {
  const items = await prisma.testimonial.findMany({ orderBy: { createdAt: 'desc' } });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Testimonials</h1>
        <Link href="/admin/testimonials/new" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-bold flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Testimonial
        </Link>
      </div>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b">
              <th className="p-4 font-semibold text-slate-600">Customer</th>
              <th className="p-4 font-semibold text-slate-600">Rating</th>
              <th className="p-4 font-semibold text-slate-600">Review</th>
              <th className="p-4 font-semibold text-slate-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id} className="border-b hover:bg-slate-50">
                <td className="p-4 font-medium">{item.customerName}</td>
                <td className="p-4 flex text-yellow-400">
                  {Array(item.rating).fill(0).map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </td>
                <td className="p-4 text-sm text-slate-600 max-w-xs truncate">{item.review}</td>
                <td className="p-4 flex gap-2">
                  <Link href={`/admin/testimonials/${item.id}`} className="p-2 bg-blue-50 text-blue-600 rounded hover:bg-blue-100"><Edit className="w-4 h-4" /></Link>
                  <form action={deleteTestimonial.bind(null, item.id)}>
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
