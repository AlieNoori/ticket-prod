import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import MainNav from '@/components/MainNav';
import { ThemeProvider } from '@/components/ThemeProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Ticket Application',
  description: 'An application for booking tickets',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <nav className="mb-5 flex flex-col items-center border-b px-5 py-3">
            <div className="w-full max-w-6xl">
              <MainNav />
            </div>
          </nav>

          <main className="flex flex-col items-center">
            <div className="w-full max-w-6xl">{children}</div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
