import { useEffect, useState } from 'react';
import { Users, BedDouble, Waves, CheckCircle2 } from 'lucide-react';
import { BoardItem, fetchBoardList, boardFeatures, boardThumb } from '../lib/boardApi';

export default function FeaturedVillas() {
  const [items, setItems] = useState<BoardItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    Promise.all([
      fetchBoardList('cebu', { rows: 3 }),
      fetchBoardList('mactan', { rows: 3 }),
    ])
      .then(([cebu, mactan]) => {
        if (!active) return;
        const merged = [
          ...(cebu.items ?? []),
          ...(mactan.items ?? []),
        ].slice(0, 6);
        setItems(merged);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="cebuvilla-featured py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-4 tracking-tight">지금 많이 찾는 세부 풀빌라</h2>
        <p className="text-brand-charcoal/80 text-lg max-w-2xl mx-auto">
          가족여행부터 단체여행까지 여행 목적에 맞는 풀빌라를 확인해보세요.
        </p>
      </div>

      {loading && <p className="text-center text-gray-500 mb-8">추천 풀빌라를 불러오는 중...</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((villa) => {
          const region = villa.region_label?.includes('막탄') ? 'mactan' : 'cebu';
          const regionName = villa.region_label || (region === 'mactan' ? '막탄' : '세부시티');
          const features = boardFeatures(villa);

          return (
            <article
              key={`${region}-${villa.wr_id}`}
              className="cebuvilla-card group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full transform hover:-translate-y-1"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={boardThumb(villa)}
                  alt={villa.subject}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className={`text-xs font-bold px-3 py-1.5 rounded-full shadow-sm text-white ${region === 'cebu' ? 'bg-brand-navy/90' : 'bg-brand-emerald/90'} backdrop-blur-sm`}>
                    {regionName}
                  </span>
                </div>
              </div>

              <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-xl font-bold text-brand-navy mb-4 group-hover:text-brand-emerald transition-colors">
                  {villa.subject}
                </h3>

                <div className="grid grid-cols-1 gap-y-3 text-sm text-gray-600 mb-4 pb-4 border-b border-gray-100">
                  {villa.capacity && (
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-brand-emerald" />
                      <span>{villa.capacity}</span>
                    </div>
                  )}
                  {villa.bedrooms && (
                    <div className="flex items-center gap-2">
                      <BedDouble className="w-4 h-4 text-brand-emerald" />
                      <span>{villa.bedrooms}</span>
                    </div>
                  )}
                  {villa.pool_info && (
                    <div className="flex items-center gap-2">
                      <Waves className="w-4 h-4 text-brand-emerald" />
                      <span>{villa.pool_info}</span>
                    </div>
                  )}
                </div>

                {features.length > 0 && (
                  <ul className="space-y-1.5 mb-6">
                    {features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-orange" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="grid grid-cols-2 gap-3 mt-auto">
                  <a
                    href={`/bbs/board.php?bo_table=${region}&wr_id=${villa.wr_id}`}
                    className="cebuvilla-btn-card text-center bg-gray-50 hover:bg-gray-100 text-brand-charcoal border border-gray-200 font-semibold py-3 rounded-xl transition-all text-sm"
                  >
                    자세히 보기
                  </a>
                  <a
                    href="#villa-consultation"
                    className="cebuvilla-btn-card text-center bg-brand-emerald hover:bg-emerald-600 text-white font-semibold py-3 rounded-xl transition-all shadow-sm hover:shadow-md text-sm"
                  >
                    상담하기
                  </a>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-12 text-center">
        <a
          href="/bbs/board.php?bo_table=cebu"
          className="inline-flex items-center justify-center gap-2 text-brand-navy font-bold hover:text-brand-emerald transition-colors border-b-2 border-brand-navy hover:border-brand-emerald pb-1"
        >
          풀빌라 전체보기 &rarr;
        </a>
      </div>
    </section>
  );
}
