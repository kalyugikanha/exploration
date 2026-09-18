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
