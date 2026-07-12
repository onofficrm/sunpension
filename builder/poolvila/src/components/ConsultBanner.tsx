import { MessageCircle } from 'lucide-react';

export default function ConsultBanner() {
  return (
    <section className="cebuvilla-consult-banner w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-brand-navy rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
        {/* 장식용 원형 그래픽 */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-brand-emerald/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-brand-orange/20 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 text-center md:text-left flex-grow">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">어느 지역이 좋을지 고민되시나요?</h3>
          <p className="text-white/80 text-lg">
            일정과 인원만 알려주시면 세부시티와 막탄 중 적합한 지역부터 안내해드립니다.
          </p>
        </div>
        
        <div className="relative z-10 flex-shrink-0">
          <a 
            href="#villa-consultation"
            className="inline-flex items-center justify-center gap-2 bg-brand-orange hover:bg-orange-600 text-white font-bold text-lg px-8 py-4 rounded-full transition-transform hover:-translate-y-1 shadow-lg"
          >
            <MessageCircle className="w-5 h-5" />
            <span>풀빌라 추천받기</span>
          </a>
        </div>
      </div>
    </section>
  );
}
