import Image from 'next/image';

export default function OurStory() {
  return (
    <section className="py-24 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          <div className="w-full lg:w-1/2 relative" data-aos="fade-right">
            <div className="relative h-[500px] w-full rounded-3xl overflow-hidden shadow-2xl">
              <Image 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1080&auto=format&fit=crop" 
                alt="Our Team" 
                fill 
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-white font-display font-bold text-2xl">The Exploration Tours Team</p>
                <p className="text-white/80 text-sm">Crafting bespoke journeys since 2005</p>
              </div>
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-[#045a94] rounded-3xl -z-10 opacity-20 blur-2xl"></div>
          </div>

          <div className="w-full lg:w-1/2" data-aos="fade-left">
            <span className="text-[#045a94] font-bold tracking-widest uppercase text-sm mb-2 block">Our Story</span>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900 mb-6 leading-tight">
              Travel Is Personal. <br/><span className="text-[#045a94]">So Is Our Service.</span>
            </h2>
            <div className="space-y-4 text-slate-600 text-lg leading-relaxed">
              <p>
                For over two decades, we have believed that travel is more than just visiting a destination—it's about how the journey makes you feel.
              </p>
              <p>
                At Exploration Tours, our dedicated team of travel experts and founders share a profound passion for discovering the world's most extraordinary places. We don't just book flights and hotels; we curate deeply personalised experiences that resonate with your unique style.
              </p>
              <p>
                From hidden boutique resorts to exclusive local encounters, we leverage our decades of firsthand experience and global partnerships to ensure every detail of your itinerary is thoughtfully planned. 
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
