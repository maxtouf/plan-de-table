import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from './components/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Plan de Table',
  description: 'Gérez votre plan de table et les confirmations de présence facilement',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen pb-16 pt-6">
          <div className="container mx-auto px-4">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
} 