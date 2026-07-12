import { ChevronRight } from 'lucide-react';

// 그누보드 최신글 연동 시 이 배열 데이터를 서버 데이터로 교체하세요. (게시판 ID: news)
const MOCK_NEWS = [
  { id: 1, title: '세부시티 신규 프라이빗 맨션 예약 오픈 안내', date: '2023.11.01' },
  { id: 2, title: '겨울 성수기 (12월~2월) 예약 마감 임박', date: '2023.10.28' },
  { id: 3, title: '가족여행 추천! 막탄 트로피컬 빌라 프로모션 안내', date: '2023.10.15' },
  { id: 4, title: '공항 픽업 및 현지 렌터카 서비스 이용 안내', date: '2023.10.05' }
];

export default function NewsSection() {
  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm w-full h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-brand-navy">세부풀빌라 새소식</h3>
        <a 
          href="/bbs/board.php?bo_table=news" 
          className="text-sm font-bold text-gray-500 hover:text-brand-emerald transition-colors flex items-center"
        >
          더보기 <ChevronRight className="w-4 h-4 ml-1" />
        </a>
      </div>
      
      <ul className="space-y-0 flex-grow">
        {MOCK_NEWS.map((news) => (
          <li key={news.id} className="border-b border-gray-50 last:border-0">
            <a 
              href={`/bbs/board.php?bo_table=news&wr_id=${news.id}`}
              className="flex items-center justify-between py-4 group"
            >
              <span className="text-gray-800 font-medium truncate pr-4 group-hover:text-brand-emerald transition-colors">
                {news.title}
              </span>
              <span className="text-gray-400 text-sm flex-shrink-0">
                {news.date}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
