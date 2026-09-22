import { prisma } from '@/lib/prisma';
import { saveTestimonial } from '../../actions';

export default async function AdminTestimonialForm({ params }: { params: { id: string } }) {
  const isNew = params.id === 'new';
  const item = !isNew ? await prisma.testimonial.findUnique({ where: { id: params.id } }) : null;

  return (
    <div className="max-w-2xl bg-white p-6 rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6">{isNew ? 'Add Testimonial' : 'Edit Testimonial'}</h1>
      <form action={saveTestimonial} className="space-y-4">
        <input type="hidden" name="id" value={params.id} />
        
        <div><label className="block text-sm font-semibold mb-1">Customer Name</label>
        <input type="text" name="customerName" defaultValue={item?.customerName || ''} className="w-full p-2 border rounded" required /></div>
        
        <div><label className="block text-sm font-semibold mb-1">Rating (1-5)</label>
        <input type="number" name="rating" min="1" max="5" defaultValue={item?.rating || 5} className="w-full p-2 border rounded" required /></div>
        
        <div><label className="block text-sm font-semibold mb-1">Review</label>
        <textarea name="review" defaultValue={item?.review || ''} className="w-full p-2 border rounded h-32" required /></div>
        
        <div className="flex items-center gap-2">
          <input type="checkbox" name="isActive" id="isActive" defaultChecked={item?.isActive ?? true} className="w-4 h-4" />
          <label htmlFor="isActive" className="font-semibold text-sm">Active</label>
        </div>

        <button type="submit" className="bg-brand-700 text-white px-6 py-2 rounded font-bold hover:bg-brand-800">Save Testimonial</button>
      </form>
    </div>
  );
}