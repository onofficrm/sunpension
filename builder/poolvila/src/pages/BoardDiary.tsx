import { Calendar } from 'lucide-react';
import { useBoardList } from '../hooks/useBoardList';
import { boardThumb } from '../lib/boardApi';
import BoardPostDetail from '../components/BoardPostDetail';

export default function BoardDiary({ wrId }: { wrId: string | null }) {
  const { items, loading, error } = useBoardList('diary', 12);

  if (wrId) {
    return <BoardPostDetail boTable="diary" wrId={wrId} title="여행 다이어리" />;
  }

  return (
    <div className="cebuvilla-board-diary bg-brand-beige min-h-screen py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-brand-navy mb-4">여행 다이어리</h1>
          <p className="text-gray-600">세부 현지에서 전하는 풀빌라 후기와 여행 이야기를 확인해보세요.</p>
        </div>

        {loading && <p className="text-center text-gray-500">여행 다이어리를 불러오는 중...</p>}
        {error && <p className="text-center text-gray-500">{error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((post) => (
            <article key={post.wr_id} className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300">
              <a href={`?bo_table=diary&wr_id=${post.wr_id}`} className="block relative h-56 overflow-hidden">
                <img src={boardThumb(post)} alt={post.subject} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                {post.category && (
                  <div className="absolute top-4 left-4">
                    <span className="bg-brand-navy/90 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">{post.category}</span>
                  </div>
                )}
              </a>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
                  <Calendar className="w-4 h-4" />
                  <span>{post.date}</span>
                </div>
                <h3 className="text-xl font-bold text-brand-navy mb-3 line-clamp-2 group-hover:text-brand-emerald transition-colors">
                  <a href={`?bo_table=diary&wr_id=${post.wr_id}`}>{post.subject}</a>
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">{post.summary}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
