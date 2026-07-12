import { Calendar, Eye } from 'lucide-react';
import { useBoardList } from '../hooks/useBoardList';
import { boardThumb } from '../lib/boardApi';
import BoardPostDetail from '../components/BoardPostDetail';

export default function BoardNews({ wrId }: { wrId: string | null }) {
  const { items, loading, error } = useBoardList('news', 12);

  if (wrId) {
    return <BoardPostDetail boTable="news" wrId={wrId} title="새소식" />;
  }

  const featured = items[0];
  const rest = items.slice(1);

  return (
    <div className="cebuvilla-board-news bg-brand-beige min-h-screen py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-brand-navy mb-4">새소식</h1>
          <p className="text-gray-600">세부풀빌라의 다양한 소식과 이벤트, 여행 정보를 안내해드립니다.</p>
        </div>

        {loading && <p className="text-center text-gray-500">새소식을 불러오는 중...</p>}
        {error && <p className="text-center text-gray-500">{error}</p>}

        {featured && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              <a href={`?bo_table=news&wr_id=${featured.wr_id}`} className="group relative h-72 md:h-full border-b md:border-b-0 md:border-r border-gray-100 overflow-hidden block">
                <img src={boardThumb(featured)} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt={featured.subject} />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-brand-navy/30 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  {featured.is_notice && <span className="bg-brand-emerald text-xs font-bold px-2 py-1 rounded mb-3 inline-block">공지</span>}
                  <h3 className="text-2xl font-bold mb-2 line-clamp-2">{featured.subject}</h3>
                  <p className="text-white/80 text-sm">{featured.date}</p>
                </div>
              </a>

              <div className="flex flex-col">
                {rest.map((item) => (
                  <a key={item.wr_id} href={`?bo_table=news&wr_id=${item.wr_id}`} className="p-6 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors group flex items-start gap-4">
                    <div className="hidden sm:block w-24 h-24 bg-gray-200 rounded-xl overflow-hidden flex-shrink-0">
                      <img src={boardThumb(item)} loading="lazy" className="w-full h-full object-cover" alt={item.subject} />
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-lg font-bold text-brand-navy mb-2 group-hover:text-brand-emerald transition-colors line-clamp-2">{item.subject}</h3>
                      <div className="flex gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {item.date}</span>
                        <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {item.hit}</span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
