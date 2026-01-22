import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { Inter, JetBrains_Mono, Roboto_Mono } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/navigation/navbar';
import { Footer } from '@/components/navigation/footer';
import { StarField } from '@/components/ui/star-field';
import { Analytics } from '@vercel/analytics/next';
import { SABER_COLOR_VAR, DEFAULT_SABER_COLOR, type SaberColor } from '@/utils/consts';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
});

const robotoMono = Roboto_Mono({
  variable: '--font-roboto-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Star Wars Challenge',
  description: 'Star Wars technical challenge for CoderHouse',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const savedColor = cookieStore.get('saber-color')?.value;
  const saberColor: SaberColor =
    savedColor && savedColor in SABER_COLOR_VAR ? (savedColor as SaberColor) : DEFAULT_SABER_COLOR;

  return (
    <html
      lang='en'
      className='dark'
      style={{ '--primary': SABER_COLOR_VAR[saberColor] } as React.CSSProperties}
    >
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} ${robotoMono.variable} min-h-screen bg-black antialiased`}
      >
        <StarField starCount={150} />
        <div className='relative z-10'>
          <Navbar initialSaberColor={saberColor} />
          {children}
          <Footer />
        </div>
        <Analytics />
      </body>
    </html>
  );
}
