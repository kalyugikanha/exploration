$dirs = @(
  "src\app\admin\blog\[id]",
  "src\app\admin\comments",
  "src\app\admin\testimonials\[id]",
  "src\app\admin\faqs\[id]"
)

foreach ($dir in $dirs) {
  New-Item -ItemType Directory -Force -Path $dir | Out-Null
}

# 1. Blog List
$blogList = @"
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
                  <span className={`px-2 py-1 rounded text-xs font-bold ${post.isPublished ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}>
                    {post.isPublished ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="p-4 flex gap-2">
                  <Link href={`/admin/blog/${post.id}`} className="p-2 bg-blue-50 text-blue-600 rounded hover:bg-blue-100"><Edit className="w-4 h-4" /></Link>
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
"@
Set-Content -Path "src\app\admin\blog\page.tsx" -Value $blogList -Encoding UTF8

# 2. Blog Form
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
Set-Content -Path "src\app\admin\blog\[id]\page.tsx" -Value $blogForm -Encoding UTF8

# 3. Comments List
$commentsList = @"
import { prisma } from '@/lib/prisma';
import { CheckCircle, Trash2 } from 'lucide-react';
import { approveComment, deleteComment } from '../actions';

export default async function AdminCommentsList() {
  const comments = await prisma.comment.findMany({ 
    include: { post: { select: { title: true } } },
    orderBy: { createdAt: 'desc' } 
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Manage Blog Comments</h1>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b">
              <th className="p-4 font-semibold text-slate-600">Commenter</th>
              <th className="p-4 font-semibold text-slate-600">Blog Post</th>
              <th className="p-4 font-semibold text-slate-600">Content</th>
              <th className="p-4 font-semibold text-slate-600">Status</th>
              <th className="p-4 font-semibold text-slate-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {comments.map(comment => (
              <tr key={comment.id} className="border-b hover:bg-slate-50">
                <td className="p-4 text-sm">
                  <p className="font-bold">{comment.name}</p>
                  <p className="text-slate-500">{comment.email}</p>
                </td>
                <td className="p-4 text-sm text-slate-600">{comment.post.title}</td>
                <td className="p-4 text-sm max-w-xs truncate" title={comment.content}>{comment.content}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${comment.isApproved ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {comment.isApproved ? 'Approved' : 'Pending'}
                  </span>
                </td>
                <td className="p-4 flex gap-2">
                  {!comment.isApproved && (
                    <form action={approveComment.bind(null, comment.id)}>
                      <button type="submit" className="p-2 bg-green-50 text-green-600 rounded hover:bg-green-100" title="Approve"><CheckCircle className="w-4 h-4" /></button>
                    </form>
                  )}
                  <form action={deleteComment.bind(null, comment.id)}>
                    <button type="submit" className="p-2 bg-red-50 text-red-600 rounded hover:bg-red-100" title="Delete"><Trash2 className="w-4 h-4" /></button>
                  </form>
                </td>
              </tr>
            ))}
            {comments.length === 0 && (
              <tr><td colSpan={5} className="p-8 text-center text-slate-500">No comments found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
"@
Set-Content -Path "src\app\admin\comments\page.tsx" -Value $commentsList -Encoding UTF8

Write-Host "Blog and Comments scaffolded."
