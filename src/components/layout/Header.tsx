import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Destinations', path: '/destinations' },
    { name: 'Packages', path: '/packages' },
    { name: 'Blog', path: '/blog' },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] pt-4 md:pt-6 px-4 pointer-events-none flex justify-center">
      
      {/* Side Floating Logo (Sticky & Responsive) */}
      <div className="absolute left-0 top-3 md:top-4 pointer-events-auto">
        <Link href="/">
           <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-r-full bg-[#045a94] flex items-center justify-center shadow-[10px_5px_20px_rgba(4,90,148,0.3)] transition-all duration-500 hover:pr-4 cursor-pointer">
              <Image src="/logo-white.png" alt="Exploration Tours Logo" width={60} height={60} className="object-contain w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14" />
           </div>
        </Link>
      </div>

      <header className="pointer-events-auto w-full max-w-4xl mx-auto bg-white/90 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-white/50 rounded-full px-4 py-2 flex items-center justify-between md:justify-center gap-8 transition-all duration-300">
        
        {/* Navigation Links - Desktop */}
        <nav className="hidden md:flex items-center gap-1 font-medium text-sm text-slate-600">
          {navItems.map((item) => (
            <Link key={item.name} href={item.path} className="group relative px-5 py-2.5 rounded-full hover:text-[#045a94] hover:bg-blue-50/50 transition-all duration-300 ease-in-out font-bold overflow-hidden">
              <span className="relative z-10">{item.name}</span>
              <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[#045a94] transition-all duration-300 group-hover:w-3/4 opacity-0 group-hover:opacity-100 rounded-full"></span>
            </Link>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="flex items-center">
          <Link 
            href="/contact" 
            className="hidden md:inline-flex items-center justify-center bg-[#045a94] hover:bg-[#03426e] text-white px-7 py-2.5 rounded-full font-bold tracking-wide transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-1 active:scale-95 text-sm hover-shine overflow-hidden"
          >
            Plan Your Trip
          </Link>
          
          {/* Mobile Menu Icon */}
          <button className="md:hidden p-3 text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-full ml-auto transition">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        
      </header>
    </div>
  );
}