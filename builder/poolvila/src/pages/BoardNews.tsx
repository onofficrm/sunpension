import { Calendar, Eye, ChevronRight } from 'lucide-react';

export default function BoardNews({ wrId }: { wrId: string | null }) {
  if (wrId) {
    return <div className="min-h-[60vh] flex items-center justify-center text-xl font-bold">게시물 상세 페이지 (뉴스) - {wrId}</div>;
  }

  return (
    <div className="cebuvilla-board-news bg-brand-beige min-h-screen py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-brand-navy mb-4">새소식</h1>
          <p className="text-gray-600">세부풀빌라의 다양한 소식과 이벤트, 여행 정보를 안내해드립니다.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* 최상단 강조 뉴스 (매거진형) */}
            <a href="?bo_table=news&wr_id=1" className="group relative h-72 md:h-full border-b md:border-b-0 md:border-r border-gray-100 overflow-hidden block">
              <img src="https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=800&auto=format&fit=crop" loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="뉴스" />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-brand-navy/30 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="bg-brand-emerald text-xs font-bold px-2 py-1 rounded mb-3 inline-block">공지</span>
                <h3 className="text-2xl font-bold mb-2 line-clamp-2">세부시티 신규 프라이빗 맨션 예약 오픈 안내</h3>
                <p className="text-white/80 text-sm">2023.11.01</p>
              </div>
            </a>
            
            {/* 일반 리스트 */}
            <div className="flex flex-col">
              {[2,3,4,5].map((item) => (
                <a key={item} href={`?bo_table=news&wr_id=${item}`} className="p-6 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors group flex items-start gap-4">
                  <div className="hidden sm:block w-24 h-24 bg-gray-200 rounded-xl overflow-hidden flex-shrink-0">
                    <img src={`https://images.unsplash.com/photo-${1500000000000+item}?q=80&w=200&auto=format&fit=crop`} loading="lazy" className="w-full h-full object-cover" alt="썸네일" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-lg font-bold text-brand-navy mb-2 group-hover:text-brand-emerald transition-colors line-clamp-2">
                      겨울 성수기 (12월~2월) 예약 마감 임박 안내 및 프로모션
                    </h3>
                    <div className="flex gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> 2023.10.28</span>
                      <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> 342</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-12 gap-2">
          <button className="w-10 h-10 rounded-lg bg-brand-emerald text-white flex items-center justify-center font-bold shadow-sm">1</button>
          <button className="w-10 h-10 rounded-lg border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:bg-gray-50">2</button>
        </div>
      </div>
    </div>
  );
}
