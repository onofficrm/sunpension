import { Users, BedDouble, Waves, MapPin, CheckCircle2, Search, SlidersHorizontal, ArrowLeft } from 'lucide-react';
import ConsultationForm from '../components/ConsultationForm';
import { useBoardList } from '../hooks/useBoardList';
import { useBoardView } from '../hooks/useBoardView';
import { boardFeatures, boardThumb } from '../lib/boardApi';

interface BoardVillaProps {
  region: 'cebu' | 'mactan';
  wrId: string | null;
}

export default function BoardVilla({ region, wrId }: BoardVillaProps) {
  const regionName = region === 'cebu' ? '세부시티' : '막탄';
  const { items, loading, error } = useBoardList(region, 12);
  const detail = useBoardView(region, wrId);

  if (wrId) {
    const item = detail.item;
    if (detail.loading) {
      return <div className="min-h-[50vh] flex items-center justify-center text-gray-500">풀빌라 정보를 불러오는 중...</div>;
    }
    if (detail.error || !item) {
      return <div className="min-h-[50vh] flex items-center justify-center text-gray-500">{detail.error || '게시글을 찾을 수 없습니다.'}</div>;
    }

    const features = boardFeatures(item);

    return (
      <div className="cebuvilla-board-detail bg-brand-beige min-h-screen pb-20">
        <div className="bg-white border-b border-gray-100 pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
            <a href={`/bbs/board.php?bo_table=${region}`} className="inline-flex items-center gap-2 text-gray-500 hover:text-brand-navy mb-6 transition-colors font-medium">
              <ArrowLeft className="w-4 h-4" /> 목록으로
            </a>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div className="space-y-4">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100">
                  <img src={boardThumb(item)} alt={item.subject} loading="lazy" className="w-full h-full object-cover" />
                </div>
              </div>

              <div className="flex flex-col">
                <div className="mb-4">
                  <span className="inline-block bg-brand-emerald/10 text-brand-emerald font-bold px-3 py-1 rounded-full text-sm mb-3">
                    {item.region_label || regionName}
                  </span>
                  <h1 className="text-3xl sm:text-4xl font-bold text-brand-navy leading-tight mb-2">{item.subject}</h1>
                  <div className="flex items-center gap-2 text-gray-500">
                    <MapPin className="w-4 h-4" /> {item.region_label || regionName}
                  </div>
                </div>

                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 my-6">
                  <div className="grid grid-cols-1 gap-y-4 text-sm">
                    {item.capacity && <p><strong>인원</strong> {item.capacity}</p>}
                    {item.bedrooms && <p><strong>침실</strong> {item.bedrooms}</p>}
                    {item.pool_info && <p><strong>수영장</strong> {item.pool_info}</p>}
                  </div>
                </div>

                {features.length > 0 && (
                  <ul className="grid grid-cols-2 gap-y-2 mb-8">
                    {features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-gray-600 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-brand-emerald" /> {feature}
                      </li>
                    ))}
                  </ul>
                )}

                <a href="#villa-consultation" className="block w-full bg-brand-orange hover:bg-orange-600 text-white font-bold py-4 rounded-xl transition-all shadow-md text-center mt-auto">
                  상담 및 예약하기
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100 prose prose-lg max-w-none prose-emerald" dangerouslySetInnerHTML={{ __html: item.content || item.summary }} />
        </div>

        <ConsultationForm />
      </div>
    );
  }

  const noticeItems = items.filter((item) => item.is_notice);
  const villaItems = items.filter((item) => !item.is_notice);

  return (
    <div className="cebuvilla-board-list bg-brand-beige min-h-screen pb-20">
      <div className="bg-brand-navy text-white py-16 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=2070&auto=format&fit=crop')] opacity-20 bg-cover bg-center"></div>
        <div className="relative z-10">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">{regionName} 풀빌라</h1>
          <p className="text-white/80 text-lg">고객님에게 딱 맞는 {regionName}의 프라이빗 숙소를 찾아보세요.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 mb-10">
          <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-100">
            <SlidersHorizontal className="w-5 h-5 text-brand-emerald" />
            <h2 className="font-bold text-brand-navy text-lg">조건 선택 후 상담</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <select aria-label="이용 인원" className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-brand-emerald outline-none">
              <option>이용 인원</option>
              <option>2~4명</option>
              <option>5~8명</option>
              <option>9~12명</option>
            </select>
            <select aria-label="침실 수" className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-brand-emerald outline-none">
              <option>침실 수</option>
              <option>2개 이하</option>
              <option>3~4개</option>
              <option>5개 이상</option>
            </select>
            <select aria-label="수영장 유무" className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-brand-emerald outline-none">
              <option>수영장 유무</option>
              <option>프라이빗 수영장</option>
              <option>공용 수영장</option>
            </select>
            <select aria-label="여행 목적" className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-brand-emerald outline-none">
              <option>여행 목적</option>
              <option>가족여행</option>
              <option>친구모임</option>
              <option>골프/워크숍</option>
            </select>
            <button aria-label="검색" className="col-span-2 md:col-span-1 bg-brand-navy hover:bg-brand-emerald text-white rounded-lg px-4 py-2.5 text-sm font-bold transition-colors flex items-center justify-center gap-2">
              <Search className="w-4 h-4" /> 검색
            </button>
          </div>
        </div>

        {loading && <p className="text-gray-500 mb-8">풀빌라 목록을 불러오는 중...</p>}
        {error && <p className="text-rose-600 mb-8 bg-rose-50 border border-rose-100 rounded-xl px-4 py-3 text-sm">{error}</p>}

        {noticeItems.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-orange-100 overflow-hidden mb-8">
            <div className="px-5 py-3 border-b border-orange-50 bg-brand-orange/5">
              <p className="text-sm font-bold text-brand-orange">공지 · 상단 고정</p>
            </div>
            <ul className="divide-y divide-gray-100">
              {noticeItems.map((item) => (
                <li key={item.wr_id} className="hover:bg-brand-orange/10">
                  <a
                    href={`/bbs/board.php?bo_table=${region}&wr_id=${item.wr_id}`}
                    className="flex items-center gap-3 px-5 py-4"
                  >
                    <span className="bg-brand-orange text-white text-[10px] font-bold px-2 py-0.5 rounded-sm shrink-0">공지</span>
                    <span className="font-medium text-brand-charcoal hover:text-brand-emerald truncate">{item.subject}</span>
                    <span className="ml-auto text-sm text-gray-500 shrink-0 hidden sm:inline">{item.date}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {villaItems.map((item) => {
            const features = boardFeatures(item);
            return (
              <article key={item.wr_id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col group">
                <div className="relative h-60 overflow-hidden">
                  <img src={boardThumb(item)} alt={item.subject} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 bg-gray-200" />
                  <div className="absolute top-4 left-4">
                    <span className={`text-xs font-bold px-3 py-1.5 rounded-full shadow-sm text-white ${region === 'cebu' ? 'bg-brand-navy/90' : 'bg-brand-emerald/90'} backdrop-blur-sm`}>
                      {item.region_label || regionName}
                    </span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-brand-navy mb-2 group-hover:text-brand-emerald transition-colors">{item.subject}</h3>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2">{item.summary}</p>

                  <div className="grid grid-cols-1 gap-y-2 text-sm text-gray-600 mb-4 pb-4 border-b border-gray-100">
                    {item.capacity && (
                      <div className="flex items-center gap-1.5"><Users className="w-4 h-4 text-brand-emerald" /><span>{item.capacity}</span></div>
                    )}
                    {item.bedrooms && (
                      <div className="flex items-center gap-1.5"><BedDouble className="w-4 h-4 text-brand-emerald" /><span>{item.bedrooms}</span></div>
                    )}
                    {item.pool_info && (
                      <div className="flex items-center gap-1.5"><Waves className="w-4 h-4 text-brand-emerald" /><span>{item.pool_info}</span></div>
                    )}
                  </div>

                  {features.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {features.map((feature) => (
                        <span key={feature} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">{feature}</span>
                      ))}
                    </div>
                  )}

                  <div className="flex justify-between items-center mb-4 text-sm text-gray-400">
                    <span>{item.date}</span>
                    <span>조회 {item.hit}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mt-auto">
                    <a href={`/bbs/board.php?bo_table=${region}&wr_id=${item.wr_id}`} className="text-center bg-gray-50 hover:bg-gray-100 text-brand-charcoal border border-gray-200 font-semibold py-2.5 rounded-xl transition-all text-sm">
                      자세히 보기
                    </a>
                    <a href="#villa-consultation" className="text-center bg-brand-emerald hover:bg-emerald-600 text-white font-semibold py-2.5 rounded-xl transition-all shadow-sm text-sm">
                      상담하기
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
