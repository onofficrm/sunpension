import { useState } from 'react';
import { Menu, X, MessageCircle } from 'lucide-react';
import { MENU_ITEMS } from '../constants';
import logoUrl from '../assets/logo.svg';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="cebuvilla-header sticky top-0 z-50 w-full bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm transition-all">
      <div className="cebuvilla-header-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* 로고 영역 */}
          <div className="cebuvilla-logo-wrap flex-shrink-0 flex items-center">
            <a href="/" className="flex flex-col justify-center">
              <img src={logoUrl} alt="세부풀빌라" className="h-10 sm:h-12 w-auto" />
            </a>
          </div>

          {/* PC 데스크탑 메뉴 */}
          <nav className="cebuvilla-pc-nav hidden md:flex items-center space-x-1 lg:space-x-4">
            {MENU_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-3 py-2 text-[15px] font-medium text-brand-charcoal hover:text-brand-emerald transition-colors rounded-md hover:bg-brand-emerald/5"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* 우측 상담 버튼 & 모바일 메뉴 버튼 */}
          <div className="cebuvilla-header-actions flex items-center space-x-4">
            <a
              href="https://pf.kakao.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="cebuvilla-btn-consult hidden sm:flex items-center gap-2 bg-[#FEE500] hover:bg-[#FDD800] text-[#191919] px-5 py-2.5 rounded-full font-bold transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              <MessageCircle className="w-4 h-4" fill="#191919" />
              <span>카카오톡 상담</span>
            </a>

            {/* 모바일 햄버거 토글 */}
            <button
              type="button"
              className="cebuvilla-mobile-toggle md:hidden p-2 rounded-md text-gray-600 hover:text-brand-navy hover:bg-gray-100 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="메뉴 열기/닫기"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* 모바일 드롭다운 메뉴 */}
      {isMobileMenuOpen && (
        <div className="cebuvilla-mobile-nav md:hidden absolute top-20 left-0 w-full bg-white border-b border-gray-100 shadow-lg">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {MENU_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="block px-4 py-3 text-base font-medium text-brand-charcoal hover:text-brand-emerald hover:bg-brand-emerald/5 rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            
            <div className="pt-4 mt-2 border-t border-gray-100 px-4">
              <a
                href="https://pf.kakao.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-[#FEE500] hover:bg-[#FDD800] text-[#191919] px-5 py-3 rounded-xl font-bold shadow-md transition-colors"
              >
                <MessageCircle className="w-5 h-5" fill="#191919" />
                <span>카카오톡 상담 신청하기</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
