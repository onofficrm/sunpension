import { Map, Plane, ShoppingBag, Waves, CheckCircle2 } from 'lucide-react';

export default function RegionComparison() {
  return (
    <section className="cebuvilla-region-compare py-20 bg-white w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* 세부시티 풀빌라 */}
          <div className="cebuvilla-region-card group flex flex-col bg-brand-beige rounded-3xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300">
            <div className="relative h-72 sm:h-80 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?q=80&w=2070&auto=format&fit=crop" 
                alt="세부시티 도심 전경" 
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-brand-navy/40 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <h3 className="text-2xl sm:text-3xl font-bold mb-2">도심의 편리함을 즐기는<br/>세부시티 풀빌라</h3>
                <p className="text-white/90 text-sm sm:text-base">쇼핑몰, 맛집, 골프장과 세부시티 주요 지역으로 이동하기 편리합니다.</p>
              </div>
            </div>
            
            <div className="p-6 sm:p-8 flex flex-col flex-grow">
              <div className="mb-8 flex-grow">
                <h4 className="text-lg font-bold text-brand-navy mb-4 flex items-center gap-2">
                  <Map className="w-5 h-5 text-brand-emerald" />
                  추천 고객
                </h4>
                <ul className="grid grid-cols-2 gap-y-3 gap-x-4 text-gray-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-emerald" />
                    <span>골프여행</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-emerald" />
                    <span>기업 워크숍</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-emerald" />
                    <span>장기체류</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-emerald" />
                    <span>시티투어 중심</span>
                  </li>
                  <li className="flex items-center gap-2 col-span-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-emerald" />
                    <span>맛집과 쇼핑 중심 여행</span>
                  </li>
                </ul>
              </div>
              
              <a 
                href="/bbs/board.php?bo_table=cebu" 
                className="w-full text-center bg-brand-navy hover:bg-brand-emerald text-white font-bold py-4 rounded-xl transition-colors shadow-md"
              >
                세부시티 풀빌라 전체보기
              </a>
            </div>
          </div>

          {/* 막탄 풀빌라 */}
          <div className="cebuvilla-region-card group flex flex-col bg-brand-beige rounded-3xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300">
            <div className="relative h-72 sm:h-80 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?q=80&w=2070&auto=format&fit=crop" 
                alt="막탄 해변 휴양지" 
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-brand-navy/40 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <h3 className="text-2xl sm:text-3xl font-bold mb-2">휴양과 바다를 가까이 즐기는<br/>막탄 풀빌라</h3>
                <p className="text-white/90 text-sm sm:text-base">공항, 리조트, 호핑투어와 해양 액티비티를 이용하기 좋은 위치입니다.</p>
              </div>
            </div>
            
            <div className="p-6 sm:p-8 flex flex-col flex-grow">
              <div className="mb-8 flex-grow">
                <h4 className="text-lg font-bold text-brand-navy mb-4 flex items-center gap-2">
                  <Plane className="w-5 h-5 text-brand-emerald" />
                  추천 고객
                </h4>
                <ul className="grid grid-cols-2 gap-y-3 gap-x-4 text-gray-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-emerald" />
                    <span>가족여행</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-emerald" />
                    <span>호핑투어</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-emerald" />
                    <span>짧은 일정</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-emerald" />
                    <span>해양 액티비티</span>
                  </li>
                  <li className="flex items-center gap-2 col-span-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-emerald" />
                    <span>리조트형 휴양여행</span>
                  </li>
                </ul>
              </div>
              
              <a 
                href="/bbs/board.php?bo_table=mactan" 
                className="w-full text-center bg-brand-navy hover:bg-brand-emerald text-white font-bold py-4 rounded-xl transition-colors shadow-md"
              >
                막탄 풀빌라 전체보기
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
