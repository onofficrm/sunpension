import { Home, Map, MapPin, MessageCircle } from 'lucide-react';

export default function MobileBottomNav() {
  return (
    <div className="cebuvilla-mobile-nav md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 pb-[env(safe-area-inset-bottom)]">
      <div className="flex justify-between items-center h-[68px] px-2">
        <a href="/" className="flex flex-col items-center justify-center w-1/4 h-full text-gray-500 hover:text-brand-navy transition-colors">
          <Home className="w-6 h-6 mb-1" />
          <span className="text-[10px] font-medium">홈</span>
        </a>
        <a href="/bbs/board.php?bo_table=cebu" className="flex flex-col items-center justify-center w-1/4 h-full text-gray-500 hover:text-brand-navy transition-colors">
          <MapPin className="w-6 h-6 mb-1" />
          <span className="text-[10px] font-medium">세부시티</span>
        </a>
        <a href="/bbs/board.php?bo_table=mactan" className="flex flex-col items-center justify-center w-1/4 h-full text-gray-500 hover:text-brand-navy transition-colors">
          <Map className="w-6 h-6 mb-1" />
          <span className="text-[10px] font-medium">막탄</span>
        </a>
        <a href="/#villa-consultation" className="flex flex-col items-center justify-center w-1/4 h-full text-brand-emerald hover:text-emerald-700 transition-colors relative">
          <div className="absolute -top-3 bg-brand-orange text-white rounded-full p-2 shadow-lg border-2 border-white">
            <MessageCircle className="w-6 h-6" />
          </div>
          <span className="text-[10px] font-bold mt-7">상담</span>
        </a>
      </div>
    </div>
  );
}
