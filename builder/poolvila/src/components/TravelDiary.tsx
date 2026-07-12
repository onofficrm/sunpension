import { Calendar, ArrowRight } from 'lucide-react';
import { useBoardList } from '../hooks/useBoardList';
import { boardThumb } from '../lib/boardApi';

export default function TravelDiary() {
  const { items, loading, error } = useBoardList('diary', 3);

  return (
    <section className="cebuvilla-diary py-24 bg-white w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-4 tracking-tight">세부풀빌라 여행 다이어리</h2>
            <p className="text-gray-600 text-lg">세부 현지에서 전하는 풀빌라 후기와 여행 이야기를 확인해보세요.</p>
          </div>
          <a
            href="/bbs/board.php?bo_table=diary"
            className="flex items-center gap-2 text-brand-emerald font-bold hover:text-emerald-700 transition-colors whitespace-nowrap"
          >
            여행 다이어리 전체보기 <ArrowRight className="w-5 h-5" />
          </a>
        </div>

        {loading && <p className="text-gray-500">여행 다이어리를 불러오는 중...</p>}
        {error && <p className="text-gray-500">{error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((post) => (
            <article key={post.wr_id} className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300">
              <a href={`/bbs/board.php?bo_table=diary&wr_id=${post.wr_id}`} className="block relative h-56 overflow-hidden">
                <img
                  src={boardThumb(post)}
                  alt={post.subject}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {post.category && (
                  <div className="absolute top-4 left-4">
                    <span className="bg-brand-navy/90 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                      {post.category}
                    </span>
                  </div>
                )}
              </a>

              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
                  <Calendar className="w-4 h-4" />
                  <span>{post.date}</span>
                </div>

                <h3 className="text-xl font-bold text-brand-navy mb-3 line-clamp-2 group-hover:text-brand-emerald transition-colors">
                  <a href={`/bbs/board.php?bo_table=diary&wr_id=${post.wr_id}`}>{post.subject}</a>
                </h3>

                <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
                  {post.summary}
                </p>

                <a
                  href={`/bbs/board.php?bo_table=diary&wr_id=${post.wr_id}`}
                  className="inline-flex items-center text-sm font-bold text-brand-navy group-hover:text-brand-emerald transition-colors mt-auto"
                >
                  자세히 보기 &rarr;
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
