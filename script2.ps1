$utf8 = New-Object System.Text.UTF8Encoding $false

# 2. Blog Form (Retry)
$blogForm = @"
import { prisma } from '@/lib/prisma';
import { saveBlogPost } from '../../actions';

export default async function AdminBlogForm({ params }: { params: { id: string } }) {
  const isNew = params.id === 'new';
  const post = !isNew ? await prisma.blogPost.findUnique({ where: { id: params.id } }) : null;

  return (
    <div className="max-w-4xl bg-white p-6 rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6">{isNew ? 'Add Blog Post' : 'Edit Blog Post'}</h1>
      <form action={saveBlogPost} className="space-y-4">
        <input type="hidden" name="id" value={params.id} />
        
        <div><label className="block text-sm font-semibold mb-1">Title</label>
        <input type="text" name="title" defaultValue={post?.title || ''} className="w-full p-2 border rounded" required /></div>
        
        <div><label className="block text-sm font-semibold mb-1">Category</label>
        <input type="text" name="category" defaultValue={post?.category || ''} className="w-full p-2 border rounded" /></div>
        
        <div><label className="block text-sm font-semibold mb-1">Featured Image URL</label>
        <input type="text" name="featuredImage" defaultValue={post?.featuredImage || ''} className="w-full p-2 border rounded" /></div>
        
        <div><label className="block text-sm font-semibold mb-1">Intro Text</label>
        <textarea name="introText" defaultValue={post?.introText || ''} className="w-full p-2 border rounded h-20" /></div>
        
        <div><label className="block text-sm font-semibold mb-1">Content (HTML allowed)</label>
        <textarea name="content" defaultValue={post?.content || ''} className="w-full p-2 border rounded h-64 font-mono text-sm" /></div>
        
        <div className="flex items-center gap-2">
          <input type="checkbox" name="isPublished" id="isPublished" defaultChecked={post?.isPublished ?? true} className="w-4 h-4" />
          <label htmlFor="isPublished" className="font-semibold text-sm">Published</label>
        </div>

        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded font-bold hover:bg-blue-700">Save Post</button>
      </form>
    </div>
  );
}
"@
[System.IO.File]::WriteAllText("src\app\admin\blog\[id]\page.tsx", $blogForm, $utf8)

# 4. Testimonials List
$testiList = @"
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
"@
[System.IO.File]::WriteAllText("src\app\admin\testimonials\page.tsx", $testiList, $utf8)

# 5. Testimonial Form
$testiForm = @"
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

        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded font-bold hover:bg-blue-700">Save Testimonial</button>
      </form>
    </div>
  );
}
"@
[System.IO.File]::WriteAllText("src\app\admin\testimonials\[id]\page.tsx", $testiForm, $utf8)

Write-Host "Testimonials and Blog Form created."
