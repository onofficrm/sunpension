import { Users, BedDouble, Waves, MapPin, CheckCircle2, Search, SlidersHorizontal, ArrowLeft } from 'lucide-react';
import ConsultationForm from '../components/ConsultationForm';

interface BoardVillaProps {
  region: 'cebu' | 'mactan';
  wrId: string | null;
}

export default function BoardVilla({ region, wrId }: BoardVillaProps) {
  const regionName = region === 'cebu' ? '세부시티' : '막탄';
  
  if (wrId) {
    return <VillaDetail region={regionName} wrId={wrId} />;
  }

  return (
    <div className="cebuvilla-board-list bg-white min-h-screen pb-20">
      {/* 서브페이지 헤더 */}
      <div className="bg-brand-navy text-white py-16 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=2070&auto=format&fit=crop')] opacity-20 bg-cover bg-center"></div>
        <div className="relative z-10">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">{regionName} 풀빌라</h1>
          <p className="text-white/80 text-lg">고객님에게 딱 맞는 {regionName}의 프라이빗 숙소를 찾아보세요.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        {/* 필터 UI */}
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

        {/* 리스트 목록 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <article key={item} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col group">
              <div className="relative h-60 overflow-hidden">
                <img 
                  src={`https://images.unsplash.com/photo-${1500000000000 + item}?q=80&w=800&auto=format&fit=crop`} 
                  alt="풀빌라" 
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 bg-gray-200"
                />
                <div className="absolute top-4 left-4">
                  <span className={`text-xs font-bold px-3 py-1.5 rounded-full shadow-sm text-white ${region === 'cebu' ? 'bg-brand-navy/90' : 'bg-brand-emerald/90'} backdrop-blur-sm`}>
                    {regionName}
                  </span>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-brand-navy mb-2 group-hover:text-brand-emerald transition-colors">
                  {regionName} 프리미엄 풀빌라 {item}호
                </h3>
                <p className="text-gray-500 text-sm mb-4 line-clamp-1">최고급 시설과 프라이빗한 휴식을 제공합니다.</p>
                
                <div className="grid grid-cols-2 gap-y-2 gap-x-2 text-sm text-gray-600 mb-4 pb-4 border-b border-gray-100">
                  <div className="flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-brand-emerald" />
                    <span>기준 6인 / 최대 10인</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <BedDouble className="w-4 h-4 text-brand-emerald" />
                    <span>침실 4개</span>
                  </div>
                  <div className="flex items-center gap-1.5 col-span-2">
                    <Waves className="w-4 h-4 text-brand-emerald" />
                    <span>프라이빗 수영장</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-6">
                  <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">노래방</span>
                  <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">바비큐</span>
                  <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">가족여행 추천</span>
                </div>

                <div className="flex justify-between items-center mb-4 text-sm text-gray-400">
                  <span>작성일 2023.10.15</span>
                  <span>조회 125</span>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-auto">
                  <a href={`/bbs/board.php?bo_table=${region}&wr_id=${item}`} className="text-center bg-gray-50 hover:bg-gray-100 text-brand-charcoal border border-gray-200 font-semibold py-2.5 rounded-xl transition-all text-sm">
                    자세히 보기
                  </a>
                  <a href="#villa-consultation" className="text-center bg-brand-emerald hover:bg-emerald-600 text-white font-semibold py-2.5 rounded-xl transition-all shadow-sm text-sm">
                    상담하기
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
        
        {/* Pagination (UI Only) */}
        <div className="flex justify-center mt-12 gap-2">
          <button className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50">1</button>
          <button className="w-10 h-10 rounded-lg bg-brand-emerald text-white flex items-center justify-center font-bold shadow-sm">2</button>
          <button className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50">3</button>
        </div>
      </div>
    </div>
  );
}

