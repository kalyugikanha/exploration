import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { AosProvider } from '@/components/layout/AosProvider';
import WhatsAppButton from '@/components/layout/WhatsAppButton';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <AosProvider>
      <div className="flex min-h-screen flex-col w-full ">
        <Header />
        <main className="flex-1 w-full">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </AosProvider>
  );
}