import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export const metadata = { title: 'Terms & Conditions | Exploration Tours' };

export default function TermsPage() {
  return (
    <main className="w-full bg-[#fdfdfd] min-h-screen pb-24">
      
      {/* HERO SECTION */}
      <section className="relative w-full h-[40vh] min-h-[350px] flex items-center justify-center pt-20 max-w-full mx-auto overflow-hidden shadow-sm">
        <div className="absolute inset-0 bg-[#0f172a]"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#045a94]/80 to-transparent"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-4 drop-shadow-lg">
            Terms & Conditions
          </h1>
          <p className="text-white/80 font-medium text-lg">
            Guidelines and Rules for Using Our Services
          </p>
        </div>
      </section>

      {/* CONTENT SECTION */}
      <section className="max-w-4xl mx-auto px-4 md:px-8 mt-16 md:mt-24">
        <div className="w-full flex-1 prose prose-lg prose-slate prose-headings:font-display prose-headings:font-bold prose-headings:text-[#045a94] prose-p:text-slate-600 prose-p:leading-relaxed max-w-none">
          
          <h2 className="text-3xl mb-6">Terms and Conditions for Exploration Tours</h2>
          <p>These Terms and Conditions govern the relationship between Exploration Tours and its clients. By engaging our services, you agree to comply with these terms. Please read them carefully before using our services.</p>

          <h2 className="text-2xl mt-10 mb-4">Services</h2>
          <p>Exploration Tours provides travel consultancy services to assist clients in planning, organizing, and booking travel arrangements. Our services include but are not limited to itinerary planning, accommodation bookings, transportation arrangements, and travel insurance assistance.</p>

          <h2 className="text-2xl mt-10 mb-4">Client Responsibilities</h2>
          <p>Clients are responsible for providing accurate and complete information necessary for the provision of our services. This includes details regarding travel preferences, requirements, and any special requests.</p>
          <p>Clients must comply with all applicable laws, regulations, and travel requirements of the destinations they intend to visit.</p>
          <p>Clients are responsible for obtaining necessary travel documents such as passports, visas, and health certificates.</p>

          <h2 className="text-2xl mt-10 mb-4">Bookings and Payments</h2>
          <p>Booking requests are subject to availability and confirmation by Exploration Tours and our travel partners.</p>
          <p>Clients are required to pay applicable fees, deposits, and any additional charges associated with their bookings. Payment terms will be communicated at the time of booking.</p>
          <p>Cancellation and refund policies vary depending on the specific arrangements and are subject to the terms of our travel partners. Exploration Tours will communicate these policies to clients at the time of booking.</p>

          <h2 className="text-2xl mt-10 mb-4">Travel Insurance</h2>
          <p>Exploration Tours strongly recommends that clients obtain travel insurance to cover unforeseen circumstances such as trip cancellations, medical emergencies, and lost or damaged luggage. Clients are responsible for selecting and purchasing appropriate insurance coverage.</p>

          <h2 className="text-2xl mt-10 mb-4">Limitation of Liability</h2>
          <p>While Exploration Tours strives to provide accurate and reliable information and assistance, we cannot guarantee the availability, quality, or performance of third-party services such as airlines, hotels, or tour operators. We shall not be liable for any losses, damages, or expenses incurred as a result of such third-party services.</p>
          <p>Exploration Tours shall not be liable for any indirect, incidental, consequential, or punitive damages arising out of or in connection with the use of our services.</p>

          <h2 className="text-2xl mt-10 mb-4">Intellectual Property</h2>
          <p>All content, including but not limited to text, images, logos, and graphics, displayed on the Exploration Tours website and promotional materials are the property of Exploration Tours or its licensors and are protected by copyright laws.</p>
          <p>Clients may not use, reproduce, modify, or distribute any content from our website or promotional materials without prior written permission from Exploration Tours.</p>

          <h2 className="text-2xl mt-10 mb-4">Amendments and Modifications</h2>
          <p>Exploration Tours reserves the right to amend or modify these Terms and Conditions at any time without prior notice. The latest version of the Terms and Conditions will be posted on our website.</p>

          <h2 className="text-2xl mt-10 mb-4">Governing Law and Jurisdiction</h2>
          <p>These Terms and Conditions shall be governed by and construed in accordance with the laws of Jaipur Jurisdiction. Any disputes arising out of or in connection with these terms shall be subject to the exclusive jurisdiction of the courts of Jaipur Jurisdiction.</p>

          <p className="mt-8 font-medium">By engaging our services, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.</p>

          <p className="mt-8">If you have any questions or concerns about these Terms and Conditions, please contact us at <a href="mailto:mathur@explorationtours.com" className="text-[#045a94] underline">mathur@explorationtours.com</a></p>
          <p className="text-sm text-slate-400 mt-4">Last updated: 09/03/2024</p>

        </div>
      </section>
    </main>
  );
}