function VillaDetail({ region, wrId }: { region: string, wrId: string }) {
  return (
    <div className="cebuvilla-board-detail bg-brand-beige min-h-screen pb-20">
      {/* 상세 상단 */}
      <div className="bg-white border-b border-gray-100 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <a href="#" onClick={(e) => { e.preventDefault(); window.history.back(); }} className="inline-flex items-center gap-2 text-gray-500 hover:text-brand-navy mb-6 transition-colors font-medium">
            <ArrowLeft className="w-4 h-4" /> 목록으로
          </a>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* 이미지 갤러리 */}
            <div className="space-y-4">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100">
                <img src="https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=2070&auto=format&fit=crop" alt="대표 이미지" loading="lazy" className="w-full h-full object-cover" />
              </div>
              <div className="grid grid-cols-4 gap-2 sm:gap-4">
                {[1,2,3,4].map(i => (
                  <div key={i} className="aspect-square rounded-xl overflow-hidden bg-gray-100 border-2 border-transparent hover:border-brand-emerald cursor-pointer transition-colors">
                    <img src={`https://images.unsplash.com/photo-${1500000000000+i}?q=80&w=400&auto=format&fit=crop`} alt={`썸네일 ${i}`} loading="lazy" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>

            {/* 정보 영역 */}
            <div className="flex flex-col">
              <div className="mb-4">
                <span className="inline-block bg-brand-emerald/10 text-brand-emerald font-bold px-3 py-1 rounded-full text-sm mb-3">
                  {region}
                </span>
                <h1 className="text-3xl sm:text-4xl font-bold text-brand-navy leading-tight mb-2">
                  {region} 럭셔리 프라이빗 맨션 {wrId}호
                </h1>
                <div className="flex items-center gap-2 text-gray-500">
                  <MapPin className="w-4 h-4" /> {region} 중심가 위치
                </div>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 my-6">
                <div className="grid grid-cols-2 gap-y-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">기준 / 최대 인원</p>
                    <p className="font-bold text-brand-navy">기준 8인 / 최대 12인</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">침실 / 욕실</p>
                    <p className="font-bold text-brand-navy">침실 4개 / 욕실 4개</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">체크인</p>
                    <p className="font-bold text-brand-navy">오후 3:00</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">체크아웃</p>
                    <p className="font-bold text-brand-navy">오전 11:00</p>
                  </div>
                </div>
              </div>

              <div className="mb-8 flex-grow">
                <h3 className="font-bold text-brand-navy mb-3">주요 편의시설</h3>
                <ul className="grid grid-cols-2 gap-y-2">
                  <li className="flex items-center gap-2 text-gray-600 text-sm"><CheckCircle2 className="w-4 h-4 text-brand-emerald" /> 프라이빗 수영장</li>
                  <li className="flex items-center gap-2 text-gray-600 text-sm"><CheckCircle2 className="w-4 h-4 text-brand-emerald" /> 바비큐 그릴</li>
                  <li className="flex items-center gap-2 text-gray-600 text-sm"><CheckCircle2 className="w-4 h-4 text-brand-emerald" /> 최고급 노래방 시설</li>
                  <li className="flex items-center gap-2 text-gray-600 text-sm"><CheckCircle2 className="w-4 h-4 text-brand-emerald" /> 전 객실 에어컨</li>
                  <li className="flex items-center gap-2 text-gray-600 text-sm"><CheckCircle2 className="w-4 h-4 text-brand-emerald" /> 무료 와이파이</li>
                  <li className="flex items-center gap-2 text-gray-600 text-sm"><CheckCircle2 className="w-4 h-4 text-brand-emerald" /> 공항 픽업 지원</li>
                </ul>
              </div>

              <div className="bg-brand-navy p-6 rounded-2xl text-center text-white mt-auto">
                <p className="text-sm opacity-80 mb-2">원하시는 날짜의 정확한 견적을 받아보세요</p>
                <p className="text-2xl font-bold mb-4">가격문의</p>
                <a href="#villa-consultation" className="block w-full bg-brand-orange hover:bg-orange-600 text-white font-bold py-4 rounded-xl transition-all shadow-md">
                  상담 및 예약하기
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 본문 에디터 영역 (그누보드 $view['content'] 출력부) */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100 prose prose-lg prose-emerald max-w-none">
          {/* 가상 본문 데이터 */}
          <h2 className="text-2xl font-bold text-brand-navy border-b border-gray-100 pb-4 mb-6">1. 풀빌라 소개</h2>
          <p className="text-gray-600 mb-10">최고급 자재로 마감된 모던한 인테리어와 완벽한 프라이버시를 보장하는 프리미엄 풀빌라입니다. 가족 여행, 친구 모임 등 누구에게도 방해받지 않는 완벽한 휴식을 선사합니다.</p>
          
          <h2 className="text-2xl font-bold text-brand-navy border-b border-gray-100 pb-4 mb-6">2. 객실과 침실 구성</h2>
          <p className="text-gray-600 mb-10">총 4개의 넓은 침실이 있으며, 각 방마다 개별 욕실과 에어컨이 완비되어 있어 여러 명이 방문해도 쾌적하게 이용하실 수 있습니다.</p>
          
          <h2 className="text-2xl font-bold text-brand-navy border-b border-gray-100 pb-4 mb-6">3. 수영장과 편의시설</h2>
          <p className="text-gray-600 mb-10">매일 수질 관리를 진행하는 대형 프라이빗 수영장이 있으며, 야외 바비큐장과 거실에는 최신 노래방 기기가 설치되어 있습니다.</p>
          
          <h2 className="text-2xl font-bold text-brand-navy border-b border-gray-100 pb-4 mb-6">4. 이용시 주의사항</h2>
          <ul className="list-disc pl-5 text-gray-600 mb-10 space-y-2">
            <li>실내에서는 절대 금연입니다. (야외 지정된 흡연 구역 이용)</li>
            <li>수영장 이용 시 다이빙은 위험하오니 삼가주시기 바랍니다.</li>
            <li>지나친 고성방가는 주변에 피해를 줄 수 있습니다.</li>
          </ul>
        </div>
      </div>

      <ConsultationForm />
      
      {/* 함께 살펴볼 풀빌라 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-gray-200 mt-10">
        <h3 className="text-2xl font-bold text-brand-navy mb-8">함께 살펴볼 {region} 풀빌라</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1,2,3,4].map(i => (
            <a key={i} href="#" className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-gray-100">
              <div className="aspect-[4/3] bg-gray-200 overflow-hidden">
                <img src={`https://images.unsplash.com/photo-${1510000000000+i}?q=80&w=400&auto=format&fit=crop`} alt="추천 풀빌라" loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="p-4">
                <h4 className="font-bold text-brand-navy truncate group-hover:text-brand-emerald">{region} 인기 풀빌라 {i}</h4>
                <p className="text-xs text-gray-500 mt-1">기준 4인 / 최대 8인</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
