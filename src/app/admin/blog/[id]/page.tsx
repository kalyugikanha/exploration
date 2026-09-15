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