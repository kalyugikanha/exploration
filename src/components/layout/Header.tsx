'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Destinations', path: '/destinations' },
    { name: 'Packages', path: '/packages' },
    { name: 'Blog', path: '/blog' },
  ];

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-[100] pt-4 md:pt-6 px-4 pointer-events-none flex justify-between md:justify-center items-start">
        
        {/* Side Floating Logo (Sticky & Responsive) */}
        <div className="absolute left-0 top-3 md:top-4 pointer-events-auto z-[101]">
          <Link href="/">
             <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-r-full bg-[#045a94] flex items-center justify-center shadow-[10px_5px_20px_rgba(4,90,148,0.3)] transition-all duration-500 hover:pr-4 cursor-pointer">
                <Image src="/logo-white.png" alt="Exploration Tours Logo" width={60} height={60} className="object-contain w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14" />
             </div>
          </Link>
        </div>

        {/* Header Pill */}
        <header className="pointer-events-auto ml-auto md:ml-0 md:w-full max-w-4xl bg-white/90 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-white/50 rounded-full px-4 py-2 flex items-center justify-center gap-8 transition-all duration-300">
          
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
            <button 
              className="md:hidden p-2.5 text-slate-900 hover:bg-slate-100 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#045a94]"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
          
        </header>
      </div>

      {/* Mobile Menu Drawer */}
      <div 
        className={`fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[90] transition-opacity duration-300 md:hidden ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <div 
          className={`absolute top-0 right-0 w-64 h-full bg-white shadow-2xl transition-transform duration-300 ease-in-out transform ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col h-full pt-24 px-6 pb-8">
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link 
                  key={item.name} 
                  href={item.path} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-4 py-3 text-lg font-bold text-slate-700 hover:text-[#045a94] hover:bg-blue-50 rounded-lg transition-colors border-b border-slate-100 last:border-none"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
            <div className="mt-auto pt-6 border-t border-slate-100">
              <Link 
                href="/contact" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full inline-flex items-center justify-center bg-[#045a94] hover:bg-[#03426e] text-white px-6 py-3.5 rounded-xl font-bold tracking-wide transition-all shadow-md active:scale-95"
              >
                Plan Your Trip
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}