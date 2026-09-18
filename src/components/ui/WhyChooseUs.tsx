import { Award, HeartHandshake, Star, HeadphonesIcon } from 'lucide-react';

export default function WhyChooseUs() {
  const features = [
    {
      icon: Award,
      title: '21+ Years of Expertise',
      description: 'Decades of experience creating journeys that are thoughtfully planned from start to finish.'
    },
    {
      icon: HeartHandshake,
      title: 'Tailor-Made Travel',
      description: 'Every itinerary is designed around your interests, expectations and style of travel.'
    },
    {
      icon: Star,
      title: 'Handpicked Experiences',
      description: 'Carefully selected hotels, experiences and local partners.'
    },
    {
      icon: HeadphonesIcon,
      title: 'Personal Support',
      description: 'A dedicated team to assist you before, during and throughout your journey.'
    }
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-[#045a94]/5 blur-[100px] rounded-full pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16" data-aos="fade-up">
          <span className="text-[#045a94] font-bold tracking-widest uppercase text-sm mb-2 block">Why Choose Exploration Tours?</span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900">Experience The Difference</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, i) => (
            <div key={i} data-aos="fade-up" data-aos-delay={i * 100} className="group p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-[#045a94]/10 text-[#045a94] flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#045a94] group-hover:text-white transition-all duration-300">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 font-display">{feature.title}</h3>
              <p className="text-slate-500 leading-relaxed text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
