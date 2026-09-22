import { prisma } from '@/lib/prisma';
import { saveFaq } from '../../actions';

export default async function AdminFaqForm({ params }: { params: { id: string } }) {
  const isNew = params.id === 'new';
  const item = !isNew ? await prisma.faq.findUnique({ where: { id: params.id } }) : null;

  return (
    <div className="max-w-2xl bg-white p-6 rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6">{isNew ? 'Add FAQ' : 'Edit FAQ'}</h1>
      <form action={saveFaq} className="space-y-4">
        <input type="hidden" name="id" value={params.id} />
        
        <div><label className="block text-sm font-semibold mb-1">Question</label>
        <input type="text" name="question" defaultValue={item?.question || ''} className="w-full p-2 border rounded" required /></div>
        
        <div><label className="block text-sm font-semibold mb-1">Answer</label>
        <textarea name="answer" defaultValue={item?.answer || ''} className="w-full p-2 border rounded h-32" required /></div>
        
        <div><label className="block text-sm font-semibold mb-1">Order</label>
        <input type="number" name="order" defaultValue={item?.order || 0} className="w-full p-2 border rounded" /></div>
        
        <div className="flex items-center gap-2">
          <input type="checkbox" name="isActive" id="isActive" defaultChecked={item?.isActive ?? true} className="w-4 h-4" />
          <label htmlFor="isActive" className="font-semibold text-sm">Active</label>
        </div>

        <button type="submit" className="bg-brand-700 text-white px-6 py-2 rounded font-bold hover:bg-brand-800">Save FAQ</button>
      </form>
    </div>
  );
}