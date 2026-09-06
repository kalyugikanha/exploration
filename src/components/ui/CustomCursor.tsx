'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };
    
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', updatePosition);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div 
      className="fixed pointer-events-none z-[9999] transition-transform duration-100 ease-out hidden md:block"
      style={{ transform: `translate3d(${position.x + 15}px, ${position.y + 15}px, 0)` }}
    >
      <div className="relative w-12 h-12 animate-float opacity-90 drop-shadow-lg">
        <Image src="/images/cursor-icon.png" alt="Travel" fill className="object-contain" />
      </div>
    </div>
  );
}