import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export const metadata = { title: 'Cancellation & Refund Policies | Exploration Tours' };

export default function RefundPage() {
  return (
    <main className="w-full bg-[#fdfdfd] min-h-screen pb-24">
      
      {/* HERO SECTION */}
      <section className="relative w-full h-[40vh] min-h-[350px] flex items-center justify-center pt-20 max-w-full mx-auto overflow-hidden shadow-sm">
        <div className="absolute inset-0 bg-[#0f172a]"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#045a94]/80 to-transparent"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-4 drop-shadow-lg">
            Cancellation & Refund Policies
          </h1>
          <p className="text-white/80 font-medium text-lg">
            Understanding Our Refund and Cancellation Process
          </p>
        </div>
      </section>

      {/* CONTENT SECTION */}
      <section className="max-w-4xl mx-auto px-4 md:px-8 mt-16 md:mt-24">
        <div className="w-full flex-1 prose prose-lg prose-slate prose-headings:font-display prose-headings:font-bold prose-headings:text-[#045a94] prose-p:text-slate-600 prose-p:leading-relaxed max-w-none">
          
          <h2 className="text-3xl mb-6">Cancellation & Refund Policies</h2>
          <p>As a travel firm, Exploration Tours, it's essential to have clear and transparent cancellation and refund policies to ensure customer satisfaction and manage expectations.</p>

          <h2 className="text-2xl mt-10 mb-4">General</h2>
          <p>The cancellation policy is effective for all vacations crafted by Exploration Tours from 08th March'24. Exploration Tours customers eligible for refunds will receive the refund amount within 90 working days from the date of cancellation or when the supplier(s) processes the refund, whichever is later. For refunds related to on-trip cancellations, customers will receive the refund amount within 90 working days from the date of their return or when the supplier(s) processes the refund, whichever is later. For queries/clarifications, please reach out to us at <a href="mailto:mathur@exploration-tours.com" className="text-[#045a94] underline">mathur@exploration-tours.com</a>.</p>
          <p>The Refund amount depicted is subjected to change based on international exchange rates, refunds received from suppliers and payments received from customers till date. Any change in refund amount will be communicated to customers by their respective account owners.</p>

          <h2 className="text-2xl mt-10 mb-4">Flights</h2>
          <ul>
            <li>On cancelling flights marked as "Non-Refundable" on the final travel vouchers, customers will be eligible for a zero refund.</li>
            <li>For Flights marked as "Refundable" on the final travel vouchers, customers will receive a refund as per the details mentioned under the "Cancellation Policy" section of the product and also in the final itinerary shared over the email.</li>
            <li>The total refunds for flights may include components which vary as per the international exchange rates.</li>
            <li>Exploration Tours will not be responsible for grounded/cancelled/delayed flights. Any cancellation requests for these flights will have to be placed with the respective airlines. Realization of refunds would be subject to processing by the respective airline carrier.</li>
            <li>The onus is on the customer to ensure that his/her passport has a minimum of 1-year validity and is in good condition. Exploration Tours is not liable to refund a customer who is not allowed to board the flight because of invalid passports (validity expired, damaged passports).</li>
            <li>Customers are expected to reach the airport ahead of their boarding time (at least 2 hours prior to boarding time). Exploration Tours is not responsible to refund customers (for cases wherein airport transfers are not planned by us) who miss their flights owing to delayed arrival at the airport.</li>
            <li>For cases wherein airport transfers are planned by Exploration Tours, flight cancellations due to delayed transfers owing to unforeseen circumstances specific to a region will not be borne by Exploration Tours.</li>
            <li>Details about baggage limitations (cabin and check-in) will be furnished as part of the final travel vouchers. Additional costs owing to breached baggage limits will have to be paid by the customer at the time of check-in.</li>
            <li>Certain flight carriers (LCC like Ryanair, Vueling, Voltea etc.) have a mandatory web check-in policy. Failure to comply with this could result in an additional cost to be paid at the airport. Exploration Tours is not liable to refund customers in such circumstances.</li>
            <li>Exploration Tours will set meal preferences for customers with airline carriers upon request. However, Exploration Tours has no control over the availability and quality of meals served on the flight. This will be controlled completely by the airline carrier.</li>
          </ul>

          <h2 className="text-2xl mt-10 mb-4">Hotels</h2>
          <ul>
            <li>On cancelling hotels which have been marked as "Non-Refundable" on the final travel vouchers, the customer will be eligible for a zero refund.</li>
            <li>For hotels which have been marked as "Refundable" on the final travel vouchers, refunds and their timelines will be applicable as mentioned under the "Cancellation Policy" section of the product and in the final itinerary shared over email.</li>
            <li>The total refunds for hotels may include components which vary with international exchange rates.</li>
            <li>While Exploration Tours strives to provide the best hotels with world-class amenities, we cannot be held responsible for factors such as hotel staff behaviour, cleanliness and quality of accommodation. Additional costs owing to on-trip room upgrades and additional amenities will be borne by the customer. All hotels changed on-trip (Hotels booked per itinerary cancelled and new hotels booked) will entail a 100% cancellation fee.</li>
            <li>Entertaining early check-in or late check-out requests is solely based on the discretion of the hotel. Exploration Tours will not be able to process cancellation requests owing to non-availability of these requests.</li>
          </ul>

          <h2 className="text-2xl mt-10 mb-4">Activities</h2>
          <ul>
            <li>On cancelling activities marked as "Non-Refundable" on the final travel vouchers, the customer will be eligible for a zero refund.</li>
            <li>For activities, which have been marked as "Refundable" on the final travel vouchers, refunds and their timelines will be applicable as mentioned under the "Cancellation Policy" section of the product and in the final itinerary shared over email.</li>
            <li>The total refund for activities may include components which vary with international exchange rates.</li>
          </ul>

          <h2 className="text-2xl mt-10 mb-4">Transfers</h2>
          <ul>
            <li>For all transfers, refunds and their timelines will be applicable as mentioned under the "Cancellation Policy" section of the product and in the final itinerary shared over email.</li>
            <li>The total refunds for transfers may include components which vary with international exchange rates.</li>
          </ul>

          <h2 className="text-2xl mt-10 mb-4">Visa & Insurance</h2>
          <ul>
            <li>Exploration Tours acts as a facilitator for processing Visa applications. We will guide customers on Visa formalities & Visa documentation for specific destinations. The discretion to grant/reject Visa rests solely with the concerned embassy and Exploration Tours will not be responsible for rejection of any applications. The visa fee is non-refundable in case of rejected visa applications.</li>
            <li>While we strive to provide a seamless Visa experience to the customers, Exploration Tours will not be held responsible for unforeseen changes to Visa formalities levied by the embassy during the document submission and processing phase.</li>
            <li>Insurance once applied is subject to 100% cancellation fee and is non-refundable.</li>
          </ul>

        </div>
      </section>
    </main>
  );
}