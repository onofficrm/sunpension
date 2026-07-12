import { ShieldCheck, HeartHandshake, Sparkles } from 'lucide-react';

export default function InfoSection() {
  return (
    <section className="cebuvilla-info bg-white py-24 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-4 tracking-tight">왜 세부풀빌라 인가요?</h2>
          <p className="text-brand-charcoal/80 text-lg max-w-2xl mx-auto">
            저가형 숙소나 유흥 목적의 시설이 아닌, 진정한 힐링과 프리미엄 휴식을 원하는 고객님들만을 위한 엄선된 풀빌라입니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* 특징 1 */}
          <div className="cebuvilla-info-box flex flex-col items-center text-center p-8 rounded-2xl bg-brand-beige border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-brand-emerald/10 text-brand-emerald rounded-full flex items-center justify-center mb-6">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-brand-navy mb-3">검증된 프리미엄 시설</h3>
            <p className="text-gray-600 leading-relaxed">
              위생, 보안, 시설 상태 등을 직접 확인하고 엄선한 최고급 풀빌라만을 제공합니다. 가족 여행객도 안심하고 머무를 수 있습니다.
            </p>
          </div>

          {/* 특징 2 */}
          <div className="cebuvilla-info-box flex flex-col items-center text-center p-8 rounded-2xl bg-brand-beige border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-brand-orange/10 text-brand-orange rounded-full flex items-center justify-center mb-6">
              <HeartHandshake className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-brand-navy mb-3">1:1 맞춤형 컨시어지</h3>
            <p className="text-gray-600 leading-relaxed">
              여행 목적, 인원, 예산에 맞춰 최적의 풀빌라를 추천해 드립니다. 예약부터 체크아웃까지 전담 매니저가 케어합니다.
            </p>
          </div>

          {/* 특징 3 */}
          <div className="cebuvilla-info-box flex flex-col items-center text-center p-8 rounded-2xl bg-brand-beige border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-brand-aqua/10 text-brand-aqua rounded-full flex items-center justify-center mb-6">
              <Sparkles className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-brand-navy mb-3">투명하고 합리적인 비용</h3>
            <p className="text-gray-600 leading-relaxed">
              숨겨진 추가 비용 없이 명확한 가격을 안내합니다. 고급스러운 서비스를 가장 합리적인 조건으로 경험하실 수 있습니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
