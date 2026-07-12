import { Calendar, User } from 'lucide-react';

export default function BoardDiary({ wrId }: { wrId: string | null }) {
  if (wrId) {
    return <div className="min-h-[60vh] flex items-center justify-center text-xl font-bold">게시물 상세 페이지 (다이어리) - {wrId}</div>;
  }

  return (
    <div className="cebuvilla-board-diary bg-brand-beige min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-brand-navy mb-4">여행 다이어리</h1>
          <p className="text-gray-600 max-w-2xl">
            고객님들의 생생한 세부 풀빌라 여행 후기와 현지 맛집, 액티비티 정보 등 다양한 여행 이야기를 공유하는 공간입니다.
          </p>
        </div>

        {/* 블로그형 카드 리스트 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1,2,3,4,5,6].map((item) => (
            <article key={item} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 flex flex-col group">
              <a href={`?bo_table=diary&wr_id=${item}`} className="block relative aspect-[4/3] overflow-hidden bg-gray-100">
                <img src={`https://images.unsplash.com/photo-${1510000000000+item}?q=80&w=600&auto=format&fit=crop`} alt="후기 사진" loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-brand-navy text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                  여행후기
                </span>
              </a>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-brand-navy mb-3 line-clamp-2 group-hover:text-brand-emerald transition-colors">
                  <a href={`?bo_table=diary&wr_id=${item}`}>
                    가족들과 함께한 완벽한 3박 4일 세부 풀빌라 여행
                  </a>
                </h3>
                <p className="text-gray-500 text-sm mb-6 line-clamp-3 leading-relaxed flex-grow">
                  아이들과 함께 머물기 좋은 세부시티의 프라이빗 풀빌라에서 편안한 휴식을 취했습니다. 수영장도 넓고 바비큐 파티도 즐거웠어요. 관리자분들도 너무 친절하셨습니다.
                </p>
                <div className="flex justify-between items-center text-xs text-gray-400 pt-4 border-t border-gray-50">
                  <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" /> 여행자{item}</span>
                  <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> 2023.10.15</span>
                </div>
              </div>
            </article>
          ))}
        </div>
        
        {/* Pagination */}
        <div className="flex justify-center mt-12 gap-2">
          <button className="w-10 h-10 rounded-lg bg-brand-emerald text-white flex items-center justify-center font-bold shadow-sm">1</button>
          <button className="w-10 h-10 rounded-lg border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:bg-gray-50">2</button>
          <button className="w-10 h-10 rounded-lg border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:bg-gray-50">3</button>
        </div>
      </div>
    </div>
  );
}
