'use client';
import { useRef } from 'react';
import Image from 'next/image';
import { Star, ChevronRight, Plane } from 'lucide-react';

export default function TestimonialSection({ testimonials }: { testimonials: any[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: direction === 'left' ? -350 : 350, behavior: 'smooth' });
    }
  };

  const videoThumbs = [
    "https://images.unsplash.com/photo-1527631746610-bca00a040d60?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1530789253388-582c481c54b0?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=600&auto=format&fit=crop"
  ];

  return (
    <section className="w-full py-24 bg-slate-50 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-10 right-10 opacity-60 hidden md:flex items-center">
        <Plane className="w-8 h-8 text-[#045a94] rotate-[45deg] z-10" />
        <svg width="200" height="40" viewBox="0 0 200 40" fill="none" className="-ml-4 mt-8">
          <path d="M0 30 Q 100 40 200 0" stroke="#045a94" strokeWidth="2" strokeDasharray="6 6" />
        </svg>
      </div>
      
      {/* Faint Background Pattern */}
      <div className="absolute bottom-0 left-0 w-full h-[400px] opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')]"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16 relative">
          <span className="text-[#045a94] font-display italic text-2xl md:text-3xl mb-2 block">Our Testimonials</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900">What they are talking about</h2>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          
          {/* Left Side: Video Testimonials (Vertical Scroll) */}
          <div className="w-full lg:w-[35%] relative">
            <div className="absolute -inset-4 bg-gradient-to-b from-slate-50 via-transparent to-slate-50 z-10 pointer-events-none"></div>
            <div className="h-[450px] overflow-y-auto snap-y snap-mandatory [&::-webkit-scrollbar]:hidden flex flex-col gap-6 p-2 rounded-[2rem]">
              {videoThumbs.map((thumb, idx) => (
                <div key={idx} className="w-full h-[400px] shrink-0 snap-center relative rounded-[2rem] overflow-hidden group shadow-lg bg-slate-900 cursor-pointer">
                  <Image src={thumb} alt="Video Thumbnail" fill className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center border border-white/50 group-hover:bg-white/50 transition duration-300 shadow-xl">
                      <div className="w-0 h-0 border-y-[10px] border-y-transparent border-l-[16px] border-l-white ml-2"></div>
                    </div>
                  </div>
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <h4 className="font-bold text-lg drop-shadow-md">Traveler Story {idx + 1}</h4>
                    <p className="text-xs text-white/90 drop-shadow-md">Watch Video</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Text Testimonials (Horizontal Scroll) */}
          <div className="w-full lg:w-[65%] flex flex-col justify-center relative">
            <div ref={scrollRef} className="flex overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden gap-8 pb-12 pt-10 px-4 -mx-4">
              {testimonials.length > 0 ? testimonials.map((test, idx) => (
                <div key={test.id} className="min-w-[320px] max-w-[350px] shrink-0 snap-center relative bg-white border border-gray-100 rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] mt-4 transition-transform hover:-translate-y-2 duration-300">
                  
                  {/* Avatar */}
                  <div className="absolute -top-6 right-6 w-16 h-16 rounded-full border-4 border-white shadow-lg overflow-hidden z-20">
                    <Image src={test.image || `https://i.pravatar.cc/150?u=${test.id}`} alt={test.customerName} fill className="object-cover" />
                  </div>
                  
                  {/* Name Ribbon 3D Effect */}
                  <div className={`absolute top-6 -right-2 ${idx % 2 === 0 ? 'bg-[#045a94]' : 'bg-[#0f172a]'} text-white px-4 py-2 rounded-l-lg shadow-md z-10 text-right min-w-[140px]`}>
                    <div className="font-bold text-sm">{test.customerName}</div>
                    <div className="text-[10px] tracking-wider uppercase opacity-80">Tourist</div>
                    <div className={`absolute -bottom-2 right-0 w-0 h-0 border-t-[8px] ${idx % 2 === 0 ? 'border-t-[#03436e]' : 'border-t-black'} border-r-[8px] border-r-transparent`}></div>
                  </div>

                  {/* Stars */}
                  <div className="flex text-[#045a94] mb-8 mt-2">
                    {[...Array(test.rating)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                  </div>
                  
                  {/* Text */}
                  <p className="text-gray-500 leading-relaxed text-sm italic line-clamp-6">
                    "{test.review}"
                  </p>
                </div>
              )) : (
                <div className="text-gray-400 p-8 border border-dashed rounded-2xl w-full text-center">Add Testimonials in Admin</div>
              )}
            </div>

            {/* Scroll Buttons */}
            <div className="flex justify-end gap-4 pr-4">
              <button onClick={() => scroll('left')} className="w-12 h-12 rounded-full border-2 border-[#045a94] text-[#045a94] flex items-center justify-center hover:bg-[#045a94] hover:text-white transition-colors">
                <ChevronRight className="w-6 h-6 rotate-180" />
              </button>
              <button onClick={() => scroll('right')} className="w-12 h-12 rounded-full bg-[#045a94] text-white flex items-center justify-center hover:bg-[#034b7a] transition-colors shadow-lg shadow-cyan-500/30">
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}