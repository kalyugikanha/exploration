import { Gem, Users, Heart, Compass, Briefcase, PlaneTakeoff } from 'lucide-react';

export default function TravelYourWay() {
  const categories = [
    { title: 'Luxury Escapes', icon: Gem, desc: 'Unparalleled comfort and exclusive experiences.' },
    { title: 'Family Holidays', icon: Users, desc: 'Memorable journeys designed for all ages.' },
    { title: 'Honeymoons & Romantic', icon: Heart, desc: 'Intimate escapes for couples.' },
    { title: 'Adventure & Experiences', icon: Compass, desc: 'Thrilling activities and off-beat trails.' },
    { title: 'Group Travel', icon: PlaneTakeoff, desc: 'Curated itineraries for friends and large groups.' },
    { title: 'Corporate & MICE', icon: Briefcase, desc: 'Seamless business travel and events.' },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16" data-aos="fade-up">
          <span className="text-[#045a94] font-bold tracking-widest uppercase text-sm mb-2 block">Travel Your Way</span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900">How Do You Want To Travel?</h2>
          <p className="mt-4 text-slate-500 max-w-2xl mx-auto">Explore destinations by your travel purpose. We tailor every itinerary to match your unique style.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, i) => (
            <div key={i} data-aos="fade-up" data-aos-delay={i * 100} 
                 className="group cursor-pointer p-8 rounded-3xl border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-[0_20px_40px_rgba(4,90,148,0.08)] transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 rounded-2xl bg-blue-100/50 flex items-center justify-center text-[#045a94] mb-6 group-hover:scale-110 group-hover:bg-[#045a94] group-hover:text-white transition-all duration-300">
                <cat.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2 font-display">{cat.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{cat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
