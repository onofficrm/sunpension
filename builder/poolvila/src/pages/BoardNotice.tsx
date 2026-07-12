import { Megaphone, Search } from 'lucide-react';

export default function BoardNotice({ wrId }: { wrId: string | null }) {
  if (wrId) {
    return <div className="min-h-[60vh] flex items-center justify-center text-xl font-bold">게시물 상세 페이지 (공지사항) - {wrId}</div>;
  }

  return (
    <div className="cebuvilla-board-notice bg-brand-beige min-h-screen py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-brand-orange/10 rounded-xl flex items-center justify-center">
            <Megaphone className="w-6 h-6 text-brand-orange" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-brand-navy mb-1">공지사항</h1>
            <p className="text-gray-600 text-sm">필독 안내 및 중요 공지를 확인해주세요.</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* 테이블 헤더 (PC 전용) */}
          <div className="hidden md:grid grid-cols-12 gap-4 p-4 border-b border-gray-200 bg-gray-50 text-sm font-bold text-brand-navy text-center">
            <div className="col-span-1">번호</div>
            <div className="col-span-8 text-left pl-4">제목</div>
            <div className="col-span-2">작성자</div>
            <div className="col-span-1">날짜</div>
          </div>
          
          {/* 리스트 목록 */}
          <ul className="divide-y divide-gray-100">
            {/* 고정 공지사항 */}
            {[1, 2].map((item) => (
              <li key={`notice-${item}`} className="bg-brand-orange/5 hover:bg-brand-orange/10 transition-colors">
                <a href={`?bo_table=notice&wr_id=${item}`} className="block p-4 md:p-0">
                  <div className="md:grid grid-cols-12 gap-4 md:items-center md:p-4 text-center">
                    <div className="hidden md:block col-span-1 text-sm">
                      <span className="bg-brand-orange text-white text-[10px] font-bold px-2 py-0.5 rounded-sm">공지</span>
                    </div>
                    
                    <div className="col-span-12 md:col-span-8 text-left md:pl-4 mb-2 md:mb-0">
                      <div className="md:hidden inline-block mr-2 align-middle">
                         <span className="bg-brand-orange text-white text-[10px] font-bold px-2 py-0.5 rounded-sm">공지</span>
                      </div>
                      <span className="text-[15px] font-bold text-brand-navy">
                        세부풀빌라 상담 업무 시간 안내 (매일 09:00 - 18:00)
                      </span>
                    </div>
                    
                    <div className="col-span-12 md:col-span-3 flex justify-between md:contents text-xs md:text-sm text-gray-500">
                      <div className="md:col-span-2 font-medium text-brand-navy">관리자</div>
                      <div className="md:col-span-1 font-medium">10.15</div>
                    </div>
                  </div>
                </a>
              </li>
            ))}

            {/* 일반 공지사항 */}
            {[5,4,3].map((item) => (
              <li key={item} className="hover:bg-gray-50 transition-colors">
                <a href={`?bo_table=notice&wr_id=${item}`} className="block p-4 md:p-0">
                  <div className="md:grid grid-cols-12 gap-4 md:items-center md:p-4 text-center">
                    <div className="hidden md:block col-span-1 text-sm text-gray-400">{item}</div>
                    
                    <div className="col-span-12 md:col-span-8 text-left md:pl-4 mb-2 md:mb-0">
                      <span className="text-[15px] font-medium text-brand-charcoal hover:text-brand-emerald">
                        필리핀 세부 입국 시 필수 준비물 (이트래블 작성 안내)
                      </span>
                    </div>
                    
                    <div className="col-span-12 md:col-span-3 flex justify-between md:contents text-xs md:text-sm text-gray-500">
                      <div className="md:col-span-2">관리자</div>
                      <div className="md:col-span-1">09.20</div>
                    </div>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
        
        {/* 검색 폼 */}
        <div className="mt-10 flex justify-center">
          <div className="flex w-full max-w-md bg-white rounded-xl border border-gray-200 overflow-hidden focus-within:ring-2 focus-within:ring-brand-emerald focus-within:border-transparent transition-all shadow-sm">
            <select aria-label="검색 조건" className="bg-gray-50 border-r border-gray-200 px-3 py-3 text-sm text-gray-600 outline-none">
              <option>제목+내용</option>
              <option>제목</option>
            </select>
            <input type="text" aria-label="검색어" placeholder="검색어를 입력하세요" className="flex-grow px-4 py-3 text-sm outline-none" />
            <button aria-label="검색" className="px-4 py-3 bg-brand-navy text-white hover:bg-gray-800 transition-colors">
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-10 gap-2">
          <button className="w-10 h-10 rounded-lg bg-brand-emerald text-white flex items-center justify-center font-bold shadow-sm">1</button>
        </div>
      </div>
    </div>
  );
}
