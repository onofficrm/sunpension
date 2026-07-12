import { Bell, ChevronRight } from 'lucide-react';

// 그누보드 최신글 연동 시 이 배열 데이터를 서버 데이터로 교체하세요. (게시판 ID: notice)
const MOCK_NOTICES = [
  { id: 1, title: '세부풀빌라 상담 업무 시간 안내 (매일 09:00 - 18:00)', isNew: true },
  { id: 2, title: '보이스피싱 및 허위 예약 사이트 주의 안내', isNew: true },
  { id: 3, title: '필리핀 세부 입국 시 필수 준비물 (이트래블 작성 안내)', isNew: false },
  { id: 4, title: '환불 규정 및 취소 수수료 안내', isNew: false }
];

export default function NoticeBoard() {
  return (
    <div className="bg-brand-beige/50 rounded-2xl p-6 sm:p-8 border border-gray-100 w-full h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-brand-navy flex items-center gap-2">
          <Bell className="w-6 h-6 text-brand-orange" /> 공지사항
        </h3>
        <a 
          href="/bbs/board.php?bo_table=notice" 
          className="text-sm font-bold text-gray-500 hover:text-brand-emerald transition-colors flex items-center"
        >
          더보기 <ChevronRight className="w-4 h-4 ml-1" />
        </a>
      </div>
      
      <ul className="space-y-3 flex-grow">
        {MOCK_NOTICES.map((notice) => (
          <li key={notice.id}>
            <a 
              href={`/bbs/board.php?bo_table=notice&wr_id=${notice.id}`}
              className="flex items-center gap-3 py-2 group"
            >
              {notice.isNew ? (
                <span className="bg-brand-orange text-white text-[10px] font-bold px-2 py-0.5 rounded-sm flex-shrink-0">
                  공지
                </span>
              ) : (
                <span className="w-1.5 h-1.5 rounded-full bg-gray-300 flex-shrink-0 ml-1.5"></span>
              )}
              <span className="text-gray-700 text-sm md:text-base font-medium truncate group-hover:text-brand-emerald transition-colors">
                {notice.title}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
