import Link from 'next/link';
import { ChevronRight, Info, Database, Shield, FileText, UserCheck, Lock, Mail } from 'lucide-react';

export const metadata = { title: 'Privacy Policy | Exploration Tours' };

export default function PrivacyPolicyPage() {
  return (
    <main className="w-full bg-[#fdfdfd] min-h-screen pb-24">
      
      {/* HERO SECTION */}
      <section className="relative w-full h-[40vh] min-h-[350px] flex items-center justify-center pt-20 max-w-full mx-auto overflow-hidden shadow-sm">
        <div className="absolute inset-0 bg-[#0f172a]"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#045a94]/80 to-transparent"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-4 drop-shadow-lg">
            Privacy Policy
          </h1>
          <p className="text-white/80 font-medium text-lg">
            How We Collect, Use, and Protect Your Information
          </p>
        </div>
      </section>

      {/* CONTENT SECTION */}
      <section className="max-w-4xl mx-auto px-4 md:px-8 mt-16 md:mt-24">
        <div className="w-full flex-1 prose prose-lg prose-slate prose-headings:font-display prose-headings:font-bold prose-headings:text-[#045a94] prose-p:text-slate-600 prose-p:leading-relaxed max-w-none">
          
          <h2 className="text-3xl mb-6">Privacy Policy for Exploration Tours</h2>
          <p>At Exploration Tours, we are committed to protecting the privacy and security of our clients' personal information. This Privacy Policy outlines how we collect, use, disclose, and protect the information provided to us. By using our services, you consent to the practices described in this policy.</p>

          <h2 className="text-2xl mt-10 mb-4">Information Collection</h2>
          <p>We may collect personal information when you interact with us through various channels, including but not limited to our website, email, phone, or in-person meetings. The types of information we collect may include:</p>
          <ul>
            <li>Contact information (such as name, email address, phone number, postal address).</li>
            <li>Travel preferences and requirements.</li>
            <li>Payment information (for booking purposes).</li>
            <li>Demographic information.</li>
            <li>Feedback and reviews.</li>
          </ul>

          <h2 className="text-2xl mt-10 mb-4">Use of Information</h2>
          <p>We use the collected information for the following purposes:</p>
          <ul>
            <li>To provide and personalize our services to meet your travel needs.</li>
            <li>To process bookings, payments, and confirmations.</li>
            <li>To communicate with you regarding your inquiries, bookings, or updates about our services.</li>
            <li>To improve our services and tailor our offerings to better suit your preferences.</li>
            <li>To conduct research, analysis, and marketing activities.</li>
            <li>To comply with legal obligations.</li>
          </ul>

          <h2 className="text-2xl mt-10 mb-4">Information Sharing</h2>
          <p>We may share your personal information with third parties in the following circumstances:</p>
          <ul>
            <li>With service providers and partners who assist us in delivering our services (e.g., airlines, hotels, tour operators).</li>
            <li>With authorities or regulators when required by law or to protect our rights and interests.</li>
            <li>With your consent or at your direction.</li>
          </ul>
          <p>We do not sell or rent your personal information to third parties for marketing purposes.</p>

          <h2 className="text-2xl mt-10 mb-4">Data Security</h2>
          <p>We employ appropriate technical and organizational measures to safeguard your personal information against unauthorized access, disclosure, alteration, or destruction.</p>

          <h2 className="text-2xl mt-10 mb-4">Data Retention</h2>
          <p>We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.</p>

          <h2 className="text-2xl mt-10 mb-4">Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access and update your personal information.</li>
            <li>Request the deletion of your personal information.</li>
            <li>Object to the processing of your personal information.</li>
            <li>Withdraw your consent at any time (where applicable).</li>
          </ul>

          <h2 className="text-2xl mt-10 mb-4">Changes to this Privacy Policy</h2>
          <p>We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We encourage you to review this page periodically for the latest information on our privacy practices.</p>

          <h2 className="text-2xl mt-10 mb-4">Contact Us</h2>
          <p>If you have any questions or concerns about our Privacy Policy or practices, please contact us at <a href="mailto:mathur@explorationtours.com" className="text-[#045a94] underline">mathur@explorationtours.com</a>.</p>
          <p className="text-sm text-slate-400 mt-4">Last updated: 09/03/2024</p>
          
          <p className="mt-8 font-medium">By using our services, you acknowledge that you have read and understood this Privacy Policy and agree to the collection, use, and disclosure of your personal information as described herein.</p>

        </div>
      </section>
    </main>
  );
}