import { Search, PenLine } from 'lucide-react';

export default function BoardFree({ wrId }: { wrId: string | null }) {
  if (wrId) {
    return <div className="min-h-[60vh] flex items-center justify-center text-xl font-bold">게시물 상세 페이지 (자유게시판) - {wrId}</div>;
  }

  return (
    <div className="cebuvilla-board-free bg-brand-beige min-h-screen py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-3xl font-bold text-brand-navy mb-2">자유게시판</h1>
            <p className="text-gray-600 text-sm">세부 여행과 풀빌라에 대해 자유롭게 이야기를 나눠보세요.</p>
          </div>
          <button className="hidden sm:flex items-center gap-2 bg-brand-navy text-white px-5 py-2.5 rounded-xl font-bold hover:bg-gray-800 transition-colors shadow-sm">
            <PenLine className="w-4 h-4" /> 글쓰기
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* 테이블 헤더 (PC 전용) */}
          <div className="hidden md:grid grid-cols-12 gap-4 p-4 border-b border-gray-200 bg-gray-50 text-sm font-bold text-brand-navy text-center">
            <div className="col-span-1">번호</div>
            <div className="col-span-7 text-left pl-4">제목</div>
            <div className="col-span-2">작성자</div>
            <div className="col-span-1">조회</div>
            <div className="col-span-1">날짜</div>
          </div>
          
          {/* 리스트 목록 */}
          <ul className="divide-y divide-gray-100">
            {[5,4,3,2,1].map((item) => (
              <li key={item} className="hover:bg-brand-emerald/5 transition-colors">
                <a href={`?bo_table=free&wr_id=${item}`} className="block p-4 md:p-0">
                  <div className="md:grid grid-cols-12 gap-4 md:items-center md:p-4 text-center">
                    <div className="hidden md:block col-span-1 text-sm text-gray-400">{item}</div>
                    
                    <div className="col-span-12 md:col-span-7 text-left md:pl-4 mb-2 md:mb-0">
                      <span className="text-[15px] font-medium text-brand-charcoal hover:text-brand-emerald">
                        세부 환전은 어디서 하는게 가장 좋을까요? 막탄 쪽입니다.
                        <span className="text-brand-orange ml-2 text-xs font-bold">[3]</span>
                      </span>
                    </div>
                    
                    <div className="col-span-12 md:col-span-4 flex justify-between md:contents text-xs md:text-sm text-gray-500">
                      <div className="md:col-span-2 truncate">세부초보</div>
                      <div className="flex gap-4 md:contents">
                        <div className="md:col-span-1"><span className="md:hidden">조회 </span>124</div>
                        <div className="md:col-span-1">10.15</div>
                      </div>
                    </div>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
        
        {/* 모바일 글쓰기 버튼 */}
        <div className="mt-4 sm:hidden flex justify-end">
          <button className="flex items-center gap-2 bg-brand-navy text-white px-5 py-2.5 rounded-xl font-bold hover:bg-gray-800 transition-colors shadow-sm">
            <PenLine className="w-4 h-4" /> 글쓰기
          </button>
        </div>

        {/* 검색 폼 */}
        <div className="mt-10 flex justify-center">
          <div className="flex w-full max-w-md bg-white rounded-xl border border-gray-200 overflow-hidden focus-within:ring-2 focus-within:ring-brand-emerald focus-within:border-transparent transition-all shadow-sm">
            <select aria-label="검색 조건" className="bg-gray-50 border-r border-gray-200 px-3 py-3 text-sm text-gray-600 outline-none">
              <option>제목+내용</option>
              <option>제목</option>
              <option>작성자</option>
            </select>
            <input type="text" aria-label="검색어" placeholder="검색어를 입력하세요" className="flex-grow px-4 py-3 text-sm outline-none" />
            <button aria-label="검색" className="px-4 py-3 bg-brand-emerald text-white hover:bg-emerald-600 transition-colors">
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-10 gap-2">
          <button className="w-10 h-10 rounded-lg bg-brand-emerald text-white flex items-center justify-center font-bold shadow-sm">1</button>
          <button className="w-10 h-10 rounded-lg border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:bg-gray-50">2</button>
        </div>
      </div>
    </div>
  );
}
