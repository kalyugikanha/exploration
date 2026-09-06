import Image from 'next/image';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { ArrowRight, Calendar } from 'lucide-react';

export const metadata = { title: 'Travel Blog | Exploration Tours' };

export default async function BlogListPage() {
  const posts = await prisma.blogPost.findMany({
    where: { isPublished: true },
    orderBy: { publishedAt: 'desc' },
  });

  return (
    <main className="w-full bg-slate-50 min-h-screen">
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-brand-900"></div>
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-20">
          <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-4 drop-shadow-lg" data-aos="fade-up">
            Travel Journal
          </h1>
          <p className="text-lg md:text-xl text-brand-100 font-light drop-shadow-md" data-aos="fade-up" data-aos-delay="200">
            Stories, tips, and inspiration for your next adventure.
          </p>
        </div>
      </section>

      <section className="py-20" data-aos="fade-up">
        <div className="max-w-7xl mx-auto px-4">
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-[0_20px_40px_rgba(4,90,148,0.1)] border border-slate-100 transition-all duration-500 hover:-translate-y-2 flex flex-col">
                  <div className="relative h-56 w-full overflow-hidden">
                    <Image src={post.featuredImage || 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1600&auto=format&fit=crop'} alt={post.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                    {post.category && (
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-brand-700 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                        {post.category}
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2 text-slate-400 text-sm mb-3">
                      <Calendar className="w-4 h-4" />
                      {new Date(post.publishedAt || post.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </div>
                    <h3 className="text-xl font-display font-bold text-slate-900 mb-3 group-hover:text-brand-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-slate-500 text-sm line-clamp-3 mb-6 flex-1">
                      {post.introText}
                    </p>
                    <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-auto">
                      <div className="flex items-center gap-2">
                        <Image src={`https://i.pravatar.cc/150?u=${post.author}`} alt={post.author || 'Author'} width={24} height={24} className="rounded-full" />
                        <span className="text-sm font-bold text-slate-700">{post.author}</span>
                      </div>
                      <ArrowRight className="w-5 h-5 text-brand-600 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
              <h3 className="text-2xl font-display font-bold text-slate-700 mb-2">No Posts Found</h3>
              <p className="text-slate-500">We are busy writing new stories for you.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}