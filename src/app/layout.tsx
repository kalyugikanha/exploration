import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import AuthProvider from '@/components/providers/AuthProvider';
import AOSProvider from '@/components/providers/AOSProvider';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });

export const metadata: Metadata = {
  title: 'Exploration Tours | A Touch of the Exotic',
  description: 'Premium domestic and international travel experiences.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased overflow-x-hidden`}>
        <AuthProvider>
          <AOSProvider>
          {children}
          </AOSProvider>
        </AuthProvider>
      </body>
    </html>
  );
}