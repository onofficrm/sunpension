import { Bell, ChevronRight } from 'lucide-react';
import { useBoardList } from '../hooks/useBoardList';

export default function NoticeBoard() {
  const { items, loading, error } = useBoardList('notice', 4);

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

      {loading && <p className="text-gray-500 text-sm">공지사항을 불러오는 중...</p>}
      {error && <p className="text-gray-500 text-sm">{error}</p>}

      <ul className="space-y-3 flex-grow">
        {items.map((notice) => (
          <li key={notice.wr_id}>
            <a
              href={`/bbs/board.php?bo_table=notice&wr_id=${notice.wr_id}`}
              className="flex items-center gap-3 py-2 group"
            >
              {notice.is_notice || notice.is_new ? (
                <span className="bg-brand-orange text-white text-[10px] font-bold px-2 py-0.5 rounded-sm flex-shrink-0">
                  공지
                </span>
              ) : (
                <span className="w-1.5 h-1.5 rounded-full bg-gray-300 flex-shrink-0 ml-1.5"></span>
              )}
              <span className="text-gray-700 text-sm md:text-base font-medium truncate group-hover:text-brand-emerald transition-colors">
                {notice.subject}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
