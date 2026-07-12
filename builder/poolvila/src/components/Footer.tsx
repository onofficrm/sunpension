import { MENU_ITEMS } from '../constants';

export default function Footer() {
  return (
    <footer className="cebuvilla-footer bg-brand-navy text-white/70 py-16 border-t-4 border-brand-emerald">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* 브랜드 정보 */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold text-white mb-2">세부풀빌라</h2>
            <p className="text-brand-emerald text-sm tracking-widest uppercase font-semibold mb-6">
              Cebu Private Pool Villa
            </p>
            <p className="text-sm leading-relaxed mb-6 break-keep">
              세부시티와 막탄의 프라이빗 풀빌라 정보를 안내합니다.
            </p>
            <div className="space-y-2 text-sm text-white/90">
              <p>운영시간: [관리자_입력_운영시간]</p>
              <p>상담문의: [관리자_입력_연락처]</p>
              <p>메신저: <a href="[관리자_입력_메신저링크]" className="hover:text-brand-emerald transition-colors">[관리자_입력_메신저ID]</a></p>
            </div>
          </div>

          {/* 퀵 링크 */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">바로가기</h3>
            <ul className="space-y-3">
              {MENU_ITEMS.slice(1).map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="hover:text-brand-emerald transition-colors text-sm">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* 정책 메뉴 */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">이용 안내</h3>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-brand-emerald transition-colors text-sm">이용약관</a></li>
              <li><a href="#" className="hover:text-brand-emerald transition-colors text-sm font-bold">개인정보처리방침</a></li>
              <li><a href="#" className="hover:text-brand-emerald transition-colors text-sm">취소 및 환불 안내</a></li>
              <li><a href="#" className="hover:text-brand-emerald transition-colors text-sm">예약 전 확인사항</a></li>
            </ul>
          </div>

          {/* 사업자 정보 */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">사업자 정보</h3>
            <div className="text-xs text-white/60 space-y-2 leading-relaxed">
              <p>상호: [관리자_입력_상호명]</p>
              <p>대표자: [관리자_입력_대표자명]</p>
              <p>사업자등록번호: [관리자_입력_사업자번호]</p>
              <p>주소: [관리자_입력_사업장주소]</p>
              <p>통신판매업신고: [관리자_입력_통신판매번호]</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-white/50">
          <p>&copy; {new Date().getFullYear()} 세부풀빌라 (Cebu Pool Villa). All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
