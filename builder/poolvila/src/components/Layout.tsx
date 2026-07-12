import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import MobileBottomNav from './MobileBottomNav';
import ChatbotWidget from './ChatbotWidget';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="cebuvilla-wrap min-h-screen flex flex-col font-sans bg-brand-beige">
      <Header />
      <main className="cebuvilla-main flex-grow w-full flex flex-col relative pb-[68px] md:pb-0">
        {children}
      </main>
      <Footer />
      <MobileBottomNav />
      <ChatbotWidget />
    </div>
  );
}
