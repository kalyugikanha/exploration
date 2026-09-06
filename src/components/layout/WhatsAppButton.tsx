'use client';
import Image from 'next/image';

export default function WhatsAppButton() {
  const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919982316521";
  const defaultMessage = encodeURIComponent("Hello, I am interested in a tour.");
  
  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${defaultMessage}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full shadow-[0_10px_30px_rgba(37,211,102,0.4)] hover:shadow-[0_15px_40px_rgba(37,211,102,0.6)] transition-all hover:scale-110 flex items-center justify-center group overflow-hidden border-2 border-white/50"
      aria-label="Chat on WhatsApp"
    >
      <Image src="/images/whatsapp.png" alt="WhatsApp" fill className="object-cover" />
    </a>
  );
}