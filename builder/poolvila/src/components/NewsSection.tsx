import { ChevronRight } from 'lucide-react';
import { useBoardList } from '../hooks/useBoardList';

export default function NewsSection() {
  const { items, loading, error } = useBoardList('news', 4);

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

      {loading && <p className="text-gray-500 text-sm">새소식을 불러오는 중...</p>}
      {error && <p className="text-gray-500 text-sm">{error}</p>}

      <ul className="space-y-0 flex-grow">
        {items.map((news) => (
          <li key={news.wr_id} className="border-b border-gray-50 last:border-0">
            <a
              href={`/bbs/board.php?bo_table=news&wr_id=${news.wr_id}`}
              className="flex items-center justify-between py-4 group"
            >
              <span className="text-gray-800 font-medium truncate pr-4 group-hover:text-brand-emerald transition-colors">
                {news.subject}
              </span>
              <span className="text-gray-400 text-sm flex-shrink-0">{news.date}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
