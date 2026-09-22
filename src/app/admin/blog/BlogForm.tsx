'use client';
import { useState } from 'react';
import { saveBlogPost } from '../actions';
import { CheckCircle2, ChevronRight, Image as ImageIcon, Type, Settings, Tag } from 'lucide-react';
import Link from 'next/link';

export default function BlogForm({ post, isNew }: { post: any, isNew: boolean }) {
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState(post?.title || '');
  const [content, setContent] = useState(post?.content || '');
  const [heroImage, setHeroImage] = useState(post?.featuredImage || '');
  
  const steps = [
    { num: 1, title: 'Basics', icon: Type },
    { num: 2, title: 'Content', icon: Type },
    { num: 3, title: 'Media', icon: ImageIcon },
    { num: 4, title: 'SEO', icon: Tag },
  ];

  const essentialsCount = [title, content, heroImage].filter(Boolean).length;

  return (
    <div className="bg-slate-50 min-h-screen -m-6 pb-24">
      {/* Header bar */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-10 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/admin/blog" className="text-slate-500 hover:text-brand-600 font-medium text-sm flex items-center gap-1">
            &larr; Back to Blogs
          </Link>
          <div className="h-6 w-px bg-slate-200"></div>
          <div className="flex items-center gap-2">
            <span className="bg-slate-100 text-slate-700 text-xs font-bold px-2 py-1 rounded-full">{essentialsCount}/3 essentials ready</span>
            {essentialsCount === 3 && <CheckCircle2 className="w-4 h-4 text-green-500" />}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button form="blog-form" type="submit" className="bg-brand-600 hover:bg-brand-700 text-white font-bold py-2 px-6 rounded-lg transition-colors">
            {isNew ? 'Publish Blog' : 'Update Blog'}
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 mt-8 flex gap-8">
        {/* Sidebar Nav */}
        <div className="w-64 shrink-0">
          <div className="bg-white rounded-xl border border-slate-200 p-2 sticky top-24 shadow-sm">
            {steps.map(s => (
              <button key={s.num} onClick={() => setStep(s.num)} className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left mb-1 transition-colors ${step === s.num ? 'bg-brand-50 text-brand-700 font-bold' : 'text-slate-600 hover:bg-slate-50 font-medium'}`}>
                <div className="flex items-center gap-3">
                  <s.icon className={`w-4 h-4 ${step === s.num ? 'text-brand-600' : 'text-slate-400'}`} />
                  {s.num}. {s.title}
                </div>
                {step === s.num && <ChevronRight className="w-4 h-4" />}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Form */}
        <form id="blog-form" action={saveBlogPost} className="flex-1">
          <input type="hidden" name="id" value={post?.id || 'new'} />
          
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            
            {/* Step 1: Basics */}
            <div className={`p-8 ${step !== 1 && 'hidden'}`}>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Step 1: Article Basics</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Article Title *</label>
                  <input type="text" name="title" value={title} onChange={e => setTitle(e.target.value)} required className="w-full px-4 py-3 border border-slate-200 rounded-lg outline-none focus:border-brand-500 font-medium text-lg" placeholder="Write a catchy title..." />
                  <div className="flex justify-between items-center mt-1">
                    <p className="text-xs text-slate-400">Recommended: 40-60 characters for best SEO.</p>
                    <span className="text-xs font-bold text-slate-400">{title.length}/255</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Intro Text (Excerpt) *</label>
                  <textarea name="introText" defaultValue={post?.introText || ''} rows={3} required className="w-full px-4 py-3 border border-slate-200 rounded-lg outline-none focus:border-brand-500 font-medium" placeholder="A short 1-2 sentence summary of the article..."></textarea>
                  <p className="text-xs text-slate-400 mt-1">Recommended: 15-30 words. Displayed on blog cards.</p>
                </div>
                <div className="flex justify-end pt-4"><button type="button" onClick={() => setStep(2)} className="bg-slate-900 text-white px-6 py-2 rounded-lg font-bold">Next Step</button></div>
              </div>
            </div>

            {/* Step 2: Content */}
            <div className={`p-8 ${step !== 2 && 'hidden'}`}>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Step 2: Write your article</h2>
              <p className="text-slate-500 mb-6">Use headings, short paragraphs, lists and links to keep the article easy to scan.</p>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Main Content (Markdown/HTML) *</label>
                  <textarea name="content" value={content} onChange={e => setContent(e.target.value)} rows={16} required className="w-full px-4 py-3 border border-slate-200 rounded-lg outline-none focus:border-brand-500 font-mono text-sm leading-relaxed bg-slate-50" placeholder="## Introduction..."></textarea>
                  <p className="text-xs text-slate-400 mt-1">Recommended: 800 - 1500 words for comprehensive articles.</p>
                </div>
                <div className="flex justify-end pt-4 gap-2">
                  <button type="button" onClick={() => setStep(1)} className="bg-slate-100 text-slate-700 px-6 py-2 rounded-lg font-bold">Back</button>
                  <button type="button" onClick={() => setStep(3)} className="bg-slate-900 text-white px-6 py-2 rounded-lg font-bold">Next Step</button>
                </div>
              </div>
            </div>

            {/* Step 3: Media */}
            <div className={`p-8 ${step !== 3 && 'hidden'}`}>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Step 3: Media & Images</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Featured Image URL (S3 / Unsplash) *</label>
                  <input type="text" name="featuredImage" value={heroImage} onChange={e => setHeroImage(e.target.value)} required className="w-full px-4 py-3 border border-slate-200 rounded-lg outline-none focus:border-brand-500" placeholder="https://..." />
                  <p className="text-xs text-slate-400 mt-1">Format: JPG, PNG, WebP · Max 5MB. Aspect ratio 16:9 recommended.</p>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Cover Image URL (Optional)</label>
                  <input type="text" name="coverImageUrl" defaultValue={post?.coverImageUrl || ''} className="w-full px-4 py-3 border border-slate-200 rounded-lg outline-none focus:border-brand-500" placeholder="https://..." />
                </div>
                <div className="flex justify-end pt-4 gap-2">
                  <button type="button" onClick={() => setStep(2)} className="bg-slate-100 text-slate-700 px-6 py-2 rounded-lg font-bold">Back</button>
                  <button type="button" onClick={() => setStep(4)} className="bg-slate-900 text-white px-6 py-2 rounded-lg font-bold">Next Step</button>
                </div>
              </div>
            </div>

            {/* Step 4: SEO & Publishing */}
            <div className={`p-8 ${step !== 4 && 'hidden'}`}>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Step 4: SEO & Publishing</h2>
              
              <div className="space-y-6">
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" name="isPublished" defaultChecked={isNew ? true : post?.isPublished} className="w-6 h-6 text-brand-600 rounded" />
                    <div>
                      <span className="text-slate-900 font-bold block text-lg">Active (visible on site)</span>
                      <span className="text-slate-500 text-sm">Control whether visitors can see this article.</span>
                    </div>
                  </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Category</label>
                    <select name="category" defaultValue={post?.category || 'Travel Guide'} className="w-full px-4 py-3 border border-slate-200 rounded-lg outline-none bg-white focus:border-brand-500">
                      <option value="Travel Guide">Travel Guide</option>
                      <option value="Tips & Tricks">Tips & Tricks</option>
                      <option value="News">News</option>
                      <option value="Destinations">Destinations</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Author</label>
                    <input type="text" name="author" defaultValue={post?.author || 'Exploration Tours'} className="w-full px-4 py-3 border border-slate-200 rounded-lg outline-none focus:border-brand-500" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">SEO Meta Title</label>
                  <input type="text" name="seoTitle" defaultValue={post?.seoTitle || ''} className="w-full px-4 py-3 border border-slate-200 rounded-lg outline-none focus:border-brand-500" placeholder={title || "Your blog title"} />
                  <p className="text-xs text-slate-400 mt-1">Recommended: 50-60 characters.</p>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">SEO Meta Description</label>
                  <textarea name="seoDesc" defaultValue={post?.seoDesc || ''} rows={3} className="w-full px-4 py-3 border border-slate-200 rounded-lg outline-none focus:border-brand-500" placeholder="Add a concise meta description..."></textarea>
                  <p className="text-xs text-slate-400 mt-1">Recommended: 150-160 characters so readers know what this article is about.</p>
                </div>
                
                <div className="flex justify-end pt-4 gap-2">
                  <button type="button" onClick={() => setStep(3)} className="bg-slate-100 text-slate-700 px-6 py-2 rounded-lg font-bold">Back</button>
                  <button type="submit" className="bg-brand-600 text-white px-8 py-2 rounded-lg font-bold">Save & Publish</button>
                </div>
              </div>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
}
