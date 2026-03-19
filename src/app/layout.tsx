import type { Metadata } from 'next';
import { Inter, Big_Shoulders_Display, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import Providers from '@/components/providers/Providers';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const bigShoulders = Big_Shoulders_Display({ subsets: ['latin'], variable: '--font-display' });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'YO Autopilot — Smart Savings on Autopilot',
  description:
    'Set savings goals. Pick your comfort level. Let AI find the best yield. Real DeFi savings with fintech simplicity.',
  openGraph: {
    title: 'YO Autopilot — Smart Savings on Autopilot',
    description: 'Goal-based savings powered by YO Protocol yields on Base.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${bigShoulders.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
