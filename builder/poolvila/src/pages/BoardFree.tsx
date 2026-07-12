import { PenLine } from 'lucide-react';
import { useBoardList } from '../hooks/useBoardList';
import BoardPostDetail from '../components/BoardPostDetail';

export default function BoardFree({ wrId }: { wrId: string | null }) {
  const { items, loading, error } = useBoardList('free', 20);

  if (wrId) {
    return <BoardPostDetail boTable="free" wrId={wrId} title="자유게시판" />;
  }

  return (
    <div className="cebuvilla-board-free bg-brand-beige min-h-screen py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-3xl font-bold text-brand-navy mb-2">자유게시판</h1>
            <p className="text-gray-600 text-sm">세부 여행과 풀빌라에 대해 자유롭게 이야기를 나눠보세요.</p>
          </div>
          <a href="/bbs/write.php?bo_table=free" className="hidden sm:flex items-center gap-2 bg-brand-navy text-white px-5 py-2.5 rounded-xl font-bold hover:bg-gray-800 transition-colors shadow-sm">
            <PenLine className="w-4 h-4" /> 글쓰기
          </a>
        </div>

        {loading && <p className="text-gray-500 mb-4">게시글을 불러오는 중...</p>}
        {error && <p className="text-gray-500 mb-4">{error}</p>}

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <ul className="divide-y divide-gray-100">
            {items.map((item, index) => (
              <li key={item.wr_id} className="hover:bg-brand-emerald/5 transition-colors">
                <a href={`?bo_table=free&wr_id=${item.wr_id}`} className="block p-4 md:grid md:grid-cols-12 md:gap-4 md:items-center md:p-4">
                  <div className="hidden md:block col-span-1 text-sm text-gray-400">{items.length - index}</div>
                  <div className="col-span-12 md:col-span-7 text-left md:pl-4 mb-2 md:mb-0">
                    <span className="text-[15px] font-medium text-brand-charcoal hover:text-brand-emerald">{item.subject}</span>
                  </div>
                  <div className="col-span-12 md:col-span-4 text-xs md:text-sm text-gray-500 flex justify-between md:justify-end md:gap-6">
                    <span>조회 {item.hit}</span>
                    <span>{item.date}</span>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-4 sm:hidden flex justify-end">
          <a href="/bbs/write.php?bo_table=free" className="flex items-center gap-2 bg-brand-navy text-white px-5 py-2.5 rounded-xl font-bold hover:bg-gray-800 transition-colors shadow-sm">
            <PenLine className="w-4 h-4" /> 글쓰기
          </a>
        </div>
      </div>
    </div>
  );
}
