import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { deleteBlogPost } from '../actions';

export default async function AdminBlogList() {
  const posts = await prisma.blogPost.findMany({ orderBy: { createdAt: 'desc' } });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Blogs</h1>
        <Link href="/admin/blog/new" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-bold flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Blog
        </Link>
      </div>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b">
              <th className="p-4 font-semibold text-slate-600">Title</th>
              <th className="p-4 font-semibold text-slate-600">Category</th>
              <th className="p-4 font-semibold text-slate-600">Status</th>
              <th className="p-4 font-semibold text-slate-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map(post => (
              <tr key={post.id} className="border-b hover:bg-slate-50">
                <td className="p-4 font-medium">{post.title}</td>
                <td className="p-4">{post.category}</td>
                <td className="p-4">
                  <span className={px-2 py-1 rounded text-xs font-bold }>
                    {post.isPublished ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="p-4 flex gap-2">
                  <Link href={/admin/blog/} className="p-2 bg-blue-50 text-blue-600 rounded hover:bg-blue-100"><Edit className="w-4 h-4" /></Link>
                  <form action={deleteBlogPost.bind(null, post.id)}>
                    <button type="submit" className="p-2 bg-red-50 text-red-600 rounded hover:bg-red-100"><Trash2 className="w-4 h-4" /></button>
                  </form>
                </td>
              </tr>
            ))}
            {posts.length === 0 && (
              <tr><td colSpan={4} className="p-8 text-center text-slate-500">No blog posts found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
