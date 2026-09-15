'use client';

import { useState } from 'react';
import { submitComment } from '@/app/admin/actions';

export default function CommentForm({ postId }: { postId: string }) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    const formData = new FormData(e.currentTarget);
    formData.append('postId', postId);
    
    try {
      await submitComment(formData);
      setStatus('success');
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-green-50 text-green-800 p-6 rounded-2xl text-center border border-green-200">
        <h4 className="font-bold text-lg mb-2">Thank you for your comment!</h4>
        <p className="text-sm">Your comment has been submitted and is waiting for approval by our moderators.</p>
        <button onClick={() => setStatus('idle')} className="mt-4 text-green-600 underline text-sm font-bold">Write another comment</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Name *</label>
          <input type="text" name="name" required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#045a94]" />
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Email *</label>
          <input type="email" name="email" required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#045a94]" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-bold text-slate-700 mb-2">Comment *</label>
        <textarea name="content" required rows={5} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#045a94]"></textarea>
      </div>
      {status === 'error' && <p className="text-red-500 text-sm font-bold">Something went wrong. Please try again.</p>}
      <button disabled={status === 'submitting'} type="submit" className="bg-[#045a94] text-white font-bold py-3 px-8 rounded-xl hover:bg-[#03426e] transition-colors shadow-lg disabled:opacity-50">
        {status === 'submitting' ? 'Submitting...' : 'Submit Comment'}
      </button>
    </form>
  );
}