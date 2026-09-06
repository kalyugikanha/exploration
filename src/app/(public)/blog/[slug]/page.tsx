import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { Calendar, User, Facebook, Twitter, Linkedin, MessageCircle, ChevronRight } from 'lucide-react';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await prisma.blogPost.findUnique({ where: { slug: params.slug } });
  if (!post) return { title: 'Post Not Found' };
  return {
    title: `${post.seoTitle || post.title} | Exploration Tours`,
    description: post.seoDesc || post.introText,
  };
}

export default async function BlogDetailPage({ params }: { params: { slug: string } }) {
  const post = await prisma.blogPost.findUnique({ where: { slug: params.slug } });

  if (!post || !post.isPublished) notFound();

  // Fetch recent posts for sidebar and related
  const recentPosts = await prisma.blogPost.findMany({
    where: { isPublished: true, slug: { not: params.slug } },
    orderBy: { publishedAt: 'desc' },
    take: 6,
  });

  const sidebarPosts = recentPosts.slice(0, 4);
  const relatedPosts = recentPosts.slice(4, 6);

  return (
    <main className="w-full bg-slate-50 min-h-screen py-32">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* BREADCRUMBS */}
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-8 font-medium">
          <Link href="/" className="hover:text-brand-600 transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/blog" className="hover:text-brand-600 transition-colors">Blog</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-slate-900 truncate max-w-[200px] md:max-w-none">{post.title}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          
          {/* MAIN ARTICLE COLUMN (LEFT) */}
          <div className="w-full lg:w-[70%]">
            
            {/* FEATURED IMAGE */}
            <div className="relative w-full aspect-video rounded-[2rem] overflow-hidden mb-6 shadow-sm">
              <Image 
                src={post.coverImageUrl || post.featuredImage || 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1600&auto=format&fit=crop'} 
                alt={post.title} 
                fill 
                className="object-cover" 
                priority 
              />
              {post.category && (
                <div className="absolute top-4 left-4 bg-brand-600 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                  {post.category}
                </div>
              )}
            </div>

            {/* SOCIAL SHARE & META */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-slate-200 pb-6">
              <div className="flex items-center gap-4 text-slate-500 text-sm font-medium">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-brand-600" />
                  {post.author}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-brand-600" />
                  {new Date(post.publishedAt || post.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-slate-700 mr-2">Share:</span>
                <button className="w-8 h-8 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:-translate-y-1 transition-transform shadow-md"><Facebook className="w-4 h-4" /></button>
                <button className="w-8 h-8 rounded-full bg-[#1DA1F2] text-white flex items-center justify-center hover:-translate-y-1 transition-transform shadow-md"><Twitter className="w-4 h-4" /></button>
                <button className="w-8 h-8 rounded-full bg-[#0A66C2] text-white flex items-center justify-center hover:-translate-y-1 transition-transform shadow-md"><Linkedin className="w-4 h-4" /></button>
                <button className="w-8 h-8 rounded-full bg-[#25D366] text-white flex items-center justify-center hover:-translate-y-1 transition-transform shadow-md"><MessageCircle className="w-4 h-4" /></button>
              </div>
            </div>

            {/* TITLE */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-slate-900 mb-8 leading-tight">
              {post.title}
            </h1>

            {/* CONTENT */}
            <div className="prose prose-lg prose-slate max-w-none prose-headings:font-display prose-headings:font-bold prose-a:text-brand-600 hover:prose-a:text-brand-800 mb-12">
              {post.contentHtml ? (
                <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
              ) : (
                <p>{post.content}</p>
              )}
            </div>

            {/* AUTHOR BIO BOX */}
            <div className="bg-brand-50 rounded-2xl p-6 flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-12 border border-brand-100/50">
              <div className="relative w-24 h-24 rounded-full overflow-hidden shrink-0 border-4 border-white shadow-md">
                <Image src={`https://i.pravatar.cc/150?u=${post.author}`} alt={post.author || 'Author'} fill className="object-cover" />
              </div>
              <div className="text-center sm:text-left">
                <h4 className="text-xl font-bold font-display text-slate-900 mb-2">{post.author}</h4>
                <p className="text-slate-600 text-sm leading-relaxed mb-3">
                  Travel enthusiast and expert guide with over a decade of experience exploring the world's most hidden gems. Dedicated to helping you craft the perfect itinerary.
                </p>
                <div className="flex items-center justify-center sm:justify-start gap-3 text-brand-600">
                  <Facebook className="w-4 h-4 cursor-pointer hover:text-brand-800" />
                  <Twitter className="w-4 h-4 cursor-pointer hover:text-brand-800" />
                  <Linkedin className="w-4 h-4 cursor-pointer hover:text-brand-800" />
                </div>
              </div>
            </div>

            {/* RELATED POSTS */}
            {relatedPosts.length > 0 && (
              <div className="mb-16">
                <h3 className="text-2xl font-display font-bold text-slate-900 mb-6 border-b border-slate-200 pb-2">Related Posts</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {relatedPosts.map(rp => (
                    <Link key={rp.id} href={`/blog/${rp.slug}`} className="group block">
                      <div className="relative h-48 rounded-xl overflow-hidden mb-4">
                        <Image src={rp.featuredImage || 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=800&auto=format&fit=crop'} alt={rp.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <div className="flex items-center gap-2 text-brand-600 text-xs font-bold uppercase tracking-wider mb-2">
                        {rp.category || 'Travel'} <span className="text-slate-300">•</span> {new Date(rp.publishedAt || rp.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </div>
                      <h4 className="text-lg font-bold text-slate-900 group-hover:text-brand-600 transition-colors line-clamp-2">{rp.title}</h4>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* LEAVE A REPLY FORM */}
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-display font-bold text-slate-900 mb-2">Leave a Reply</h3>
                <p className="text-slate-500 text-sm">Your email address will not be published. Required fields are marked *</p>
              </div>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Name *</label>
                    <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-600" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Email *</label>
                    <input type="email" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-600" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Website</label>
                  <input type="url" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-600" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Comment *</label>
                  <textarea rows={5} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-600"></textarea>
                </div>
                <button type="button" className="bg-brand-600 text-white font-bold py-3 px-8 rounded-xl hover:bg-brand-700 transition-colors shadow-lg">
                  Submit Comment
                </button>
              </form>
            </div>

          </div>

          {/* SIDEBAR (RIGHT) */}
          <div className="w-full lg:w-[30%] space-y-10">
            
            {/* MOST POPULAR / RECENT */}
            <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100">
              <h3 className="text-xl font-display font-bold text-slate-900 mb-6 border-b border-brand-100 pb-2 relative">
                <span className="absolute bottom-[-1px] left-0 w-12 h-0.5 bg-brand-600"></span>
                Most Popular
              </h3>
              <div className="space-y-4">
                {sidebarPosts.length > 0 ? sidebarPosts.map(sp => (
                  <Link key={sp.id} href={`/blog/${sp.slug}`} className="group flex gap-4 items-center">
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0">
                      <Image src={sp.featuredImage || 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=400&auto=format&fit=crop'} alt={sp.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-brand-600 uppercase tracking-wider mb-1">{sp.category || 'Travel'}</div>
                      <h4 className="text-sm font-bold text-slate-800 group-hover:text-brand-600 transition-colors line-clamp-2 leading-snug">{sp.title}</h4>
                      <div className="text-xs text-slate-400 mt-1">{new Date(sp.publishedAt || sp.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
                    </div>
                  </Link>
                )) : (
                  <p className="text-slate-500 text-sm">No recent posts available.</p>
                )}
              </div>
            </div>

            {/* AD / CTA WIDGET */}
            <div className="relative rounded-[2rem] overflow-hidden aspect-[4/5] shadow-lg group">
              <Image src="https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?q=80&w=600&auto=format&fit=crop" alt="Book a tour" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent flex flex-col justify-end p-8 text-center">
                <span className="text-brand-400 font-display italic text-lg mb-1 block">Exclusive Offer</span>
                <h3 className="text-2xl font-bold text-white mb-4 leading-snug">Ready for your next getaway?</h3>
                <Link href="/contact" className="bg-brand-600 text-white font-bold py-3 px-6 rounded-xl hover:bg-white hover:text-brand-900 transition-colors shadow-lg text-sm uppercase tracking-wide">
                  Explore Now
                </Link>
              </div>
            </div>

            {/* CATEGORIES WIDGET */}
            <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100">
              <h3 className="text-xl font-display font-bold text-slate-900 mb-6 border-b border-brand-100 pb-2 relative">
                <span className="absolute bottom-[-1px] left-0 w-12 h-0.5 bg-brand-600"></span>
                Categories
              </h3>
              <ul className="space-y-3">
                {['Adventure', 'Luxury Travel', 'Cultural Tours', 'Travel Tips', 'Destinations'].map(cat => (
                  <li key={cat}>
                    <Link href="#" className="flex items-center justify-between group">
                      <span className="text-slate-600 group-hover:text-brand-600 transition-colors font-medium text-sm">{cat}</span>
                      <span className="w-6 h-6 rounded-full bg-slate-50 group-hover:bg-brand-50 text-slate-400 group-hover:text-brand-600 flex items-center justify-center text-xs font-bold transition-colors">
                        <ChevronRight className="w-3 h-3" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}