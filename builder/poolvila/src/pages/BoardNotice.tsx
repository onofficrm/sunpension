import { Megaphone } from 'lucide-react';
import { useBoardList } from '../hooks/useBoardList';
import BoardPostDetail from '../components/BoardPostDetail';

export default function BoardNotice({ wrId }: { wrId: string | null }) {
  const { items, loading, error } = useBoardList('notice', 20);

  if (wrId) {
    return <BoardPostDetail boTable="notice" wrId={wrId} title="공지사항" />;
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

        {loading && <p className="text-gray-500 mb-4">공지사항을 불러오는 중...</p>}
        {error && <p className="text-gray-500 mb-4">{error}</p>}

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <ul className="divide-y divide-gray-100">
            {items.map((item, index) => (
              <li key={item.wr_id} className={item.is_notice ? 'bg-brand-orange/5 hover:bg-brand-orange/10' : 'hover:bg-gray-50'}>
                <a href={`?bo_table=notice&wr_id=${item.wr_id}`} className="block p-4 md:grid md:grid-cols-12 md:gap-4 md:items-center md:p-4">
                  <div className="hidden md:block col-span-1 text-sm">
                    {item.is_notice ? (
                      <span className="bg-brand-orange text-white text-[10px] font-bold px-2 py-0.5 rounded-sm">공지</span>
                    ) : (
                      <span className="text-gray-400">{items.length - index}</span>
                    )}
                  </div>
                  <div className="col-span-12 md:col-span-8 text-left md:pl-4 mb-2 md:mb-0">
                    <span className="text-[15px] font-medium text-brand-charcoal hover:text-brand-emerald">{item.subject}</span>
                  </div>
                  <div className="col-span-12 md:col-span-3 text-xs md:text-sm text-gray-500 md:text-right">{item.date}</div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
